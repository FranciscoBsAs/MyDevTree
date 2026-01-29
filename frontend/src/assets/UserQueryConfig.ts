import { QueryClient, useMutation, useQuery, type DefinedUseQueryResult, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query' ;
import type { updateProfileResponseI, userEditFrontI, userFrontI } from '../interfaces/UserInterfaces';
import { GetUserFetching } from '../api/GetUserFetching_useQuery';
import { UpdateProfileRequest } from '../api/UpdateProfileRequest';
import toastService from '../sharedFrontContent/alertToasts/ToastService';
import { UploadImageRequest } from '../api/UploadImageRequest';



export const getUser_ConfigQuery : UseQueryOptions< userFrontI | undefined, Error > = {

    queryFn: GetUserFetching,

    queryKey: ['user'],
    
    retry: 2 ,

    refetchOnWindowFocus: false

}

export const useMutation_ConfigQuery = ( someQueryClient : QueryClient ) : UseMutationOptions< // Tabular en production
        updateProfileResponseI | undefined, // Lo que RETORNA la API mediante mutationFn
        Error,              // Tipo de error
        userEditFrontI | userFrontI      // Lo que finalmente se envia a la API
> => {

    return (
        {
            mutationFn: UpdateProfileRequest ,

            onError: ( error : Error ) => toastService.error('This error happend while the user profile was updating:  '+ error.message.toUpperCase),

            onSuccess: ( data ) => {
                
                toastService.success(`${data  ?  data.messageSucess  :  'Profile updated successfully' } `)

                someQueryClient.invalidateQueries(
                    {
                        queryKey: ['user']
                    }
                )

            }
        }
    )

}



export const uploadImage_useMutationConfig = ( queryClient : QueryClient ) : UseMutationOptions < updateProfileResponseI | undefined , Error , File > => {

    return(

        {

            mutationFn: UploadImageRequest,

            onError: (error) => toastService.error(error.message)  ,

            onSuccess: ( data ) => {

                queryClient.setQueryData(

                    ['user'], 

                    ( prevData : userFrontI ) => {

                        return {
                            ...prevData,
                            imageURL: data?.imageURL ,
                            //message: data?.message
                            
                        }

                    } 
                
                )

                if( data ) toastService.success( data.message ) ;

            }

        }

    )
    

}










// UseMutationOptions< userEditFrontI | undefined, Error, userEditFrontI >
/**
 * userEditFrontI | undefined (TData) - El tipo de dato que retorna la mutación cuando tiene éxitoEs lo que recibirás en onSuccess(data). Tu API puede retornar un userEditFrontI o undefined. 
 * Error (TError) - El tipo de error que puede ocurrir => Es lo que recibirás en onError(error)
 * userEditFrontI (TVariables) - El tipo de las variables/parámetros que envías a la función de mutación => Es lo que pasas cuando ejecutas la mutación: mutate(userEditFrontI) . Se envía a mutationFn: UpdateProfileRequest
Básicamente: recibes userEditFrontI → envías a la API → obtienes de vuelta userEditFrontI | undefined o un Error.
 */


/*  EN PRODUCTION


export const useMutation_ConfigQuery = (queryClient: QueryClient) : UseMutationOptions<updateProfileResponseI | undefined,Error,userEditFrontI > => ({ RETURN de OBJECT IMPLICITO ({})
    mutationFn: UpdateProfileRequest,

    onError: (error: Error) => toastService.error('This error happend while the user profile was updating: ' + error.message.toUpperCase()),

    onSuccess: (data) => {
        toastService.success(`${data ? data.messageSucess : 'Profile updated successfully'}`)
        
        // Invalida la query para refrescar los datos
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }
})


*/