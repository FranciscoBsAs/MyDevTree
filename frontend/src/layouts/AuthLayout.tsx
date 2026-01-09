import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


export default function AuthLayout () {

    return(

        <div className=" bg-slate-700 min-h-screen " >

            <Toaster position="top-center"/>

            <div 
                className=' bg-slate-800 
                            h-16 flex 
                            items-center' 
            >

                <div
                    className=' max-w-7x1 
                                mx-auto 
                                px-5    
                                h-full    
                                flex     
                                items-center
                                
                                justify-between
                                gap-4
                    '// justify-between is the horizontal alination for the elements contended 
                >

                    <img src='/myDevTree_Logo.jpg' alt='Logotipo de MyDevTree' className='h-14'></img>

                    <h1 className='text-white' >
                        Hi from Login-View 
                    </h1>
                
                </div>


            </div>

            <Outlet></Outlet>

        </div>

    )

}