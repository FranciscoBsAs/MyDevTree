import { mongooseUser, userI } from "../modelsToDB/UserModelCollection" ;

import type { Request, Response } from 'express' ;

import { HashingThePassword } from "../authentications/AuthPassword";

import slug from "slug";
import { errorsMessagesArray } from "../sharedContent/messages/ErorrsMessages";
import { sucessMessagesArray } from "../sharedContent/messages/SucessMessages";

import { validationResult } from 'express-validator'


export const CreateAccount = async ( req : Request , res : Response ) => {

    console.log( '\nPOST Method => From /register via THUNDER CLIENT in VSC \n' )


    // Handle router POST request validations errors

    let errorsFromRouter_POST = validationResult( req ) ;   // the validation results from the router

    console.log( errorsFromRouter_POST ) ;

    if( !errorsFromRouter_POST.isEmpty() ) {

        return res.status(400).json( 
            { 
                errorsDescription: errorsFromRouter_POST.array()
            }
        );

    } 


    // Destructuring and extraction of the data sent by the client

    const email : string = req.body.email ;

    const password : string = req.body.password

    const handleProfileAlias : string =  req.body.handleProfileAlias

    console.log( email ) ;

    const userExists : userI = await mongooseUser.findOne( { email: email } ) ;

    if( userExists ) {

        // console.log( `Este usario con email ${userExists.email} ya existe en la BD` ) ;

        return res.status(409).json( { error: errorsMessagesArray.userAlreadyExists().message } ) ;

    }

    else console.log("This user doesn't exist until now")

    


    // await mongooseUser.create( req.body )    Manera antigua de postear el req.body en la DB ;

    const userToAdd = new mongooseUser( req.body ) ;


        //Hashing the password
        
        const theHash = await HashingThePassword( password ) ;

        console.log( `the ${req.body.name} password hashed is ${theHash}`) ;

        userToAdd.password = theHash ;

        // Optimizado:  userToAdd.password = await HashingThePassword( password ) ;

        // Clean the handleProfileAlias into a friendly URL

        const cleanHandleProfileAlias : string = slug( handleProfileAlias, '' ) ;

        if( cleanHandleProfileAlias ){

            const cleanHP_AlreadyExist = await mongooseUser.findOne( { handleProfileAlias: cleanHandleProfileAlias } ) ;


            return res.status(409).json( { error: errorsMessagesArray.userAlreadyExists('handleProfileAlias').message} )

        }

        userToAdd.handleProfileAlias = cleanHandleProfileAlias

        console.log( slug(handleProfileAlias, '') );

        //userToAdd.handleProfileAlias = slug( handleProfileAlias, '' )

    await userToAdd.save() ;

    
    res.status(201).json( { messageSucess: sucessMessagesArray.registerCorrect } ) ;


}



export const LoginUserAccount = async ( req : Request , res : Response  ) => {

    console.log( 'Desde login...' )

    // Handle router POST request validations errors, for login

    let errorsFromRouter_POST = validationResult( req ) ;

    if( !errorsFromRouter_POST.isEmpty() ) {

        return res.status(400).json(
            {
                errorsDescription: errorsFromRouter_POST.array()
            }
        )

    }


    const email : string = req.body.email ;

    const password : string = req.body.password ;


    const userIsLogged : userI = await mongooseUser.findOne({ email }) ;

    if( !userIsLogged ) {

        return res.status(404).json(
            {
                errorFound: errorsMessagesArray.userNotFound.message
            }
        )
    }


}