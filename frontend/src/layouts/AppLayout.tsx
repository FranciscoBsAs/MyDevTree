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

    
    if(isLoading) return <div className="bg-slate-700 min-h-screen flex items-center justify-center text-white text-2xl">Loading...</div>;
    
    if( isError ) return <Navigate to={thePathsRoutes.login} /> ;
  
    
    if( !isError && data) return <DevTreeRender_Principal data={data} />

}