import { useNavigate } from 'react-router-dom' ;
import { useForm } from 'react-hook-form' ;
import type { userLoginFrontI } from '../interfaces/UserInterfaces' ;
import { ErrorMessageComponent } from '../components/ErrorMessageComponent' ;
import { errorsMessageObj } from '../sharedFrontContent/messagesArray/FrontErrorsMessages' ;
import { isAxiosError } from 'axios'
import APIaxiosInstance from '../configConnection/AxiosInstance'
import { toastService } from '../sharedFrontContent/alertToasts/ToastService';
import { thePathsRoutes } from '../routes/PathsRoutes';
import { useQueryClient } from '@tanstack/react-query';


export default function LoginComponent () {

    const queryClient = useQueryClient() ;

    const navigate = useNavigate() ;


    const initialValues : userLoginFrontI = {
        email: '',
        password: ''
    }


    const { register, handleSubmit, reset, formState:{errors}  } = useForm({defaultValues: initialValues}) ;



    const handleLogin = async ( loginInputData : userLoginFrontI ) => {

        try {
        
            const { data } = await APIaxiosInstance.post('/auth/login', loginInputData) ;


            localStorage.setItem('AUTH_TOKEN', data.token) ;

            
            // Force to refresh the the state of the previous well-authentication user 

            await queryClient.invalidateQueries( {queryKey: ["user"]} ) ;


            toastService.success( data.successLogin ) ;

            reset() ;

            navigate( thePathsRoutes.homeAdmin ) ;

        } 
        catch (error) {
            
            if( isAxiosError(error) && error.response ) toastService.error( error.response.data.errorPassword || error.response.data.errorFound )

        }

    }


    return(

        <div className="w-full max-w-2xl mx-auto">
            
            {/*form.bg-white.px-5.py-20.rounded-lg.space-y-10.mt-10[onSubmit={} noValidate=]>(div.grid.grid-cols-1.space-y-3>label.text-1xl.text-slate-500+input.bg-slate-100.border-none.p-2.rounded-lg.placeholder-slate-400[id=x type=x placeholder=x ]+{{errors.x && <ErrorMessageComponent></ErrorMessageComponent>}})*2 */}

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
                        type="password" 
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
    
    )
}