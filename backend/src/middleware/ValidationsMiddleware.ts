import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"


export const HandleInputErrors = ( req : Request , res : Response , nextFunction : NextFunction ) => {


    let errorsFromRouter_POST = validationResult( req ) ;

    if( !errorsFromRouter_POST.isEmpty() ) {

        return res.status(400).json(

            {
                errorsDescription: errorsFromRouter_POST.array()
            }

        )
    }

    
    nextFunction() ;


}