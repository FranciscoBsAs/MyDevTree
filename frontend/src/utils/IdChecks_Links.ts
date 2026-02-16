import type { socialI } from "../interfaces/SocialNetworksInterface";


export function CheckId_Links ( link : socialI, socialNetwork : string, indexToUpdate : number ) : socialI {

    const disabledSocialNetObject : socialI = {
        ...link,
        id: 0 ,
        enabled: false,
        //url: ''
    }
    
    const updatedItems_Index : socialI = {
        ...link,
        id: link.id! -1
    }

    if( link.name === socialNetwork ) return disabledSocialNetObject ;

    else if( link.id && link.id > indexToUpdate && ( indexToUpdate !== 0 && link.id === 1 ) ) return updatedItems_Index ;

    else return link;

}


export function OnlyOneIdCheck_Links ( userLinks : socialI[] , socialNetwork : string, continuedId : number  ) {


    return userLinks.map( (link) => {

        const socialNetToPersist : socialI = {
            ...link,
            enabled: true,
            id: continuedId
        }

        return  link.name === socialNetwork  ?  socialNetToPersist  :  link
            
    } )


}