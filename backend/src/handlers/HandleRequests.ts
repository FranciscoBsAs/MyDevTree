import { Document } from "mongoose"

import { mongooseUser, userI } from "../modelsToDB/UserModelCollection" ;

import type { Request, Response } from 'express' ;




export const CreateAccount = async ( req : Request , res : Response ) => {

    console.log( '\nPOST Method => From /register via THUNDER CLIENT in VSC \n' )
    
    // Destructuring and extraction of the data sent by the client

    const email : string = req.body.email ;

    console.log( email ) ;

    const userExists : userI = await mongooseUser.findOne( { email: email } ) ;

    console.log("User already exist\n" + userExists ) ;

    //if( userExists ) console.log( `Este usario con email ${userExists.email} ya existe en la BD` ) ;

    if( userExists ) {

        const errorAlreadyExists = new Error('This user is already registred') ;

        return res.json( { error: errorAlreadyExists.message } ) ;

    }

    else console.log("Este usuario no existe")

    


    // await mongooseUser.create( req.body )    Manera antigua de postear el req.body en la DB ;

    const userToAdd : Document = new mongooseUser( req.body ) ;

    await userToAdd.save() ;

    
    res.json( { messageSucess: "Register has been created correctly" } ) ;


}