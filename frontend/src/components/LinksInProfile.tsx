import { useEffect, useState } from "react"
import type { userFrontI } from "../interfaces/UserInterfaces"
import type { socialI } from "../interfaces/SocialNetworksInterface"
import EnabledLinksRender from "./EnabledLinksRender";
import { type DragEndEvent, DndContext, closestCenter } from '@dnd-kit/core' ;
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable' ;
import { useQueryClient } from "@tanstack/react-query";



export interface linksInProfilePropsI {
    data : userFrontI
}

export default function LinksInProfile ( {data} : linksInProfilePropsI ) {

    const dataParsed = (JSON.parse(data.links!)) as socialI[] ;

    const [ enabledLinks , setEnabledLinks ] = useState<socialI[]>( dataParsed.filter( (item) => item.enabled ) ) ;


    useEffect( () => {

        setEnabledLinks(dataParsed.filter( (item) => item.enabled ))
        
    } , [data] )


    const queryClient = useQueryClient() ;


    const handleRenderLinks = enabledLinks.map( (link) => {

        return <EnabledLinksRender key={link.name} link={link} /> 

    } )

    const handleDragEnd = ( e : DragEndEvent ) => {

        const { active, over } = e


        if( over && over.id ) {

            const prevIndex = enabledLinks.findIndex( (link) => link.id === active.id ) ;

            const newIndex = enabledLinks.findIndex( (link) => link.id === over.id ) ;


            const order = arrayMove( enabledLinks, prevIndex, newIndex )

            setEnabledLinks(order) ;


            const disabledLinks = dataParsed.filter( (item) => !item.enabled ) ; // CONSIDERAR O RECUPERAR LAS REDES SOCIALES NO HABILITADAS POR EL USUARIO, QUE NO SE PIERDAN TRAS REORDENAR LAS TARJETAS

            
            const updatedAllLinks = [ ...order, ...disabledLinks ] ;
            
            
            queryClient.setQueryData( ['user'], (prevData : userFrontI) => {

                return {
                    ...prevData,
                    links: JSON.stringify( updatedAllLinks )
                }

            } )
            


        }

    }


    const handleItemsSortableContext = () => enabledLinks.map( (link) => link.id! ) ;
    
 

    return(
    
        <div>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >

            <div className='mt-10 flex flex-col gap-5' >

                <SortableContext
                    items={handleItemsSortableContext()}
                    strategy={verticalListSortingStrategy}
                >
                    
                    {handleRenderLinks}
                
                </SortableContext>
                
            </div>
            
            </DndContext>

        </div>
    
    )
}