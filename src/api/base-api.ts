import axios from "axios";

const apiUrl = '1103.api.green-api.com'
const idInstance = '1103184359'
const apiTokenInstance = "c88783d9c1c644c2ad52714bf4936c4ee859356e8e5841ab8d"

// {apiUrl}}/waInstance{{idInstance}}/{{method}}/{{apiTokenInstance}}

export const instance = axios.create(
    {
        baseURL: `https://${apiUrl}/waInstance${idInstance}/`,
    })

let receiptId = ''

instance.interceptors.request.use((config) => {
    if (config.url) {
        config.url = `${config.url.replace(/\/$/, '')}/${apiTokenInstance}`;
    }

    if (config.url?.includes(`deleteNotification`)) {
        config.url += `/${receiptId}`;
        console.log(config.url)
    }

    return config;

}, (error) => {
    console.error(error)
});

export const accountAPI = {
    async getSettings() {
        const res = await instance.get(`getSettings`)
        return res.data
    },
    async getStateInstance() {
        const res = await instance.get(`getStateInstance`)
        return res.data
    },
    async getWaSettings() {
        const res = await instance.get(`getWaSettings`)
        return res.data
    },
    async logout() {
        const res = await instance.get(`logout`)
        return res.data
    },
}


export const receivingAPI = {
    // {{apiUrl}}/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}?receiveTimeout={{seconds}}
    async receiveNotification() {
        const res = await instance.get<incomingMessageReceivedResponse>(`receiveNotification`)
        return res.data
    },

    // {{apiUrl}}/waInstance{{idInstance}}/deleteNotification/{{apiTokenInstance}}/{{receiptId}}
    async deleteNotification(receiptIdArg: string) {
        receiptId = receiptIdArg
        const res = await instance.delete(`deleteNotification`)
        return res.data
    },
    async lastOutgoingMessages() {
        const res = await instance.get(`lastOutgoingMessages`)
        return res.data
    }
}

export const sendingAPI = {
    async sendMessage(chatId: string, message: string) {
        const payload = {chatId, message}
        const res = await instance.post(`sendMessage`, payload)
        return res.data
    }
}

export const serviceAPI = {
    async checkWhatsapp(phoneNumber: number) {
        const res = await instance.post<{existsWhatsapp:boolean}>(`checkWhatsapp`, {phoneNumber})
        return res.data
    }
}

export type incomingMessageReceivedResponse = {
    receiptId: number;
    body: IncomingMessageReceivedResponseBody;
}
export type IncomingMessageReceivedResponseBodyInstanceData = {
    idInstance: number;
    wid: string;
    typeInstance: string;
}
export type IncomingMessageReceivedResponseBodySenderData = {
    chatId: string;
    chatName: string;
    sender: string;
    senderName: string;
    senderContactName: string;
}
export type IncomingMessageReceivedResponseBodyMessageDataExtendedTextMessageData = {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
    forwardingScore: number;
    isForwarded: boolean;
}
export type IncomingMessageReceivedResponseBodyMessageData = {
    typeMessage: string;
    extendedTextMessageData: IncomingMessageReceivedResponseBodyMessageDataExtendedTextMessageData;
}
export type IncomingMessageReceivedResponseBody = {
    typeWebhook: string;
    instanceData: IncomingMessageReceivedResponseBodyInstanceData;
    timestamp: number;
    idMessage: string;
    senderData: IncomingMessageReceivedResponseBodySenderData;
    messageData: IncomingMessageReceivedResponseBodyMessageData;
}