import s from "@/components/Chat/Chat.module.scss";

export type MessagesProps = {
    message: string
    messages: Messages
    sendMessage: () => void
    setMessage: (message: string) => void
}

export type Messages = { text: string; isUser: boolean, idMessage: string }[]

export const Messages = ({messages, setMessage, message, sendMessage}: MessagesProps) => {

    return (
        <>
            <ul className={s.messages}>
                {messages.map((msg, index) => (
                    <li key={index} className={`${s.message} ${msg.isUser ? s.user : s.recipient}`}>
                        {msg.text}
                    </li>
                ))}
            </ul>
            <div className={s.inputArea}>
                <input
                    type="text"
                    placeholder="Введите сообщение"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </>
    )
}