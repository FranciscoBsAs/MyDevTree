import toastService from "../sharedFrontContent/alertToasts/ToastService";
import APIaxiosInstance from "../configConnection/AxiosInstance";
import { isAxiosError } from 'axios'
import type { userFrontI } from "../interfaces/UserInterfaces";


export async function GetUserFetching () {

    const token : string | null = localStorage.getItem( 'AUTH_TOKEN' )

    try {
        
        const { data } = await APIaxiosInstance.get<userFrontI>( '/admin/profile' )

        return data ;

    } catch (error) {

        if( isAxiosError(error) && error.response && token ) {
            
            toastService.error(error.response.data.error) ;

            throw new Error( error.response.data.error )

        }

    }

}