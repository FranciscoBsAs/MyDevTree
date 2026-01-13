import toast from 'react-hot-toast' ;


const toastService = {

    success( message : string ) {

        toast.success( message ) 

    }
    ,
    error: ( message : unknown  ) => {

        toast.error( String(message) ) 

    }
    ,
    info: ( message : string ) => {

        toast(message)

    }

}

export default toastService
