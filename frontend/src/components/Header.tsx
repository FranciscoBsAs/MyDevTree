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

                <div className="max-w-8xl mx-auto px-5 h-full flex place-items-center justify-between lg:gap-5 md:gap-x-20 gap-x-10  ">
                    
                    {
                        data 
                        &&
                        <Link
                            to={`/${data?.handleProfileAlias}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <h1 
                                title="View your profile" 
                                className="xl:-ml-80 2xl:-ml-40 w-12 h-11 rounded-full bg-stone-600 text-3xl font-bold flex items-start justify-start leading-none "                        >
                                🪪
                            </h1>
                        </Link>
                    }
                    
                    
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