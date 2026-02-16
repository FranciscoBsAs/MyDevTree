import { logosPNG } from "../assets/SocialNetworksData";
import type { socialI } from "../interfaces/SocialNetworksInterface";
import type { userByHandleProfileAliasI } from "../interfaces/UserInterfaces"


interface DataByHP_PropI {
    dataProp : userByHandleProfileAliasI
} 


export default function DataByHandleProfileAlias ( {dataProp} : DataByHP_PropI ) {

    const isImageExist = dataProp.imageURL !== '' && !!dataProp.imageURL ;


    const enabledLinks = ( JSON.parse(dataProp.links!) as socialI[] ).filter( link => link.enabled )

    const isEnabledLinksVoid = enabledLinks.length === 0  




    return(
    
        <div className="space-y-6 text-yellow-200 p-4 flex flex-col items-center  " >

            <p className="text-center text-6xl font-semibold mb-8  shadow-lg ">
                {dataProp.handleProfileAlias}
            </p>

            <div className="flex flex-col  w-full max-w-4xl space-y-10  md:space-y-10  md:flex-row md:justify-between md:items-start  " >


                <div className="flex flex-col items-center  space-y-4  md:items-start md:w-1/2 ">

                    {isImageExist && <img src={dataProp.imageURL} className="max-w-[250px] mx-auto rounded-lg" /> }

                    <p className="text-lg text-start font-semibold text-stone-700 bg-stone-300 px-2 max-w-md mx-auto rounded-md " >
                        {dataProp.description}
                    </p>
                
                </div>


                {/*<div className="mt-20 flex flex-col gap-6" >*/}
                <div className="shadow-sm p-2 flex gap-5 rounded-lg flex-col items-center   md:items-center md:w-1/2 "> {/*    w-full max-w-lg mx-auto" > */}

                    { !isEnabledLinksVoid && enabledLinks.map( 
                        
                        (link) => {
                            
                            const iconImageDirections = `/social/icon_${link.name.toLowerCase()}${ logosPNG.includes(`${link.name.toLowerCase()}.png`) ?  '.png'  :  '.svg' }`

                            return(
                                <div className="items-start flex gap-3">
                                <h1 className="font-bold bg-stone-700      rounded-full p-2 flex items-center justify-center" >🔗</h1>
                                <a 
                                    key={link.name}
                                    id={link.name}
                                    className="min-w-[200px] px-2 py-2 flex items-start bg-emerald-600 gap-5 rounded-lg   border-2 border-emerald-700" 
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    
                                    
                                    <img src={iconImageDirections} alt="" className="w-12" />
                                    
                                    <p className="text-slate-900 text-lg " >    
                                        My: <span className="font-bold" >{link.name}</span> 
                                    </p> 
                                
                                </a>
                                </div>
                            )
                        } 

                    ) }


                </div>

            </div>

        </div>
    
    )
}