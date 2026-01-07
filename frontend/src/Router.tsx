import { BrowserRouter, Routes, Route } from 'react-router-dom' ;
import AuthLayout from './layouts/AuthLayout';


export default function TheRouter () {

    return(

        <BrowserRouter>

            <Routes>

                <Route element={ <AuthLayout></AuthLayout> } >

                    <Route></Route>

                    <Route></Route>

                </Route>

            </Routes>

        </BrowserRouter>

    )


}