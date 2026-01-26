import { socialNetworksData } from "../assets/SocialNetworksData"
import { useState, type JSX } from "react"
import DevTreeInput from "../components/DevTreeInput";
import type { socialI } from "../interfaces/SocialNetworksInterface";
import { IsValidURL } from "../utils/IsValidURL";
import toastService from "../sharedFrontContent/alertToasts/ToastService";
import { errorsMessageObj } from "../sharedFrontContent/messagesArray/FrontErrorsMessages";


export default function LinkTreeView () {


    const [ devTreeLinks, setDevTreeLinks ] = useState(socialNetworksData) ;




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

    }




    console.log(devTreeLinks);

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
 
            </div>



        </div>
    
    )

}