import axios from "axios";
import { loadState } from "./storage";

export const request = axios.create({
    baseURL: "http://localhost:3000",
});


// xar bir so'rovga token qo'shib jo'natish
request.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${loadState("user")?.accessToken}`;
    return config
})
