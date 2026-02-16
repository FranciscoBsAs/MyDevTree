import bcrypt from 'bcrypt' ;


export const HashingThePassword = async ( certainPassword : string ) : Promise<string> => {

    const salt : string = await bcrypt.genSalt( 10 ) ;


    return await bcrypt.hash( certainPassword, salt ) ; 

}

export const CheckTheRespectivePassword = async ( loginInputPassword : string , respectiveRegisteredUserPassword : string ) : Promise<boolean> => {

    return await bcrypt.compare( loginInputPassword, respectiveRegisteredUserPassword ) 

}