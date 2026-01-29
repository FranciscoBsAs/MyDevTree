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

    const data = queryClient_Links.getQueryData< userFrontI | undefined >(['user'])! ;

    const updateProfileMutation = useMutation( useMutation_ConfigQuery( queryClient_Links ) )


    const userLinksFromDB =  ( JSON.parse(data.links!) ) as socialI[]


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

        //console.table(devTreeLinks)
        //console.table( JSON.parse(data.links!) )

    }, [] )


    const handleUrlChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {

        const updatedLinks = devTreeLinks.map( (link) : socialI => {

            const linkUpdated : socialI = {
                ...link,
                url: e.target.value
            }

            if( link.name === e.target.id ) return linkUpdated ;

            else return link ;

        } )
        //console.log(updatedLinks) ;


        setDevTreeLinks( updatedLinks ) ;

    }


    const handleEnableLink = ( socialNetwork : string ) => {

        //console.log(socialNetwork) ;


        const targetLink = devTreeLinks.find( ( link ) => link.name === socialNetwork )

        if( targetLink && !IsValidURL( targetLink.url ) ) toastService.error( errorsMessageObj.invalidadFormatURL ) ;



        const updatedLinks = devTreeLinks.map( (link) : socialI => {


            const linkUpdated : socialI = {
            ...link ,

            enabled: !link.enabled
            }


            if( link.name === socialNetwork && IsValidURL( link.url ) ) return linkUpdated ;

            else return link

        } )


        setDevTreeLinks(updatedLinks)


        const selectedSocialNetwork = updatedLinks.find( (link) => link.name === socialNetwork)

        //console.log('\n',selectedSocialNetwork)


        let updatedSocialItems : socialI[] = [] 


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


                                console.table(updatedSocialItems)


        //This go to the DB
        queryClient_Links.setQueryData( ['user'], ( prevData : userFrontI ) : userFrontI => ({
                ...prevData ,
                //links: JSON.stringify( updatedLinks )
                links: JSON.stringify( updatedSocialItems )
            })

        )

    }


    const handleSaveChanges = () => updateProfileMutation.mutate( data! ) ;

    

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
                    className="bg-cyan-200 p-2 text-center text-lg w-full text-slate-700 rounded-lg font-bold "
                    onClick={handleSaveChanges}
                >
                    Save changes
                </button>

 
            </div>


            <br/>

        </div>
    
    )

}