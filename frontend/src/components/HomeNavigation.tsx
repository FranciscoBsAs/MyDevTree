import { Link } from "react-router-dom"
import { thePathsRoutes } from "../routes/PathsRoutes"


export default function HomeNavigation () {

    return(
    
        <div>

            <Link
                className="text-slate-300 p-2 font-black text-xs cursor-pointer"
                to={thePathsRoutes.login}
            >
                Login
            </Link>


            <Link
                className="bg-lime-400 text-slate-800 p-2 font-black text-xs cursor-pointer rounded-lg"
                to={thePathsRoutes.register}
            >
                Register
            </Link>

        </div>
    
    )
}