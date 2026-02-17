import { Link } from "react-router-dom";
import { thePathsRoutes } from "../routes/PathsRoutes";

export default function LogoDevTree () {

    return(
    

        <Link to={thePathsRoutes.homeAdmin} >

            <img title="Go to the Home page" src="/myDevTree_Logo.jpg" alt="Logotipo MyDevTree" className="h-20 rounded-md" ></img>

        
        </Link>

    
    )
}