import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'
import HandleProfileAliasView from './views/HandleProfileAliasView'
import NotFoundView from './components/NotFoundView'
import HomeView from './views/HomeView'
import { thePathsRoutes } from './routes/PathsRoutes'


export default function TheRouter () {

    return(

        <BrowserRouter>
        

            <Routes>

                <Route element={ <AuthLayout></AuthLayout> } >

                    <Route
                        path={thePathsRoutes.login} element={ <LoginView></LoginView> }
                    ></Route>

                    <Route
                        path={thePathsRoutes.register} element={ <RegisterView></RegisterView> }
                    ></Route>

                </Route>


                <Route path={thePathsRoutes.homeAdmin} element={<AppLayout></AppLayout>} >

                    <Route
                        index={true} element={<LinkTreeView></LinkTreeView>}
                    >
                    </Route>

                    <Route
                        path={thePathsRoutes.profile_IndexFalse} element={<ProfileView></ProfileView>}    //      relative path: /admin/profile  NOT ABSOLUTE PATH
                    >
                    </Route>

                </Route>



                <Route path={thePathsRoutes.dynamicHPA} element={<AuthLayout/>}>

                    <Route
                        element={<HandleProfileAliasView></HandleProfileAliasView>}
                        index={true}
                    >

                    </Route>

                </Route>


                <Route path={thePathsRoutes.initial} element={<HomeView/>} ></Route>


                <Route element={<AuthLayout/>} path={thePathsRoutes.notFound} >

                    <Route
                        element={<NotFoundView/>}
                        index={true}
                    >

                    </Route>

                </Route>

            </Routes>


        </BrowserRouter>

    )


}