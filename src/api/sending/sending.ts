import {getInstance} from "../base-api";

export const sendingAPI = {
    async sendMessage(chatId: string, message: string) {
        const instance = getInstance();
        const payload = {chatId, message};
        const res = await instance.post(`sendMessage`, payload);
        return res.data;
    },
};