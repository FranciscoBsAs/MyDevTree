import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LogoDevTree from '../components/LogoDevTree'


export default function AuthLayout () {

    return(


        <div className="bg-slate-700 min-h-screen">

            <Toaster position="top-right"/>

            <div className=' bg-slate-800 h-18 flex items-center'>

                <div className="max-w-7x1 mx-auto py-2 px-5 h-full flex items-center  justify-between gap-4">
                    <LogoDevTree/>
                    <h1 className="text-white">DevTree web site</h1>
                </div>




            </div>

            <Outlet/>
        
        </div>


    )

}