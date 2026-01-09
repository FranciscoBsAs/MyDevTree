import { CorsOptions } from 'cors'


const allowedOrigins = [process.env.MEMPHIS_URL1, process.env.MEMPHIS_URL2];     // white list



export const CORSconfig : CorsOptions = {

    origin: ( origin, callback ) => {

        if( !origin || allowedOrigins.includes(origin) ) callback(null, true) ;

        else callback( new Error('CORS Error happend, no authorize connecction') ) ;

    }

} 