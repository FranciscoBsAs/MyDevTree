import { Link } from "react-router-dom";

import { useForm } from "react-hook-form" ;
import { ErrorMessageComponent } from "../components/ErrorMessageComponent";
import type { userRegisterFrontI } from "../interfaces/UserInterfaces";


export default function RegisterView() {


  const initialValues : userRegisterFrontI = {

    name: '', 
    email: '',
    handleProfileAlias: '',
    password: '',
    password_confirmation: ''

  }


  const { register, watch, handleSubmit, formState:{ errors } } = useForm< userRegisterFrontI >(  { defaultValues: initialValues }  )


  if(errors)  console.log( errors ) ;


  const inputPassword : string = watch( 'password' ) ;


  const handleRegister = ( inputFormData : userRegisterFrontI ) => {

    console.log('Desde handleRegister')

  }



  return (

    <div>


      <h2
        className=" text-4xl
                  text-white 
                    font-bold
        "
      >
        Made a account
      </h2>


      <div className="w-full max-w-2xl mx-auto" >


        <form
          onSubmit={  handleSubmit( handleRegister )  }
          className=" bg-white
                      px-5  py-5
                      rounded-lg
                      space-y-10
                      mt-10            
          "
        >

          {/*(div.grid.grid-cols-1.space-y-3>label.text-2xl.text-slate-500+input.bg-slate-100.border-none.p-3.rounded-lg.placeholder-slate-400[id=x type=text placeholder=x])*5 */}


          <div className="grid grid-cols-1 space-y-3">


            <label htmlFor="name" className="text-2xl text-slate-500">
              Name
            </label>

            <input
              type="text"
              className="bg-slate-100 bolder-none p-3 rounded-lg placeholder-slate-400"
              id="name"
              placeholder="Name"

              { ...register( 'name', {
                required: "The name is required",

              } )  }

            />

            {/*  errors.name && <ErrorMessageComponent> { errors.name.message as String } </ErrorMessageComponent>   */}

            {  errors.name && <ErrorMessageComponent> { errors.name.message } </ErrorMessageComponent>  }
            
          </div>


          <div className="grid grid-cols-1 space-y-3">

            
            <label htmlFor="email" className="text-2xl text-slate-500">
              Email
            </label>
            
            <input
              type="text"
              className="bg-slate-100 bolder-none p-3 rounded-lg placeholder-slate-400"
              id="email"
              placeholder="Email"

              { ...register( 'email', {
  
                required: "The email is required",

                pattern: {
                  value: /\S+@\S+\.\S+/ ,
                  message: "Email format is invalid"
                }

              } )  }

            />
          
            {/*  errors.email && <ErrorMessageComponent> { errors.email.message as String } </ErrorMessageComponent>  */ }

            { errors.email && <ErrorMessageComponent> { errors.email.message } </ErrorMessageComponent> }

          </div>


          <div className="grid grid-cols-1 space-y-3">


            <label htmlFor="handleProfileAlias" className="text-2xl text-slate-500">
              HandleProfileAlias
            </label>

            <input
              type="text"
              className="bg-slate-100 bolder-none p-3 rounded-lg placeholder-slate-400"
              id="handleProfileAlias"
              placeholder="A user profile alias for the URL, without spaces"
            
              { ...register( 'handleProfileAlias', {
                required: "The handle profile alias is required",

              } )  }
            
            />

            {  errors.handleProfileAlias && <ErrorMessageComponent> { errors.handleProfileAlias.message } </ErrorMessageComponent> }

          </div>


          <div className="grid grid-cols-1 space-y-3">


            <label htmlFor="password" className="text-2xl text-slate-500">
              Password
            </label>

            <input
              type="text"
              className="bg-slate-100 bolder-none p-3 rounded-lg placeholder-slate-400"
              id="password"
              placeholder="Password"

              { ...register( 'password', {
                required: "The password is required",

                minLength: {

                  value: 8,

                  message: "The password has to be 8 characters at least"

                }

              } )  }

            />

            {  errors.password && <ErrorMessageComponent> { errors.password.message } </ErrorMessageComponent>  }

          </div>


          <div className="grid grid-cols-1 space-y-3">


            <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repeat password</label>

            <input
              type="text"
              className="bg-slate-100 bolder-none p-3 rounded-lg placeholder-slate-400"
              id="password_confirmation"
              placeholder="password"

              { ...register( 'password_confirmation', {
                required: "The password confirmation is required",

                validate: ( inputValue ) => inputValue === inputPassword ? true : 'The passwords are not the same' ,

              } )  }

            />

            { errors.password_confirmation && <ErrorMessageComponent> { errors.password_confirmation.message } </ErrorMessageComponent> }


          </div>



          <input
            type="submit"
            className="bg-cyan-400 p-3 text-lg w-full text-slate-600
                      rounded-lg font-bold cursor-pointer"
            value='Make account'
          />        



        </form>


      </div>

      <nav className="mt-10">

        <Link to="/auth/login">

          <button> Already have a account? Login </button>

        </Link>

      </nav>

      
    </div>

  )


}
