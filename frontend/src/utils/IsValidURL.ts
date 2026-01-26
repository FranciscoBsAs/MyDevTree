import type { socialI } from "../interfaces/SocialNetworksInterface"

export function IsValidURL ( url : string ) {

    try {
        new URL( url )
        return true
    } 
    catch (error) {
        return false
    }

}