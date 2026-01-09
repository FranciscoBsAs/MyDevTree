import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


export default function AuthLayout () {

    return(


        <div className="bg-slate-700 min-h-screen">
            <Toaster position="top-center"/>

            <div
                className=' bg-slate-800 
                            h-16 flex 
                            items-center' 
            >


                <div className="bg-slate-800 h-16 flex items-center">

                    <div className="max-w-7x1 mx-auto px-5 h-full flex items-center">
                        <img src="/myDevTree_Logo.jpg" alt="Logotipo MyDevTree" className="h-14" />
                    </div>

                    <div className="py-9">
                        <h1 className="text-white"></h1>
                    </div>

                </div>

                <Outlet/>

            </div>

        </div>


    )

}