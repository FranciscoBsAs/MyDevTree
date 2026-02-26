import { Link } from 'react-router-dom' ;
import { thePathsRoutes } from '../routes/PathsRoutes';
import LoginComponent from '../components/LoginComponent';
import './AuthStyle.css'


export default function LoginView () {

    return(

        <div className="w-full max-w-2xl mx-auto" >
            
            <h2 className="text-4xl text-white font-bold">Login</h2>

            <LoginComponent/>

            <nav className='mt-10' >
                <Link to={thePathsRoutes.register} >
                    <button className='btn-detail' >
                        Don't have a account already? <span className='font-bold' >Register</span>
                    </button>
                
                </Link>

            </nav>
            
        </div>

    )

}