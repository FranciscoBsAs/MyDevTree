import { Link } from "react-router-dom";
import { thePathsRoutes } from "../routes/PathsRoutes";

export default function LogoDevTree () {

    return(
    

        <Link to={thePathsRoutes.homeAdmin} >

            <img src="/myDevTree_Logo.jpg" alt="Logotipo MyDevTree" className="h-20" ></img>

        
        </Link>

    
    )
}