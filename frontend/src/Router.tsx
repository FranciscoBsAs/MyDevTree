import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'


export default function TheRouter () {

    return(

        <BrowserRouter>

            <Routes>

                <Route element={ <AuthLayout></AuthLayout> } >

                    <Route
                        path='/auth/login' element={ <LoginView></LoginView> } 
                    >
                    </Route>

                    <Route
                        path='/auth/register' element={ <RegisterView></RegisterView> }
                    >
                    </Route>

                </Route>


            </Routes>
        
        </BrowserRouter>

    )

}