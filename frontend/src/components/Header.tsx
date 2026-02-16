import { useLocation } from "react-router-dom"
import HomeNavigation from "./HomeNavigation";
import AdminNavigation from "./AdminNavigation";
import LogoDevTree from "./LogoDevTree";


export default function Header () {

    const location = useLocation() ;

    return(
    
        <header className="bg-slate-800 py-5">

            <div className=" bg-slate-800 h-14 flex items-center" >

                <div className="max-w-7x1 mx-auto px-5 h-full flex items-center justify-between gap-4">
                    <LogoDevTree/>
                    <h1 className='text-white font-bold text-lg '>Your DevTree website</h1>
                </div>

                <nav className="md:flex pr-5 ">


                    { location.pathname === '/'  
                                        ? <HomeNavigation/>
                                        : <AdminNavigation/>
                    }


                </nav>
            
            </div>
        </header>
    
    )
}