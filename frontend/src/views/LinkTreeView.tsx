import { socialNetworksData } from "../assets/SocialNetworksData"
import { useEffect, useState, type JSX } from "react"
import DevTreeInput from "../components/DevTreeInput";
import type { socialI } from "../interfaces/SocialNetworksInterface";
import { IsValidURL } from "../utils/IsValidURL";
import toastService from "../sharedFrontContent/alertToasts/ToastService";
import { errorsMessageObj } from "../sharedFrontContent/messagesArray/FrontErrorsMessages";
import { useMutation , useQueryClient } from "@tanstack/react-query";
import { useMutation_ConfigQuery } from "../assets/UserQueryConfig";
import type { userFrontI } from "../interfaces/UserInterfaces";
import { CheckId_Links, OnlyOneIdCheck_Links } from "../utils/IdChecks_Links";


export default function LinkTreeView () {


    const [ devTreeLinks, setDevTreeLinks ] = useState(socialNetworksData) ;


    const queryClient_Links = useQueryClient()

    const data = queryClient_Links.getQueryData< userFrontI | undefined >(['user']) ;

    const updateProfileMutation = useMutation( useMutation_ConfigQuery( queryClient_Links ) )


    //const userLinksFromDB = ( JSON.parse(data?.links!) ) as socialI[]  

    const userLinksFromDB = data?.links  ?  ( JSON.parse(data?.links) as socialI[] )  :  [] ;

    /*let userLinksFromDB : socialI[] ;

    if( data?.links ) userLinksFromDB = ( JSON.parse(data?.links!) ) as socialI[] ;*/


    useEffect( () => {

        const updatedData = devTreeLinks.map( (item) => {

            const userLink = userLinksFromDB.find( ( link ) => link.name === item.name  )


            if( userLink ){

                const linkWithUserData = {
                    ...item ,
                    url: userLink.url ,
                    enabled: userLink.enabled
                }

                return linkWithUserData ;

            } 

            else return item ;

        } )

        setDevTreeLinks( updatedData ) ;


    }, [] )


    const handleUrlChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {

        const updatedLinks = devTreeLinks.map( (link) : socialI => {


            if( link.name === e.target.id ) return {
                ...link,
                url: e.target.value
            };

            else return link ;

        } )

        setDevTreeLinks( updatedLinks ) ;

        
        queryClient_Links.setQueryData(['user'], ( prevData : userFrontI ) =>{

            //if(!prevData) return prevData ;   OJO con está linea para el drage n drop

            
            const prevArr = JSON.parse( prevData.links ?? '[]') as socialI[]  ;

            const updatedArr = prevArr.map( (link) => {


                if( link.name !== e.target.id ) return link ;

                if( e.target.value.trim() === '' ) {

                    return {
                        ...link,
                        url: '' //OJO
                    }

                }

                return { ...link, url: e.target.value }

            } )


            return { ...prevData, links: JSON.stringify(updatedArr) }

        } )

        //

    }


    const handleEnableLink = ( socialNetwork : string ) => {


        const targetLink = devTreeLinks.find( ( link ) => link.name === socialNetwork )

        if( targetLink && !IsValidURL( targetLink.url ) ) toastService.error( errorsMessageObj.invalidedFormatURL ) ;



        const updatedLinks = devTreeLinks.map( (link) : socialI => {


            const linkUpdated : socialI = {
            ...link ,

            enabled: !link.enabled
            }


            if( link.name === socialNetwork && IsValidURL( link.url ) ) return linkUpdated ;

            else return link

        } )


        setDevTreeLinks(updatedLinks) ;


        const selectedSocialNetwork = updatedLinks.find( (link) => link.name === socialNetwork) ;


        let updatedSocialItems : socialI[] = []  ;
        

        if( selectedSocialNetwork?.enabled ) {


            const isSelectedSocialNetworkInDB = userLinksFromDB.some( link => link.name === socialNetwork ) ; 

            const continuedId = userLinksFromDB.filter( link => link.id!).length + 1 ;


            if( isSelectedSocialNetworkInDB ) updatedSocialItems = OnlyOneIdCheck_Links( userLinksFromDB, socialNetwork, continuedId ) ;
            
            else{

                let newItem = {
                    ...selectedSocialNetwork,
                    id: continuedId
                }   
                updatedSocialItems = [ ... userLinksFromDB, newItem ]

            }

        }
        else{
            
            const indexToUpdate = userLinksFromDB.findIndex( (link) => link.name === socialNetwork ) ;


            updatedSocialItems = userLinksFromDB.map( (link) => CheckId_Links(link, socialNetwork, indexToUpdate) ) ;

        }


        //This go to the DB
        queryClient_Links.setQueryData( ['user'], ( prevData : userFrontI ) : userFrontI => ({
                ...prevData ,
                links: JSON.stringify( updatedSocialItems )
            })

        )

    }

    
    const handleSaveChanges = () => {

        const reCachedDataAfterRefresh = queryClient_Links.getQueryData<userFrontI>(['user']) ;

        if( !reCachedDataAfterRefresh ) return  ;

        updateProfileMutation.mutate( reCachedDataAfterRefresh )

    } ;
    
    

    return(
    
        <div>



            <div className="space-y-5">

                { devTreeLinks.map( ( item ) : JSX.Element => (

                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handleUrlChangeProp={handleUrlChange}
                        handleEnableLinkProp= {handleEnableLink}
                    />

                ) )}


                <button
                    className="bg-cyan-600 p-2 text-center text-lg w-full text-slate-200 rounded-lg font-bold "
                    onClick={handleSaveChanges}
                >
                    Save changes
                </button>

 
            </div>


            <br/>

        </div>
    
    )

}