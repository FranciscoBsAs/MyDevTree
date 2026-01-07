interface errorMessageComponentPropI {

    children: React.ReactNode

}

export function ErrorMessageComponent ( {children} : errorMessageComponentPropI ) {

    return(
        <div>
            <p className="bg-red-50 text-red-900 p-3 text-sm font-bold uppercase">{children}</p>
        </div>
    )

}