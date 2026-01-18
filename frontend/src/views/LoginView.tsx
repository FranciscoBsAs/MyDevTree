import { Link } from 'react-router-dom' ;
import { useForm } from 'react-hook-form' ;
import type { userLoginFrontI } from '../interfaces/UserInterfaces' ;
import { ErrorMessageComponent } from '../components/ErrorMessageComponent' ;
import { errorsMessageObj } from '../sharedFrontContent/messagesArray/FrontErrorsMessages' ;
import axios from 'axios'
import { isAxiosError } from 'axios'
import APIaxiosInstance from '../configConnection/AxiosInstance'
import { toastService } from '../sharedFrontContent/alertToasts/ToastService';



export default function LoginView () {


    const initialValues : userLoginFrontI = { // defaultValues para destructing en useForm({})
        email: '',
        password: ''
    }


    const { register, handleSubmit, formState:{errors}, reset } = useForm( { defaultValues: initialValues } )


    const handleLogin = async ( loginInputData : userLoginFrontI ) => {

        try {

            const {data} = await APIaxiosInstance.post(`/root/auth/login` , loginInputData)

            toastService.success( data.sucessLogin ) ;


            reset() ;
            
        } catch (error) {

            if( isAxiosError(error) && error.response ) toastService.error( error.response.data.errorPassword || error.response.data.errorFound )
        
        }

    }


    return(

        <div>
            <h2 className="text-4xl text-white font-bold">Login</h2>
            


            {/*form.bg-white.px-5.py-20.rounded-lg.space-y-10.mt-10[onSubmit={} noValidate=]>(div.grid.grid-cols-1.space-y-3>label.text-1xl.text-slate-500+input.bg-slate-100.border-none.p-2.rounded-lg.placeholder-slate-400[id=x type=x placeholder=x ]+{{errors.x && <ErrorMessageComponent></ErrorMessageComponent>}})*2 */}

            <div className="w-full max-w-2xl mx-auto">

                <form action="" className="bg-white px-5 py-5 rounded-lg space-y-5 mt-2" onSubmit={ handleSubmit(handleLogin) } noValidate>


                    <div className="grid grid-cols-1 space-y-3">
                    
                        <label htmlFor="email" className="text-1xl text-slate-500">Email</label>
                    
                        <input 
                            type="email" 
                            className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" 
                            id="email" 
                            placeholder="Email"
                            {...register('email', {
                                required: errorsMessageObj.required('Email') ,
                                pattern:{
                                    value: /\S+@\S+\.\S+/ ,
                                    message: errorsMessageObj.format
                                }
                            } )
                            }
                        />
                    
                        {  errors.email && <ErrorMessageComponent> { errors.email.message } </ErrorMessageComponent>  }

                    </div>
                
                
                    <div className="grid grid-cols-1 space-y-3">
                    
                        <label htmlFor="password" className="text-1xl text-slate-500">Password</label>
                    
                        <input 
                            type="text" 
                            className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400" 
                            id="password" 
                            placeholder="password" 
                            {...register('password', {
                                required: errorsMessageObj.required('password')
                            })}
                        
                        />
                    
                        {  errors.password && <ErrorMessageComponent> { errors.password.message } </ErrorMessageComponent> }
                    
                    </div>
            
                    <input type="submit" className="bg-cyan-700 p-3 text-lg w-full text-slate-200 rounded-lg font-bold cursor-pointer" value="Login" />


                </form>

            </div>



            <nav className='mt-10' >
                <Link to="/auth/register" >
                    <button>
                        Dont have a account already? Register
                    </button>
                
                </Link>

            </nav>
        </div>

    )

}