import type { Request, Response, NextFunction } from "express"
import { errorsMessagesObject } from "../sharedContent/messages/ErorrsMessages";
import { sucessMessagesArray } from "../sharedContent/messages/SucessMessages";
import { generateJWT } from "../authentications/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { mongooseUser, userI } from "../modelsToDB/UserModelCollection";


declare global {

    namespace Express {

        interface Request {

            user?: userI

        }

    }

}



export const AuthenticationMiddleware = async ( req : Request , res : Response , nextFunction : NextFunction ) => {

    const bearer = req.headers.authorization ;

    if( !bearer ) return res.status(401).json( { error: errorsMessagesObject.noAuthorizeUser.message } ) ;


    const [, token] = bearer.split( ' ' ) ;

    if( !token ) return res.status(401).json( { error: errorsMessagesObject.noAuthorizeUser.message } ) ;


    try {
        
        const result = jwt.verify( token , process.env.MAKE_IT_ALL ) as JwtPayload ;



        const userInMemory = await mongooseUser.findById( result?.iD ).select('-password') ;


        if( !userInMemory ) return res.status(401).json( { error: errorsMessagesObject.userNotExist } ) ;


        //res.json( userInMemory ) ;

        req.user = userInMemory ;   // banisters to handle getUser(req, res)

        nextFunction() ;

    } catch (error) {
        
        res.status(500).json(error) ;

    }


}