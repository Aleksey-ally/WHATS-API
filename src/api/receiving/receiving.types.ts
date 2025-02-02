export type IncomingMessageReceivedResponse = {
    receiptId: number;
    body: IncomingMessageReceivedResponseBody;
};

export type IncomingMessageReceivedResponseBodyInstanceData = {
    idInstance: number;
    wid: string;
    typeInstance: string;
};

export type IncomingMessageReceivedResponseBodySenderData = {
    chatId: string;
    chatName: string;
    sender: string;
    senderName: string;
    senderContactName: string;
};

export type IncomingMessageReceivedResponseBodyMessageDataExtendedTextMessageData = {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
    forwardingScore: number;
    isForwarded: boolean;
};

export type IncomingMessageReceivedResponseBodyMessageData = {
    typeMessage: string;
    extendedTextMessageData: IncomingMessageReceivedResponseBodyMessageDataExtendedTextMessageData;
};

export type IncomingMessageReceivedResponseBody = {
    typeWebhook: string;
    instanceData: IncomingMessageReceivedResponseBodyInstanceData;
    timestamp: number;
    idMessage: string;
    senderData: IncomingMessageReceivedResponseBodySenderData;
    messageData: IncomingMessageReceivedResponseBodyMessageData;
};