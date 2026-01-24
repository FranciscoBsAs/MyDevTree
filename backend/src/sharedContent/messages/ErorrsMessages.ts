import { ErrorMessage } from "express-validator/lib/base"
import { Error } from "mongoose"


export const errorsMessagesObject = {

    userAlreadyExists( word : string | void ) : Error {
        
        return new Error( `This ${ word  ?  word  :  'user' } is already registered` )

    }
    
    ,

    notEmptyFieldFromPOST( userField : string ) : ErrorMessage  {
        
        
        const error_EmptyField = new Error( `The ${ userField } cannot be empty` )
        
        return error_EmptyField.message

    }
    
    ,
    
    invalidField( userField : string ) : ErrorMessage {

        const error_InvalidField = new Error( `The ${ userField } is invalid` )

        return error_InvalidField.message

    }

    ,

    passwordLength: 'The password length has to be between 8 and 20 characters'

    ,

    fieldRequiredFormat( userField : string ) : ErrorMessage {

        const error_FieldRequiredFormat = new Error( `The ${userField} has a required format` )

        return error_FieldRequiredFormat.message

    }

    ,

    userNotFound: new Error('The email is not registered to any user')

    ,

    unmatchedPassword: new Error('The password does not match the provided email') 

    ,

    noAuthorizeUser: new Error('User session is not authorized')

    ,

    userNotExist: new Error("The user doesn't exist ")

    ,

    updateError: new Error("A error happend update the profile")
    
    ,

    invalidImageFormat: new Error( "Invalid image format. Only JPG and PNG are allowed" )

    ,

    notImageUploadAlready: new Error("No image was provided")

}
