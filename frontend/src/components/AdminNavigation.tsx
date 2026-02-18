import { useQueryClient } from "@tanstack/react-query"


export default function AdminNavigation () {

    const queryClient = useQueryClient() ;


    const logout = () => {

        localStorage.removeItem('AUTH_TOKEN') ;
    

        queryClient.invalidateQueries( { queryKey: ['user'] } ) ;



        //navigate(thePathsRoutes.initial)
    }


    return(

        <button 
            className="bg-slate-700 p-3 text-xs w-full text-blue-100 rounded-lg font-bold cursor-pointer" 
            onClick={ logout }
            title="Log out user session"
        >
            Log Out
        </button>
    
    )
}