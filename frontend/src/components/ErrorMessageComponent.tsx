import type { ReactNode } from "react"

interface ErrorMessagePropI {

    children: ReactNode 

}


export function ErrorMessageComponent ( { children } : ErrorMessagePropI ) {

    return(

        <div>
            
            {/* p.bg-red-50.text-red-900.p-3.text-sm.font-bold.uppercase */}

            <p className="bg-red-50 text-red-900 p-3 text-sm font-bold uppercase">

                {children}

            </p>

        </div>

    )

}