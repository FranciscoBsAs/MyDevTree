import { useSortable } from "@dnd-kit/sortable"
import type { socialI } from "../interfaces/SocialNetworksInterface"
import { CSS } from "@dnd-kit/utilities"
import { logosPNG } from "../assets/SocialNetworksData"


interface enabledLinksRenderPropsI {
    link : socialI
}


export default function EnabledLinksRender ( {link} : enabledLinksRenderPropsI ) {


    const { attributes, listeners, setNodeRef, transform, transition } = useSortable( {
        id: link.id!
    })

    const styleDnd = {
        transform: CSS.Transform.toString( transform ) ,
        transition
    }

    const iconImageDirections = `url('/social/icon_${link.name.toLowerCase()}${logosPNG.includes(`${link.name.toLowerCase}.png`)  ?  '.png'  :  '.svg' }')`


    return(
    
        <li 
            ref={setNodeRef}
            style={styleDnd} 
            className="bg-stone-200 px-2 py-1 flex items-center gap-1 rounded-lg" 
            {...attributes}
            {...listeners}
        >
            
            {
                logosPNG.includes(`${link.name.toLowerCase()}.png`) ? (

                    <img src={`/social/icon_${link.name.toLowerCase()}.png`} alt={link.name} className="w-9 h-9 bg-cover" />

                    
                ) : (
                    <div
                        className="w-9 h-9 bg-cover"
                        style={{ backgroundImage: iconImageDirections }}
                        
                    ></div>
                    
                )

            }

            <p>My <span className="font-bold" >{link.name}</span> </p>

        </li>
    
    )
}