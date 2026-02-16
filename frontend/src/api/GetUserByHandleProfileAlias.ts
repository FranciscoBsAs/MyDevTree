import { isAxiosError } from "axios" ;
import APIaxiosInstance from "../configConnection/AxiosInstance";
import type { userByHandleProfileAliasI  } from "../interfaces/UserInterfaces";


export async function GetUserByHandleProfileAlias ( handleProfileAlias : string ) {

    try {
        
        const { data } = await APIaxiosInstance.get<userByHandleProfileAliasI>(`/${handleProfileAlias}`)


        return data ;

    } catch (error) {

        if( isAxiosError(error) && error.response ) throw new Error( error.response.data.error ) ;
        
    }

}