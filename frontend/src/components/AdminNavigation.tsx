import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { thePathsRoutes } from "../routes/PathsRoutes";


export default function AdminNavigation () {

    const queryClient = useQueryClient() ;

    const navigate = useNavigate()

    const logout = () => {

        localStorage.removeItem('AUTH_TOKEN') ;
    

        queryClient.invalidateQueries( { queryKey: ['user'] } ) ;



        //navigate(thePathsRoutes.initial)
    }


    return(

        <button 
            className="bg-slate-700 p-3 text-xs w-full text-blue-100 rounded-lg font-bold cursor-pointer" 
            onClick={ logout }
        >
            Log Out
        </button>
    
    )
}