import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'


export default function TheRouter () {

    return(

        <BrowserRouter>
        

            <Routes>

                <Route element={ <AuthLayout></AuthLayout> } >

                    <Route
                        path='/auth/login' element={ <LoginView></LoginView> }
                    ></Route>

                    <Route
                        path='/auth/register' element={ <RegisterView></RegisterView> }
                    ></Route>

                </Route>


                <Route path='/admin' element={<AppLayout></AppLayout>} >

                    <Route
                        index={true} element={<LinkTreeView></LinkTreeView>}
                    >
                    </Route>

                    <Route
                        path='profile' element={<ProfileView></ProfileView>}    //      relative path: /admin/profile  NOT ABSOLUTE PATH
                    >
                    </Route>

                </Route>


            </Routes>


        </BrowserRouter>

    )


}