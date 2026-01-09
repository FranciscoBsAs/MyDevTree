import toast from 'react-hot-toast' ;


export const ToastService = {

    success: ( message : string ) => {

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

