import { useForm } from 'react-hook-form'
import { ErrorMessageComponent } from '../components/ErrorMessageComponent'
import { errorsMessageObj } from '../sharedFrontContent/messagesArray/FrontErrorsMessages'
import type { userEditFrontI, userFrontI } from '../interfaces/UserInterfaces'
import { useQuery, type UseQueryOptions, useQueryClient, useMutation } from '@tanstack/react-query' ;
import { Navigate } from "react-router-dom";
import { GetUserFetching } from "../api/GetUserFetching_useQuery";
import { getUser_ConfigQuery, useMutation_ConfigQuery } from "../assets/UserQueryConfig";




export default function ProfileView () {


    const queryClient = useQueryClient() ;

    const data = queryClient.getQueryData< userFrontI | undefined >( ['user'] ) ;

    const updateProfileMutation = useMutation( useMutation_ConfigQuery(queryClient) ) ;


    const { register, handleSubmit, formState:{errors} } = useForm< userEditFrontI >( {defaultValues: {

        handleProfileAlias: data?.handleProfileAlias ,

        description: data?.description ,

    }})





    const handleUserProfileAlias_Form = ( formData : userEditFrontI ) => {

        console.log('desde handleUserProfile_Form: ', formData) ;

        updateProfileMutation.mutate( formData ) ;

    }


    return (

        <div>

            <h3 className="text-2xl text-white font-bold">Edit Profile</h3>

            <div className="w-full max-w-2xl mx-auto" >

                <form
                    action=""
                    className="bg-white px-5 py-5 rounded-lg space-y-5 mt-2"
                    onSubmit={ handleSubmit( handleUserProfileAlias_Form ) }
                >

                    <legend className="text-2xl text-slate-800 text-center">
                        Edit Profile Information
                    </legend>

                    <div className="grid grid-cols-1 gap-2   space-y-3 ">
                        <label htmlFor="">Handle Profile Alias</label>
                        <input
                            type="text"
                            className="border-none bg-slate-100 rounded-lg p-2  placeholder-slate-400 "
                            placeholder="handle profile alias or user name"
                            {...register( 'handleProfileAlias', 
                                {
                                    required: errorsMessageObj.required('Handle Profile Alias')
                                }
                            )}
                        />

                        { errors.handleProfileAlias && <ErrorMessageComponent> {errors.handleProfileAlias.message} </ErrorMessageComponent> }

                    </div>

                    
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="">Description</label>
                        <textarea
                            id="description"
                            className="border-none bg-slate-100 rounded-lg p-2  placeholder-slate-400"
                            placeholder="Your description"
                            {...register( 'description' )}
                        ></textarea>
                    </div>


                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="">Image</label>
                        <input
                            type="file"
                            className="border-none bg-slate-100 rounded-lg p-2  placeholder-slate-400"
                            id="image"
                            name="handle"
                            accept="image/*"
                            onChange={() => {}}
                        />
                    </div>


                    <input
                        type="submit"
                        //className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                        className="bg-cyan-400 p-3 text-lg w-full text-slate-200 rounded-lg font-bold cursor-pointer"
                        value="Save changes"
                    />

                </form>

            </div>
            <br/>
        </div>
        
    )

}