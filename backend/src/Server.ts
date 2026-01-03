import express from 'express';
import 'dotenv/config' ;
import theRouter from './TheRouter';
import { ConnectToMyMongoDB } from './connectionsConfig/MyDB';


const appServer = express() ;


ConnectToMyMongoDB() ;


appServer.use( express.json() ) ;

appServer.use( '/root', theRouter ) ;



export default appServer