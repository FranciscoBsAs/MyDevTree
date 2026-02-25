import { useForm } from 'react-hook-form'
import { ErrorMessageComponent } from '../components/ErrorMessageComponent'
import { errorsMessageObj } from '../sharedFrontContent/messagesArray/FrontErrorsMessages'
import type { userEditFrontI, userFrontI } from '../interfaces/UserInterfaces'
import { useQueryClient, useMutation } from '@tanstack/react-query' ;
import {  uploadImage_useMutationConfig, useMutation_ConfigQuery } from "../assets/UserQueryConfig";


export default function ProfileView () {


    const queryClient = useQueryClient() ;

    const data = queryClient.getQueryData< userFrontI | undefined >( ['user'] ) ;

    const updateProfileMutation = useMutation( useMutation_ConfigQuery(queryClient) ) ;


    const { register, handleSubmit, formState:{errors} } = useForm< userEditFrontI >( {defaultValues: {

        handleProfileAlias: data?.handleProfileAlias ,

        description: data?.description ,

    }})


    const uploadImageMutation = useMutation( uploadImage_useMutationConfig(queryClient) ) ;



    const handleUploadImage = ( e : React.ChangeEvent<HTMLInputElement> ) => {

        if(e.target.files) {

            const file : File = e.target.files[0] ;

            // uploadImageMutation.mutate(file) ;   IMPORTANTISIMA LINEA

            uploadImageMutation.mutate(file)
        } 
    }


    const handleUserProfileAlias_Form = ( formData : userEditFrontI ) => {


        if(data && data.links) formData.links = data.links ;
        
        updateProfileMutation.mutate( formData ) ;

    }


    return (

        <div className="relative -mt-6 w-full mx-auto ">

            <h3 className="text-2xl text-white font-bold">Edit Profile</h3>

            <div className=" max-w-3xl " >

                <form
                    action=""
                    className="bg-indigo-100 px-5 py-3 rounded-lg space-y-5 mt-2"
                    onSubmit={ handleSubmit( handleUserProfileAlias_Form ) }
                >

                    <legend className="text-2xl text-slate-800 text-center font-semibold">
                        Edit your profile information
                    </legend>

                    <div className="grid grid-cols-1 gap-2    ">
                        <label htmlFor="handleProfileAlias" className='font-semibold'>Handle Profile Alias</label>
                        <input
                            id='handleProfileAlias'
                            type="text"
                            className="border-none bg-slate-100 rounded-lg p-2 shadow-lg  placeholder-slate-400 "
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
                        <label htmlFor="description" className='font-semibold'>Description</label>
                        <textarea
                            id="description"
                            className="border-none bg-slate-100 rounded-lg p-2 shadow-lg placeholder-slate-400"
                            placeholder="Your description"
                            maxLength={351}
                            {...register( 'description', {
                                maxLength: {
                                    value: 350,
                                    message: errorsMessageObj.maxLengthDescription
                                }
                            } ) }
                        ></textarea>

                        { errors.description && ( <ErrorMessageComponent> {errors.description.message} </ErrorMessageComponent> ) }

                    </div>


                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="imageURL" className='font-semibold'>Image</label>
                        <input
                            type="file"
                            className="border-none bg-slate-100 rounded-lg p-2 shadow-lg  placeholder-slate-400"
                            id="imageURL"
                            name="handle"
                            accept="image/*"
                            onChange={ handleUploadImage }
                            placeholder={ data && data.imageURL}
                        />
                    </div>


                    <input
                        type="submit"
                        className="bg-cyan-700 p-2 text-lg w-full rounded-full  text-slate-200 font-bold cursor-pointer"
                        value="Save changes"
                    />

                </form>

            </div>
            <br/>
        </div>
        
    )

}