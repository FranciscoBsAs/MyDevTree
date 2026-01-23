import toast from 'react-hot-toast' ;


const toastService = {

    success( message : string ) {

        toast.success( message, {
            duration: 4000
        } )

    }
    ,
    error: ( message : unknown  ) => {

        toast.error( String(message) , {
            duration: 5000
        }) 

    }
    ,
    info: ( message : string ) => {

        toast(message)

    }

}

export default toastService
