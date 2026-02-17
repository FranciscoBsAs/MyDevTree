import type { socialI } from "../interfaces/SocialNetworksInterface"
import { Switch } from "@headlessui/react"
import { ClassNames } from "../utils/ClassNames"
import { logosPNG } from "../assets/SocialNetworksData"


export interface DevTreeInputPropsI {

    item : socialI

    handleUrlChangeProp : ( e : React.ChangeEvent<HTMLInputElement> ) => any ,

    handleEnableLinkProp : ( socialNetwork : string ) => void

}


export default function DevTreeInput ( { item , handleUrlChangeProp , handleEnableLinkProp } : DevTreeInputPropsI ) {

    const iconImageDirections = `url('/social/icon_${item.name.toLocaleLowerCase()}${logosPNG.includes(`${item.name.toLowerCase()}.png`)  ?  '.png'  :  '.svg' }')`


    const handleChangeEnable = () => handleEnableLinkProp(item.name) ;


    return(
    
        <div className="bg-slate-400 shadow-lg p-3 flex items-center gap-3  rounded-lg " >

            <div 
                className="w-12 h-12 bg-cover rounded-full"
                style={{ backgroundImage: iconImageDirections }}
                
            >

            </div>

            <input 

                type="text" 
                className="flex-1 border bg-slate-300 border-gray-200 rounded-lg"
                value={item.url}
                onChange={handleUrlChangeProp}
                id={item.name}


            />


            <Switch
                checked={ item.enabled }
                //onChange={ () => {} }
                onChange={handleChangeEnable}
                className={ ClassNames( item.enabled  ?  'bg-green-700'  :  'bg-stone-500'  , 
                    'relative inline-flex h-6 w-11 flex-shirk-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 '
                    )
                }
            >
                <span
                    aria-hidden="true"
                    className={ ClassNames(
                        item.enabled  ?  'translate-x-5'  :  'translate-x-0' ,
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-stone-200 shadow ring-0 transition duration-200 ease-in-out'
                    ) }
                ></span>


            </Switch>


        </div>
    
    )
}