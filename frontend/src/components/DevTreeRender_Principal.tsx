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

            //div>(header.bg-slate-800.py-5>div.mx-auto.max-w-5xl.flex.flex-cols.md:flex-row.items-center.md:justify-between>(div.w-full.p-5.lg:p-0.md:w-1/3>img.w-full.blocl[src=/myDevTree_Logo.jpg])+(div.md:w-1/3.md:flex.md:justify-end>(button.bg-line-500.p-2.text-slate-800.uppercase.front-black.text-xs.rounded-lg.cursor-pointer[onClick={}]>{LogOut})))+(div.bg-gray-100.min-h-screen.py-10>main.mx-auto.max-w-5xl.p-10.md:p-0>div.flex.justify-end>Link.font-bold.text-right.text-slate-800.text-2xl[to={''} target="_blank" rel="noreferrer noopener"]>{Visit my Profile})+((div.flex.flex-col.md:flex-row.gap-10.mt-10>div.flex-1>Outlet)+div.w-full.md:w-96.bg-slate-800.px-5.py-10.space-y-6)+Toaster[position="top-right"]



    <div className="bg-slate-700 min-h-screen" >

            <Toaster position="top-right"/>


            <Header/>


            <div className="bg-stone-300 md:py-2.5 lg:py-3 px-4 md:px-2 lg:px-10 ">

                <main className="mx-auto max-w-5xl py-2 md:p-0">

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