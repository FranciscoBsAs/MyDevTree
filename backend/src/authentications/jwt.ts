import jwt, {JwtPayload} from "jsonwebtoken" 

export const generateJWT = ( payload : JwtPayload ) => {

    
    const token = jwt.sign( payload, process.env.MAKE_IT_ALL , {
        
        expiresIn: '180d',
        
    }) ;

    return token ;

}