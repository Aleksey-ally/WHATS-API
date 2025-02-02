import {FC, useEffect, useState} from 'react';
import s from './Chat.module.scss';
import {receivingAPI, sendingAPI, serviceAPI} from "@/api/base-api";
import {Messages} from "@/components/Chat/Messages/Messages.tsx";

type ChatProps = {
    setErrorResponse: (error: string) => void
}

const Chat: FC<ChatProps> = ({setErrorResponse}) => {
    const [recipient, setRecipient] = useState<number>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Messages>([]);
    const [openChat, setOpenChat] = useState<boolean>(false)
    const [error, setError] = useState<string>('')


    const addMessage = (text: string, isUser: boolean, idMessage: string) => {
        setMessages((prev) => {
            const isDuplicate = prev.some((msg) => msg.idMessage === idMessage);
            if (isDuplicate) return prev;
            return [...prev, {text, isUser, idMessage}];
        });
    }

    const checkRecipient = async () => {

        await serviceAPI.checkWhatsapp(recipient)
            .then(res => {
                if (res.existsWhatsapp) {
                    setError('Некорректный номер')
                    setOpenChat(true)
                } else {
                    setOpenChat(false)
                    setError('Некорректный номер')
                }
            })
            .catch(e => {
                setOpenChat(true)
                if (e.status === 466) {
                    setError('Превышена месячная квота')
                } else {
                    setError('Error Network')
                }
            })

    }

    const sendMessage = async () => {
        if (!message.trim()) return;

        await sendingAPI.sendMessage(`${recipient}@c.us`, message)
            .then((res) => {
                addMessage(message, true, res.idMessage)
            })
            .catch(() => setError('Ошибка отправки сообщения:'))
    };

    const fetchData = async () => {
        while (response = await receivingAPI.receiveNotification().catch(e => setErrorResponse(e.message))) {
            const body = response.body
            if (body.typeWebhook === 'incomingMessageReceived') {

                addMessage(body.messageData.extendedTextMessageData.text, false, body.idMessage)
                await receivingAPI.deleteNotification(response.receiptId);

            } else if (body.typeWebhook === 'stateInstanceChanged') {

                await receivingAPI.deleteNotification(response.receiptId);

            } else if (body.typeWebhook === 'outgoingMessageStatus') {

                await receivingAPI.deleteNotification(response.receiptId);

            } else if (body.typeWebhook === 'outgoingMessageReceived') {
                if (body.messageData.textMessageData?.textMessage) {
                    addMessage(body.messageData.textMessageData.textMessage, false, body.idMessage)
                    await receivingAPI.deleteNotification(response.receiptId);
                } else {
                    addMessage(body.messageData.extendedTextMessageData.text, false, body.idMessage)
                    await receivingAPI.deleteNotification(response.receiptId);
                }


            } else if (body.typeWebhook === 'outgoingAPIMessageReceived') {

                addMessage(body.messageData.extendedTextMessageData.text, false, body.idMessage)
                await receivingAPI.deleteNotification(response.receiptId);
            }
        }
    }

    let response

    useEffect(() => {
        (async () => {

            await fetchData().catch(e => console.error(e))
            const interval = setInterval(fetchData, 5000);

            return () => clearInterval(interval);
        })()
    }, []);

    return (
        <main className={s.chat}>
            <header className={s.header}>
                <div className={s.searchBar}>
                    <input
                        type="number"
                        placeholder="Введите номер получателя"
                        value={recipient}
                        onChange={(e) => setRecipient(Number(e.target.value))}
                        onKeyDown={(e) => e.key === 'Enter' && checkRecipient()}
                        required
                    />
                    <button onClick={checkRecipient}>Начать чат</button>
                </div>
                {error && <span className={s.error}>{error}</span>}

            </header>
            {openChat && <Messages messages={messages} sendMessage={sendMessage} message={message} setMessage={setMessage}/>}
        </main>
    );
};

export default Chat;