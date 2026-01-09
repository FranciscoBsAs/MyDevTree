import { CorsOptions } from 'cors'


const allowedOrigins = ['http://localhost:5173', 'http://localhost:5173/'];     // white list



export const CORSconfig : CorsOptions = {

    origin: ( origin, callback ) => {

        if( !origin || allowedOrigins.includes(origin) ) callback(null, true) ;

        else callback( new Error('CORS Error, no authorize connecction') ) ;

    }

} 