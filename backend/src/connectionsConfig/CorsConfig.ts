import { CorsOptions } from 'cors'

// white list
const allowedOrigins = [process.env.MEMPHIS_URL1, process.env.MEMPHIS_URL2]; 



export const CORSconfig : CorsOptions = {

    origin: ( origin, callback ) => {

        if( process.argv[2] === '--api' ) allowedOrigins.push(undefined) ;

        if( !origin || allowedOrigins.includes(origin) ) callback(null, true) ;

        else callback( new Error('CORS Error happend, no authorize connecction') ) ;

    }

} 