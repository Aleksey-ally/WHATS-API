import {getInstance} from "../base-api";
import {IncomingMessageReceivedResponse} from "./receiving.types";

export let receiptId = '';

export const receivingAPI = {
    async receiveNotification() {
        const instance = getInstance();
        const res = await instance.get<IncomingMessageReceivedResponse>(`receiveNotification`);
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