// npm i bcrypt

import bcrypt from 'bcrypt' ;


export const HashingThePassword = async ( certainPassword : string ) : Promise<string> => {

    const salt : string = await bcrypt.genSalt( 10 ) ;


    return await bcrypt.hash( certainPassword, salt ) ; 

}