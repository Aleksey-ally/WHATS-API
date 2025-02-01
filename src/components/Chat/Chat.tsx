import {useState, useEffect, FC} from 'react';
import axios from 'axios';
import styles from './Chat.module.scss';
import {accountAPI, IncomingMessageReceivedResponseBody, receivingAPI, sendingAPI, serviceAPI} from "@/api/base-api";

type ChatProps = {
    credentials: { idInstance: string; apiTokenInstance: string };
}


const Chat: FC<ChatProps> = ({credentials}) => {
    const [recipient, setRecipient] = useState<number>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean, idMessage: string }[]>([]);
    const [openChat, setOpenChat] = useState<boolean>(false)

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
                if (res.existsWhatsapp){
                    setOpenChat(true)
                }
            })
            .catch(e => console.error(e))

    }

    const sendMessage = async () => {
        if (!message.trim()) return;

        await sendingAPI.sendMessage(`${recipient}@c.us`, message)
            .then((res) => {
                addMessage(message, true, res.idMessage)
            })
            .catch(e => console.error('Ошибка отправки сообщения:', e))
    };

    // const fetchMessages = async () => {
    //     const url = `https://api.green-api.com/waInstance${credentials.idInstance}/ReceiveNotification/${credentials.apiTokenInstance}`;
    //
    //     try {
    //         const response = await axios.get(url);
    //         if (response.data) {
    //             const messageData = response.data.body.messageData.textMessageData.textMessage;
    //             setMessages((prev) => [...prev, {text: messageData, isUser: false}]);
    //             await axios.delete(
    //                 `https://api.green-api.com/waInstance${credentials.idInstance}/DeleteNotification/${credentials.apiTokenInstance}/${response.data.receiptId}`
    //             );
    //         }
    //     } catch (error) {
    //         console.error('Ошибка получения сообщений:', error);
    //     }
    // };
    const fetchData = async () => {
        while (response = await receivingAPI.receiveNotification()) {
            const body = response.body
            if (body.typeWebhook === 'incomingMessageReceived') {
                console.log(body.messageData.extendedTextMessageData.text)
                // debugger
                addMessage(body.messageData.extendedTextMessageData.text, false, body.idMessage)
                await receivingAPI.deleteNotification(response.receiptId);
            } else if (body.typeWebhook === 'stateInstanceChanged') {
                console.log('stateInstanceChanged')
                await receivingAPI.deleteNotification(response.receiptId);
            } else if (body.typeWebhook === 'outgoingMessageStatus') {
                console.log('outgoingMessageStatus')
                await receivingAPI.deleteNotification(response.receiptId);
            } else if (body.typeWebhook === 'outgoingMessageReceived') {
                console.log('outgoingMessageReceived')
                addMessage(body.messageData.extendedTextMessageData.text, false, body.idMessage)
                await receivingAPI.deleteNotification(response.receiptId);
            } else if (body.typeWebhook === 'outgoingAPIMessageReceived') {
                // debugger
                addMessage(body.messageData.extendedTextMessageData.text, false, body.idMessage)
                console.log('outgoingMessageReceived')
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
        <div className={styles.chat}>
            <div className={styles.header}>
                <input
                    type="number"
                    placeholder="Введите номер получателя"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <button onClick={checkRecipient}>Начать чат</button>
            </div>
            {openChat && <>
                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${msg.isUser ? styles.user : styles.recipient}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className={styles.inputArea}>
                    <input
                        type="text"
                        placeholder="Введите сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
            </>}
        </div>
    );
};

export default Chat;