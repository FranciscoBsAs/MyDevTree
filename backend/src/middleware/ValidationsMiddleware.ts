import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"


export const HandleInputErrors = ( req : Request , res : Response , nextFunction : NextFunction ) => {


    // Handle router POST request validations errors

    let errorsFromRouter_POST = validationResult( req ) ;   // the validation results from the router

    if( !errorsFromRouter_POST.isEmpty() ) {

        return res.status(400).json(

            {
                errors: errorsFromRouter_POST.array()
            }

        )
    }

    
    nextFunction() ;


}