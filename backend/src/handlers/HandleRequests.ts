import { Document } from "mongoose"

import { mongooseUser, userI } from "../modelsToDB/UserModelCollection" ;

import type { Request, Response } from 'express' ;

import { HashingThePassword } from "../authentications/AuthPassword";




export const CreateAccount = async ( req : Request , res : Response ) => {

    console.log( '\nPOST Method => From /register via THUNDER CLIENT in VSC \n' )
    
    // Destructuring and extraction of the data sent by the client

    const email : string = req.body.email ;

    const password : string = req.body.password

    console.log( email ) ;

    const userExists : userI = await mongooseUser.findOne( { email: email } ) ;

    //console.log("User already exist\n" + userExists ) ;

    //if( userExists ) console.log( `Este usario con email ${userExists.email} ya existe en la BD` ) ;

    if( userExists ) {

        const errorAlreadyExists = new Error('This user is already registred') ;

        return res.status(409).json( { error: errorAlreadyExists.message } ) ;

    }

    else console.log("This user doesn't exist until now")

    


    // await mongooseUser.create( req.body )    Manera antigua de postear el req.body en la DB ;

    const userToAdd = new mongooseUser( req.body ) ;


        //Hashing the password
        
        const theHash = await HashingThePassword( password ) ;

        console.log( 'the password hashed is: ', theHash ) ;

        userToAdd.password = theHash ;

        // Optimizado:  userToAdd.password = await HashingThePassword( password ) ;


    await userToAdd.save() ;

    
    res.status(201).json( { messageSucess: "Register has been created correctly" } ) ;


}