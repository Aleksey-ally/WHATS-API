import axios from "axios";

let idInstance = '';
let apiTokenInstance = '';
let apiUrl = '';

export const setInstance = (id: string, token: string) => {
    idInstance = id;
    apiTokenInstance = token;
    apiUrl = `${id.slice(0,4)}.api.green-api.com`
};

const createInstance = () => {
    return axios.create({
        baseURL: `https://${apiUrl}/waInstance${idInstance}/`,
    });
};

let receiptId = '';

const setupInterceptors = (instance: ReturnType<typeof axios.create>) => {

    instance.interceptors.request.use((config) => {
        if (config.url) {
            config.url = `${config.url.replace(/\/$/, '')}/${apiTokenInstance}`;
        }

        if (config.url?.includes(`deleteNotification`)) {
            // debugger
            config.url += `/${receiptId}`;
        }

        return config;
    }, (error) => {
        console.error(error);
    });

    return instance;
};

export const getInstance = () => {
    const instance = createInstance();
    return setupInterceptors(instance);
};

export const accountAPI = {
    async getSettings() {
        const instance = getInstance();
        const res = await instance.get(`getSettings`);
        return res.data;
    },
    async getStateInstance() {
        const instance = getInstance();
        const res = await instance.get(`getStateInstance`);
        return res.data;
    },
    async getWaSettings() {
        const instance = getInstance();
        const res = await instance.get(`getWaSettings`);
        return res.data;
    },
    async logout() {
        const instance = getInstance();
        const res = await instance.get(`logout`);
        return res.data;
    },
};

export const receivingAPI = {
    async receiveNotification() {
        const instance = getInstance();
        const res = await instance.get<incomingMessageReceivedResponse>(`receiveNotification`);
        return res.data;
    },
    async deleteNotification(receiptIdArg: string) {
        receiptId = receiptIdArg
        const instance = getInstance();
        const res = await instance.delete(`deleteNotification`);
        return res.data;
    },
    async lastOutgoingMessages() {
        const instance = getInstance();
        const res = await instance.get(`lastOutgoingMessages`);
        return res.data;
    },
};

export const sendingAPI = {
    async sendMessage(chatId: string, message: string) {
        const instance = getInstance();
        const payload = { chatId, message };
        const res = await instance.post(`sendMessage`, payload);
        return res.data;
    },
};

export const serviceAPI = {
    async checkWhatsapp(phoneNumber: number) {
        const instance = getInstance();
        const res = await instance.post<{ existsWhatsapp: boolean }>(`checkWhatsapp`, { phoneNumber });
        return res.data;
    },
};

// Типы
export type incomingMessageReceivedResponse = {
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