import express from 'express';
import 'dotenv/config' ;
import theRouter from './TheRouter';
import { ConnectToMyMongoDB } from './connectionsConfig/MyDB';
import cors from 'cors'
import { CORSconfig } from './connectionsConfig/CorsConfig';


const appServer = express() ;


ConnectToMyMongoDB() ;


//CORS

appServer.use(cors(CORSconfig))


// Access to process the POST requests with JSON format

appServer.use( express.json() ) ;



// Mount the router to handle the multiple /Root requests

appServer.use( '/root', theRouter ) ;



export default appServer