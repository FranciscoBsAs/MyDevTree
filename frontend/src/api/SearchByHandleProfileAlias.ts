import { isAxiosError } from "axios";
import APIaxiosInstance from "../configConnection/AxiosInstance";


interface searchResponseI {
    success : string
}

export default async function SearchByHPA ( handleProfileAlias : string ) {

    try {

        const { data } = await APIaxiosInstance.post<searchResponseI>(`/search`, {handleProfileAlias})


        return data ;

    } catch (error) {

        if( isAxiosError(error) && error.response ) throw new Error( error.response.data.error ) ;
        
    }

}