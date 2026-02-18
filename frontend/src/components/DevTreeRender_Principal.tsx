import { Toaster } from "react-hot-toast"
import type { userFrontI } from "../interfaces/UserInterfaces"
import Header from "./Header"
import NavigationTabs from "./NavigationTabs"
import { Link, Outlet } from "react-router-dom"
import LinksInProfile from "./LinksInProfile"

interface devTreeRenderPropsI {
    data : userFrontI
}


export default function DevTreeRender_Principal ( {data} : devTreeRenderPropsI ) {

    return(
    
    <div className="bg-slate-700 min-h-screen" >

            <Toaster position="top-right"/>


            <Header/>


            <div className="bg-stone-300 lg:py-3 px-4 md:px-2 lg:px-10 ">

                <main className="mx-auto max-w-5xl py-5 md:p-0">

                    <NavigationTabs/>

                </main>
                
            </div>

            <div className="flex flex-col md:flex-row gap-10 mt-10  px-5 md:px-10 ">

                <div className="flex-1 ">
                    <Outlet/>
                </div>

                <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">

                    <div className="flex justify-end">
                        
                        <Link 
                            className=" rounded-lg   bg-slate-400 text-1xl" 
                            to={`/${data.handleProfileAlias}`} 
                            target="_blank" 
                            rel="noreferrer noopener"
                        >
                            <p className="font-semibold text-center text-stone-800 p-2 flex" >
                            Visit my Profile: /<span className="text-emerald-800  font-bold" >{data.handleProfileAlias}</span>
                            </p>
                        </Link>

                    </div>

                    <p className="text-2xl text-center text-white">📌 {data.handleProfileAlias}</p>

                    {
                        data.imageURL 
                        && 
                        data.imageURL.trim() !== ""
                        && 
                        <img src={data.imageURL} alt="Profile Image" className="mx-auto max-w-[250px] rounded-md" />
                    }
                    


                    <p className="mt-2 flex flex-col gap-5 text-white p-3 bg-stone-700 rounded-lg" >{data.description}</p>


                    { 
                        data.links  
                        &&  
                        data.links !== '[]' 
                                    ? <LinksInProfile  data={data}/> 
                                    : <p className="text-amber-200" >No social data available</p> 
                    }

                </div>

            </div>


        </div>

    
    )
}