import { Link, Outlet } from "react-router-dom" ;
import { Toaster } from "react-hot-toast";
import NavigationTabs from "../components/NavigationTabs";
import { useQuery } from '@tanstack/react-query' ;
import { Navigate } from "react-router-dom";
import { getUser_ConfigQuery } from "../assets/UserQueryConfig";
import LinksInProfile from "../components/LinksInProfile";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { thePathsRoutes } from "../routes/PathsRoutes";
import DevTreeRender_Principal from "../components/DevTreeRender_Principal";


export default function AppLayout () {


    const { data, isLoading, isError } = useQuery( getUser_ConfigQuery )

    
    const [ redirect, setRedirect ] = useState(false) ;

    /*
    useEffect( () => {
        
        if(isError) {

            const timer = setTimeout(() => {
                setRedirect(true)
            }, 3000);

            return () => clearTimeout(timer)
        
        }

    }, [isError] )
    */

    
    if(isLoading) return <div className="bg-slate-700 min-h-screen flex items-center justify-center text-white text-2xl">Loading...</div>;
    
    if( isError ) return <Navigate to={thePathsRoutes.login} /> ;
  
    
    if( !isError && data) return <DevTreeRender_Principal data={data} />

        // Real Emmet snippet:
            //div>(header.bg-slate-800.py-5>div.mx-auto.max-w-5xl.flex.flex-cols.md:flex-row.items-center.md:justify-between>(div.w-full.p-5.lg:p-0.md:w-1/3>img.w-full.blocl[src=/myDevTree_Logo.jpg])+(div.md:w-1/3.md:flex.md:justify-end>(button.bg-line-500.p-2.text-slate-800.uppercase.front-black.text-xs.rounded-lg.cursor-pointer[onClick={}]>{LogOut})))+(div.bg-gray-100.min-h-screen.py-10>main.mx-auto.max-w-5xl.p-10.md:p-0>div.flex.justify-end>Link.font-bold.text-right.text-slate-800.text-2xl[to={''} target="_blank" rel="noreferrer noopener"]>{Visit my Profile})+((div.flex.flex-col.md:flex-row.gap-10.mt-10>div.flex-1>Outlet)+div.w-full.md:w-96.bg-slate-800.px-5.py-10.space-y-6)+Toaster[position="top-right"]

}