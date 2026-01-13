import axios, { type AxiosInstance } from "axios";

const APIaxiosInstance : AxiosInstance = axios.create(
    {
        baseURL: String(import.meta.env.VITE_MEMPHIS_BACK)
    }
)

export default APIaxiosInstance ;