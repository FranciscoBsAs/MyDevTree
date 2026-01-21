import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const APIaxiosInstance : AxiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_MEMPHIS_BACK
    }
)

APIaxiosInstance.interceptors.request.use(

    ( config : InternalAxiosRequestConfig ) => {

        const token : string | null = localStorage.getItem( 'AUTH_TOKEN' )


        if(token) config.headers.Authorization = `Bearer ${token}`  ;


        return config

    }
)

export default APIaxiosInstance ;