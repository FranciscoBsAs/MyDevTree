import appServer from "./Server"


const port = process.env.PORT || 4000

appServer.listen( port, () => { 
    console.log(`\nServer running in port ${port}...`) 
} )