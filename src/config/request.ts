import axios from "axios";

export const request = axios.create({
    baseURL: "http://localhost:3000",
});

// api nomi bilan ham eksport qilish
export const api = request;

// Default export qo'shish
export default request;



