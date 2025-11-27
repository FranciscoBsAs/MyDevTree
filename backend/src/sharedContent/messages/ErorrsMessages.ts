export const errorsMessagesArray = {

    userAlreadyExists( word : string | void ) : Error {
        
        return new Error( `This ${ word  ?  word  :  'user' } is already registred` )

    }
    
    ,





}