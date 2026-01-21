import { mongooseUser, userI } from "../modelsToDB/UserModelCollection" ;

import type { Request, Response } from 'express' ;

import { CheckTheRespectivePassword, HashingThePassword } from "../authentications/AuthPassword";

import slug from "slug";
import { errorsMessagesArray } from "../sharedContent/messages/ErorrsMessages";
import { sucessMessagesArray } from "../sharedContent/messages/SucessMessages";
import { generateJWT } from "../authentications/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";


export const CreateAccount = async ( req : Request , res : Response ) => {


    // Destructuring and extraction of the data sent by the client

    const email : string = req.body.email ;

    const password : string = req.body.password

    const handleProfileAlias : string =  req.body.handleProfileAlias


    const userExists : userI = await mongooseUser.findOne( { email: email } ) ;

    if( userExists ) return res.status(409).json( { error: errorsMessagesArray.userAlreadyExists().message } ) ;



    // await mongooseUser.create( req.body )    Manera antigua de postear el req.body en la DB ;

    const userToAdd = new mongooseUser( req.body ) ;


        //Hashing the password
        
        userToAdd.password = await HashingThePassword( password ) ;


        // Clean the handleProfileAlias into a friendly URL

        const cleanHandleProfileAlias : string = slug( handleProfileAlias, '' ) ;

        const cleanHPA_AlreadyExist = await mongooseUser.findOne( { handleProfileAlias: cleanHandleProfileAlias } ) ;
        
        if( cleanHPA_AlreadyExist ) return res.status(409).json( { error: errorsMessagesArray.userAlreadyExists('Handle Profile Alias').message} )


        userToAdd.handleProfileAlias = cleanHandleProfileAlias ;

        //console.log( cleanHandleProfileAlias) );


    await userToAdd.save() ;

    console.log("LOGIN MESSAGE USED:", sucessMessagesArray.loginCorrect);

    
    res.status(201).json( { messageSucess: sucessMessagesArray.registerCorrect } ) ;


}



export const LoginUserAccount = async ( req : Request , res : Response  ) => {


    const email : string = req.body.email ;

    const password : string = req.body.password ;


    const loggedUser : userI = await mongooseUser.findOne({ email }) ;

    if( !loggedUser ) {

        return res.status(404).json(
            {
                errorFound: errorsMessagesArray.userNotFound.message
            }
        )
    }


    // Check the respective password


    const isPasswordCorrect = await CheckTheRespectivePassword( password, loggedUser.password ) // Escribir en tapa de cuaderno que se no pusiera el = await... 
    //  la const isPasswordCorrect seria del mismo tipo Promise<boolean> que la function, en vez de boolean (optimo para el if)

    if( !isPasswordCorrect ) {

        return res.status(401).json(
            {
                errorPassword: errorsMessagesArray.unmatchedPassword.message
            }
        )

    }
    
    const token = generateJWT( {

        iD: loggedUser._id  // ojo que en production va id: loggedUser._id

    } ) ;

    
    
    res.status( 200 ).json({
        sucessLogin: sucessMessagesArray.loginCorrect ,
        token: token
    })
    

    //res.status(200).send( token )
    


}



export const getUser = async ( req : Request, res : Response ) => {

    //console.log("Testing from getUser handle function");

    res.status(200).json( req.user ) ;

}