import { Link } from "react-router-dom" ;
import './AuthStyle.css'
import { thePathsRoutes } from "../routes/PathsRoutes";
import RegisterComponent from "../components/RegisterComponent";


export default function RegisterView () {

    return (

        <div>
            

            <h2 className="text-2xl text-white font-bold">Made a account</h2>

            <div className="w-full max-w-2xl mx-auto">
            
                <RegisterComponent/>
                            
                <nav className="mt-10 text-3xl" >
                    <Link to={thePathsRoutes.login} >
                        <button className="btn-detail" >Already have a account? <span className="font-bold text-lg">Login</span></button>
                    </Link>
                </nav>
                <br/>

            </div>

        </div>

    )


}