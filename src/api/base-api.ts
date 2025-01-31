import axios from "axios";

const apiUrl = '1103.api.green-api.com'
const idInstance = '1103184359'
const apiTokenInstance = "c88783d9c1c644c2ad52714bf4936c4ee859356e8e5841ab8d"

// {apiUrl}}/waInstance{{idInstance}}/{{method}}/{{apiTokenInstance}}

export const instance = axios.create(
    {
        baseURL: `https://${apiUrl}/waInstance${idInstance}/`,
    })

instance.interceptors.request.use((config) => {
    if (config.url) {
        config.url = `${config.url.replace(/\/$/, '')}/${apiTokenInstance}`;
    }
    return config;

}, (error) => {
    console.log(error)
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
    async logout() {
        const res = await instance.get(`logout`)
        return res.data
    },
}