import { useLocation } from "react-router-dom"
import HomeNavigation from "./HomeNavigation";
import AdminNavigation from "./AdminNavigation";
import LogoDevTree from "./LogoDevTree";
import { useQuery } from "@tanstack/react-query";
import { getUser_ConfigQuery } from "../assets/UserQueryConfig";
import { Link } from "react-router-dom";


export default function Header () {

    const location = useLocation() ;

    const { data, isLoading, isError } = useQuery( getUser_ConfigQuery ) ;



    return(
    
        <header className="bg-slate-800 py-5">

            <div className=" bg-slate-800 h-14 flex items-center" >

                <div className="max-w-7x1 mx-auto px-5 h-full flex items-center justify-between gap-4">
                    
                    <Link
                        className=""
                        to={`/${data?.handleProfileAlias}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <h1 title="View your profile" className="absolute cursor-pointer left-11 top-7 p-2 rounded-full font-bold text-xl bg-stone-600" >
                            🪪
                        </h1>
                    </Link>
                    
                    
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