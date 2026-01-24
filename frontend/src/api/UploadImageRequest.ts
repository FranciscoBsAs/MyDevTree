import { isAxiosError } from "axios";
import APIaxiosInstance from "../configConnection/AxiosInstance";
import type { updateProfileResponseI } from "../interfaces/UserInterfaces";

export async function UploadImageRequest ( file : File ) {

    let formData = new FormData() ; 
    console.table(formData) ;

    formData.append( 'file', file ) ;

    try {
        
        const { data } = await APIaxiosInstance.post<updateProfileResponseI>( '/admin/profile/image', formData )

        return data ;

    } catch (error) {
        
        if( isAxiosError(error) && error.response )   throw new Error( error.response.data.error ) ;

    }

}