import { Document } from "mongoose"

import { mongooseUser } from "../modelsToDB/UserModelCollection" ;

import type { Request, Response } from 'express' ;




export const CreateAccount = async ( req : Request , res : Response ) => {

    console.log( '\nPOST Method => From /register via THUNDER CLIENT in VSC \n' )


    // await mongooseUser.create( req.body )    Manera antigua de postear el req.body en la DB ;

    const userPosted : Document = new mongooseUser( req.body ) ;

    await userPosted.save() ;

    
    res.json( { messageSucess: "Registro creado correctamente" } ) ;


}