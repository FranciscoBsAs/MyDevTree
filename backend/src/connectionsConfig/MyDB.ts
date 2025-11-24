import mongoose from "mongoose";


export async function ConnectToMyMongoDB () : Promise<void> {

    try {
        
        const URI_MongoDB = process.env.URI_MONGO_DB ; 

        const connection = await mongoose.connect( URI_MongoDB ) ;

        //console.log( connection )


        const localURLdB = `${connection.connection.host}: ${connection.connection.port}`

        console.log( `\nMongoDB conectada en ${localURLdB}` )

    } catch (err) {
        
        console.error(err.message);

        process.exit(1) ;

    }

}