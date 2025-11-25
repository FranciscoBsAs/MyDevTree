import { Router } from 'express'
import { mongooseUser } from './modelsToDB/UserModelCollection';
import { Document } from 'mongoose';
import { CreateAccount } from './handlers/HandleRequests';

const theRouter = Router() ;


theRouter.get( '/', ( req, res ) => {

    res.send('Helo bore da, from the theRouter.get() finally')

} );

theRouter.get( '/clients', ( req, res ) => {

    res.send( 'Hello clients, from clients /url' )

} ) ;


// Authentication and registration

theRouter.get( '/auth/register', ( req, res ) => {

    console.log( 'From /register   URL' )


} ) ;


theRouter.post( '/auth/register', CreateAccount   // Simula formularios fabricados con React


 ) ;



export default theRouter