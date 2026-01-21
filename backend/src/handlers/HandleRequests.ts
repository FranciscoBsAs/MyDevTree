import { mongooseUser, userI } from "../modelsToDB/UserModelCollection" ;
import type { Request, Response } from 'express' ;
import { CheckTheRespectivePassword, HashingThePassword } from "../authentications/AuthPassword";
import slug from "slug";
import { errorsMessagesObject } from "../sharedContent/messages/ErorrsMessages";
import { sucessMessagesArray } from "../sharedContent/messages/SucessMessages";
import { generateJWT } from "../authentications/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";


export const CreateAccount = async ( req : Request , res : Response ) => {


    const email : string = req.body.email ;

    const password : string = req.body.password

    const handleProfileAlias : string =  req.body.handleProfileAlias


    const userExists : userI = await mongooseUser.findOne( { email: email } ) ;

    if( userExists ) return res.status(409).json( { error: errorsMessagesObject.userAlreadyExists().message } ) ;



    const userToAdd = new mongooseUser( req.body ) ;

        
        userToAdd.password = await HashingThePassword( password ) ;


        const cleanHandleProfileAlias : string = slug( handleProfileAlias, '' ) ;

        const cleanHPA_AlreadyExist = await mongooseUser.findOne( { handleProfileAlias: cleanHandleProfileAlias } ) ;
        
        if( cleanHPA_AlreadyExist ) return res.status(409).json( { error: errorsMessagesObject.userAlreadyExists('handleProfileAlias').message } )


        userToAdd.handleProfileAlias = cleanHandleProfileAlias ;


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
                errorFound: errorsMessagesObject.userNotFound.message
            }
        )
    }



    const isPasswordCorrect = await CheckTheRespectivePassword( password, loggedUser.password ) 

    if( !isPasswordCorrect ) {

        return res.status(401).json(
            {
                errorPassword: errorsMessagesObject.unmatchedPassword.message
            }
        )

    }
    
    const token = generateJWT( {

        id: loggedUser._id

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