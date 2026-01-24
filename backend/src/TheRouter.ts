import { Router } from 'express'
import { mongooseUser } from './modelsToDB/UserModelCollection';
import { Document } from 'mongoose';
import { CreateAccount, GetUser, LoginUserAccount, UpdateProfile, UploadImage } from './handlers/HandleRequests';

import { body } from 'express-validator';
import { errorsMessagesArray } from './sharedContent/messages/ErorrsMessages';
import { HandleInputErrors } from './middleware/ValidationsMiddleware';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';


const theRouter = Router() ;


theRouter.get( '/', ( req, res ) => {

    res.send('Helo bore da, from the theRouter.get() finally')

} );

theRouter.get( '/clients', ( req, res ) => {

    res.send( 'Hello clients, from clients /url' )

} ) ;


// Authentication and registration

theRouter.get( '/auth/register', ( req, res ) => {

    console.log( 'From /register   URL' )


} ) ;

// Simula formularios fabricados con React
theRouter.post( '/auth/register',

    body('handleProfileAlias').notEmpty().withMessage( errorsMessagesArray.notEmptyFieldFromPOST('handleProfileAlias') )
    ,
    body('name').notEmpty().withMessage(errorsMessagesArray.notEmptyFieldFromPOST('name'))
    ,
    body('email')
                .notEmpty().withMessage( errorsMessagesArray.notEmptyFieldFromPOST('email') )
                .isEmail().withMessage( errorsMessagesArray.invalidField('email') )
    ,
    body('password').isLength({ min: 8, max: 20 }).withMessage( errorsMessagesArray.passwordLength )
    ,

    HandleInputErrors
    ,

    CreateAccount


) ;


theRouter.post( '/auth/login',

    body('email')
                .notEmpty().withMessage( errorsMessagesArray.notEmptyFieldFromPOST('email') )
                .isEmail().withMessage( errorsMessagesArray.invalidField('email') )
    ,
    body('password').notEmpty().withMessage( errorsMessagesArray.fieldRequiredFormat('password'))
    ,

    HandleInputErrors
    ,

    LoginUserAccount

) ;



theRouter.get( '/admin/profile', AuthenticationMiddleware , GetUser ) ;



theRouter.patch('/admin/profile',

    body('handleProfileAlias')
        .notEmpty()
        .withMessage( errorsMessagesArray.notEmptyFieldFromPOST('handleProfileAlias') )

    ,

    body('description')
        .notEmpty()
        .withMessage( errorsMessagesArray.notEmptyFieldFromPOST('description') )
    ,
    
    HandleInputErrors

    ,

    AuthenticationMiddleware,
    UpdateProfile 
) ;



theRouter.post('/admin/profile/image', AuthenticationMiddleware, UploadImage )




export default theRouter