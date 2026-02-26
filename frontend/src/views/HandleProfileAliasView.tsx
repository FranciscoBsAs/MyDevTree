import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom" ;
import { GetUserByHandleProfileAlias } from "../api/GetUserByHandleProfileAlias";
import DataByHandleProfileAlias from "../components/DataByHandleProfileAlias";
import { thePathsRoutes } from "../routes/PathsRoutes";


export default function HandleProfileAliasView () {


    const params = useParams() ;


    const handleProfileAlias = params.handleProfileAlias! ;


    const { data, error, isLoading  } = useQuery ({
        queryFn: ()  => GetUserByHandleProfileAlias( handleProfileAlias ),
        queryKey: ['handleProfileAlias', handleProfileAlias],
        retry: 2
    })

    if(isLoading) return <div className="bg-slate-700 min-h-screen flex items-center justify-center text-white text-2xl">Loading...</div>;
    
    if(error) return <Navigate to={thePathsRoutes.notFound}/> ;


    if(data) return <DataByHandleProfileAlias dataProp={data} />

}