import { Router } from 'express'
import { mongooseUser } from './modelsToDB/UserModelCollection';
import { Document } from 'mongoose';
import { CreateAccount, GetUser, GetUserByHandleProfileAlias, LoginUserAccount, SearchUserByHandleProfileAlias, UpdateProfile, UploadImage } from './handlers/HandleRequests';

import { body } from 'express-validator';
import { errorsMessagesObject } from './sharedContent/messages/ErorrsMessages';
import { HandleInputErrors } from './middleware/ValidationsMiddleware';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';


const theRouter = Router() ;


theRouter.post( '/auth/register',

    body('handleProfileAlias').notEmpty().withMessage( errorsMessagesObject.notEmptyFieldFromPOST('handleProfileAlias') )
    ,
    body('name').notEmpty().withMessage(errorsMessagesObject.notEmptyFieldFromPOST('name'))
    ,
    body('email')
                .notEmpty().withMessage( errorsMessagesObject.notEmptyFieldFromPOST('email') )
                .isEmail().withMessage( errorsMessagesObject.invalidField('email') )
    ,
    body('password').isLength({ min: 8, max: 20 }).withMessage( errorsMessagesObject.passwordLength )
    ,

    HandleInputErrors
    ,

    CreateAccount

) ;


theRouter.post( '/auth/login',

    body('email')
                .notEmpty().withMessage( errorsMessagesObject.notEmptyFieldFromPOST('email') )
                .isEmail().withMessage( errorsMessagesObject.invalidField('email') )
    ,
    body('password').notEmpty().withMessage( errorsMessagesObject.fieldRequiredFormat('password'))
    ,

    HandleInputErrors
    ,

    LoginUserAccount

) ;



theRouter.get( '/admin/profile', AuthenticationMiddleware , GetUser ) ;



theRouter.patch('/admin/profile',

    body('handleProfileAlias')
        .notEmpty()
        .withMessage( errorsMessagesObject.notEmptyFieldFromPOST('handleProfileAlias') )

    ,

    body('description')

    ,
    
    HandleInputErrors

    ,

    AuthenticationMiddleware,
    UpdateProfile 
) ;



theRouter.post('/admin/profile/image', AuthenticationMiddleware, UploadImage )



theRouter.get('/:handleProfileAlias', GetUserByHandleProfileAlias ) ;



theRouter.post('/search',

    body('handleProfileAlias').notEmpty().withMessage(errorsMessagesObject.notEmptyFieldFromPOST('handleProfileAlias'))
    
    ,

    HandleInputErrors
    
    ,

    SearchUserByHandleProfileAlias
 )


export default theRouter