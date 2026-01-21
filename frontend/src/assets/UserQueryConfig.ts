import { useQuery, type DefinedUseQueryResult, type UseQueryOptions } from '@tanstack/react-query' ;
import type { userFrontI } from '../interfaces/UserInterfaces';
import { GetUserFetching } from '../api/GetUserFetching_useQuery';


export const getUser_ConfigQuery : UseQueryOptions< userFrontI | undefined, Error > = {

    queryFn: GetUserFetching,

    queryKey: ['user'],
    
    retry: 2 ,

    refetchOnWindowFocus: false

}