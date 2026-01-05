import { Link } from 'react-router-dom'

export default function LoginView () {

    return(
        <div>
        
            <h2 
                className=' text-4xl
                            text-white 
                            font-bold
                ' 
            > Login
            </h2>

            <nav className='mt-10' >

                <Link
                    to="/auth/register"
                >
                    <button> Dont have? Register </button>
                </Link>   

            </nav>


        </div>



    )


}