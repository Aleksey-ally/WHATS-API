import axios from "axios";
import {receiptId} from "@/api/receiving";

let idInstance = '';
let apiTokenInstance = '';
let apiUrl = '';

export const setInstance = (id: string, token: string) => {
    idInstance = id;
    apiTokenInstance = token;
    apiUrl = `${id.slice(0, 4)}.api.green-api.com`
};

const createInstance = () => {
    return axios.create({
        baseURL: `https://${apiUrl}/waInstance${idInstance}/`,
    });
};

const setupInterceptors = (instance: axios.AxiosInstance) => {

    instance.interceptors.request.use((config) => {
        if (config.url) {
            config.url = `${config.url.replace(/\/$/, '')}/${apiTokenInstance}`;
        }

        if (config.url?.includes(`deleteNotification`)) {
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