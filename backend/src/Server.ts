import express from 'express';

import 'dotenv/config' ;    // suficiente esta linea para que dotenv funcione en todo el backend

import theRouter from './TheRouter';

import { ConnectToMyMongoDB } from './connectionsConfig/MyDB';

import cors from 'cors'

const appServer = express() ;


// Start connection to DB

ConnectToMyMongoDB() ;


// Access to process the POST requests with JSON format

appServer.use( express.json() ) ;


// Mount the router to handle the multiple /Root requests

appServer.use( '/root', theRouter ) ;




export default appServer