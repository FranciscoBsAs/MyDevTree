import axios, { type AxiosInstance } from "axios";

const APIaxiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_MEMPHIS_BACK
    }
)

export default APIaxiosInstance ;