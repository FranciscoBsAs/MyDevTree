import appServer from "./Server"

// Ejemplos de Requests con Routing manual:

const port = process.env.PORT || 4000

appServer.listen( port, () => { 
    console.log(`Server running in port ${port}...`) 
} )