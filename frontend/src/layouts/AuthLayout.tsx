import { Outlet } from 'react-router-dom'


export default function AuthLayout () {

    return(

        <div className=" bg-slate-700 min-h-screen " >

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
                                items-center'
                >

                    <img
                        src='/myDevTree_Logo.jpg' 
                        alt='Logotipo de MyDevTree' 
                        className='h-14'
                    >
                    </img>
                
                </div>

                <div className='py-9 ' >
                    <h1 className='text-white' >
                        Hi from Login-View 
                    </h1>
                </div>

            </div>

                <Outlet></Outlet>

        </div>

    )

}