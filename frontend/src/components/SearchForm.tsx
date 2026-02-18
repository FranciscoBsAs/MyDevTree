import { useForm } from "react-hook-form";
import { ErrorMessageComponent } from "./ErrorMessageComponent";
import { errorsMessageObj } from "../sharedFrontContent/messagesArray/FrontErrorsMessages";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import SearchByHPA from "../api/SearchByHandleProfileAlias";
import { Link } from "react-router-dom";
import { thePathsRoutes } from "../routes/PathsRoutes";


export default function SearchForm () {

    const defaultValuesForm = {
        handleProfileAlias: ''
    } 

    const { register, handleSubmit, watch, formState:{errors} } = useForm( {defaultValues: defaultValuesForm}  ) ;


    const hpaMutation = useMutation( {
        mutationFn: SearchByHPA
    } )


    const inputHandleProfileAlias = watch('handleProfileAlias') ;


    const stateHandleProfileAlias = {
        handleProfileAlias: slugify(inputHandleProfileAlias, {delimiter: '_'})
    }


    const handleSearchUser = () => {

        const slug_HPA = stateHandleProfileAlias.handleProfileAlias ;


        hpaMutation.mutate(slug_HPA) ;

    }
    

    return(
    
        <div>


            <form action="" className="bg-lime-200 px-5 py-2 rounded-lg space-y-3 mt-2 w-full max-w-2xl mx-auto" onSubmit={ handleSubmit( handleSearchUser ) }>


                <div className="flex items-center gap-2">

                    <label className="text-1xl text-slate-500" htmlFor="handleProfileAlias">devTree.com/</label>

                    <input 
                        type="text" 
                        className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400 flex-1" 
                        id="handleProfileAlias" placeholder="elonmusk, mark_zuckerberg, julio Profe " 
                        { ...register("handleProfileAlias", {required: errorsMessageObj.required('handleProfileAlias')})}
                    />
                
                </div>
                

                {errors.handleProfileAlias && <ErrorMessageComponent>{errors.handleProfileAlias.message} </ErrorMessageComponent> }
                

                <div className="mt-10" >

                    { hpaMutation.isPending && <p className="text-center" >...loading</p> }

                    { 
                        hpaMutation.error 
                        && 
                        <p className="text-center text-red-700 font-black" >
                            {hpaMutation.error.message}
                        </p> 
                    }

                    {
                        hpaMutation.data
                        &&
                        <p className="text-center text-green-700 font-semibold" >
                            <Link state={stateHandleProfileAlias} to={thePathsRoutes.register}>
                                <p className="font-semibold text-center" >
                                    
                                    {hpaMutation.data.success } 
                                    
                                    <br/>
                                    
                                    <span className="text-cyan-500 font-semibold text-2xl " >Click to navigate to <span className="font-bold" >Register👆</span></span>
                                
                                </p>                                     
                            
                            </Link> 
                        </p>
                    }

                </div>

                <input type="submit" className="bg-cyan-700 p-1 text-lg w-full text-slate-200 rounded-lg font-bold cursor-pointer" value="Get my DevTree" />


            </form>


        </div>
    
    )
}