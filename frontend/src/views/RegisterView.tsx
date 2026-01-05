import { Link } from "react-router-dom";

export default function RegisterView () {

    return(

        <div>
            <h2 
                className=' text-4xl
                            text-white 
                            font-bold
                ' 
            > Made a account  
            </h2>

            <nav className='mt-10' >

                <Link
                    to="/auth/login"
                >
                    <button> Already have a account? Login </button>
                </Link>   

            </nav>


        </div>

    )

}