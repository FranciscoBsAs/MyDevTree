import { mongooseUser, userI } from "../modelsToDB/UserModelCollection" ;
import type { Request, Response } from 'express' ;
import { CheckTheRespectivePassword, HashingThePassword } from "../authentications/AuthPassword";
import slug, { reset } from "slug";
import { errorsMessagesObject } from "../sharedContent/messages/ErorrsMessages";
import { successMessagesArray } from "../sharedContent/messages/SuccessMessages";
import { generateJWT } from "../authentications/jwt";
import formidable from "formidable";
import cloudinary from "../connectionsConfig/Cloudinary";
import {UploadApiOptions} from 'cloudinary'


export const CreateAccount = async ( req : Request , res : Response ) => {


    const email : string = req.body.email ;

    const password : string = req.body.password

    const handleProfileAlias : string =  req.body.handleProfileAlias


    const userExists : userI = await mongooseUser.findOne( { email: email } ) ;

    if( userExists ) return res.status(409).json( { error: errorsMessagesObject.userAlreadyExists().message } ) ;



    const userToAdd = new mongooseUser( req.body ) ;

        
        userToAdd.password = await HashingThePassword( password ) ;


        const cleanHandleProfileAlias : string = slug( handleProfileAlias, '_' ) ;

        const cleanHPA_AlreadyExist = await mongooseUser.findOne( { handleProfileAlias: cleanHandleProfileAlias } ) ;
        
        if( cleanHPA_AlreadyExist ) return res.status(409).json( { error: errorsMessagesObject.userAlreadyExists('handleProfileAlias').message } )


        userToAdd.handleProfileAlias = cleanHandleProfileAlias ;


    await userToAdd.save() ;

    
    res.status(201).json( { messageSuccess: successMessagesArray.registerCorrect } ) ;

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
        successLogin: successMessagesArray.loginCorrect ,
        token: token
    })

}



export const GetUser = async ( req : Request, res : Response ) => {

    res.status(200).json( req.user ) ;

}



export const UpdateProfile = async ( req : Request , res : Response ) => {

    try {

        const { description , links } = req.body ;


        const cleanHandleProfileAlias : string = slug( req.body.handleProfileAlias ) ;

        const userWithCleanHP = await mongooseUser.findOne({handleProfileAlias: cleanHandleProfileAlias }) ;

        if( userWithCleanHP  &&  userWithCleanHP?.email !== req.user.email ) return res.status(409).json( { error:errorsMessagesObject.userAlreadyExists('Handle Profile Alias').message } ) ;



        req.user.description = description ;

        req.user.handleProfileAlias = cleanHandleProfileAlias //|| userWithCleanHP.handleProfileAlias ;

        req.user.links = links //|| userWithCleanHP.links ;


        await req.user.save() ;


        res.status(201).json( { messageSuccess: successMessagesArray.registerCorrect } ) ;
        

    } catch (e) {

        console.error(e)

        return res.status(500).json( { error: errorsMessagesObject.updateError.message + '\n' + e } )
        
    }

}



export const UploadImage = async ( req : Request, res : Response ) => {
    
    try {
        
        formidable( {multiples: false} )?.parse( req , ( error, fields, files ) => {
                
            // Validate if the certain file exist
            if (!files.file || !files.file[0]) return res.status(400).json({ error: errorsMessagesObject.notImageUploadAlready + "\n&\n" + error }) ;
            


            const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

            if(  !validMimeTypes.includes( files.file[0].mimetype || '' )  ) return res.status(400).json( {error: errorsMessagesObject.invalidImageFormat.message } ) ;


            const uploaderImageFormat_Config : UploadApiOptions = { 
                allowed_formats: ['jpg', 'png'] ,
                resource_type: 'image',
                public_id: `${req.user.handleProfileAlias}-image-${req.user.handleProfileAlias.length}`
            };

            cloudinary.uploader.upload( files.file[0].filepath, uploaderImageFormat_Config, async ( error, callResult ) => {

                if( error ) return res.status(500).json({error}) ;

                
                req.user.imageURL = callResult.secure_url ;

                await req.user.save() ;
                
                return res.status(200).json( 
                    { 
                        message: `Image ${callResult?.original_filename}.${callResult?.format} uploaded successfully`,
                        imageURL: callResult?.secure_url 
                    }
                ) ;
                

            } )
    
        } )
        
    } catch (e) {
        
        return res.status(500).json( { error: errorsMessagesObject.updateError } )

    }

}



export const GetUserByHandleProfileAlias = async ( req : Request, res : Response ) => {

    try {

        const { handleProfileAlias } = req.params ;


        const loggedUser = await mongooseUser.findOne( {handleProfileAlias} ).select('-_id -__v -email -password')


        if (!loggedUser) {
            return res.status(404).json({ 
                error: errorsMessagesObject.userNotFoundByHP.message 
            });
        }

        return res.status(200).json(loggedUser);


    } catch (e) {

        const detail = e instanceof Error ? e.message : String(e);

        return res.status(500).json({
            error: errorsMessagesObject.updateError.message, // <-- string
            detail
        });

    }

} 



export const SearchUserByHandleProfileAlias = async ( req : Request, res : Response ) => {

    try {

        const {handleProfileAlias} = req.body ;


        const isUserExist = await mongooseUser.findOne( {handleProfileAlias} )


        if( isUserExist ) return res.status(409).json( { error: errorsMessagesObject.userAlreadyExists('Handle Profile Alias').message } ) ;


        res.status(200).json( { success: successMessagesArray.availableField(handleProfileAlias) } ) ;

    } catch (er) {

        return res.status(500).json({error: errorsMessagesObject.updateError.message})

    }

}