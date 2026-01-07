import { Link } from "react-router-dom" ;
import { useForm } from "react-hook-form";
import { ErrorMessageComponent } from "../components/ErrorMessageComponent";
import type { userRegisterFrontI } from "../interfaces/UserInterfaces";


export default function RegisterView () {


    const initialValues : userRegisterFrontI = {

        name: '',
        email: '',
        handleProfileAlias: '',
        password: '',
        password_confirmation: ''

    }


    

}