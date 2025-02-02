import {getInstance} from "../base-api";

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