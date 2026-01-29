import { isAxiosError } from "axios";
import APIaxiosInstance from "../configConnection/AxiosInstance";
import type { updateProfileResponseI, userEditFrontI, userFrontI } from "../interfaces/UserInterfaces";


export async function UpdateProfileRequest ( formData : userEditFrontI | userFrontI ) {

    try {
        
        const { data } = await APIaxiosInstance.patch<updateProfileResponseI>('/admin/profile', formData)

        return data ;


    } catch (error) {

        if( isAxiosError(error) && error.response ) throw new Error( error.response.data.error ) ;
        
    }

}