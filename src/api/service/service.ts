import {getInstance} from "../base-api";

export const serviceAPI = {
    async checkWhatsapp(phoneNumber: number) {
        const instance = getInstance();
        const res = await instance.post<{ existsWhatsapp: boolean }>(`checkWhatsapp`, {phoneNumber});
        return res.data;
    },
};