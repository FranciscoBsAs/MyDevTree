import appServer from "./Server"


const port = process.env.PORT || 4000

appServer.listen( port, () => { 
    console.log(`Server running in port ${port}...`) 
} )