import { Link } from "react-router-dom" ;
import { useForm } from "react-hook-form";
import { ErrorMessageComponent } from "../components/ErrorMessageComponent";
import type { userRegisterFrontI } from "../interfaces/UserInterfaces";
import { errorsMessageObj } from "../sharedFrontContent/messagesArray/FrontErrorsMessages";


export default function RegisterView () {


  const initialValues : userRegisterFrontI = {

      name: '',
      email: '',
      handleProfileAlias: '',
      password: '',
      password_confirmation: ''

  }


  const { register, watch, handleSubmit, formState: {errors} } = useForm< userRegisterFrontI >( { defaultValues: initialValues } ) ;


  if(errors) console.error( errors ) ;


  const inputPassword : string = watch('password') ;


  const handleRegister = ( inputFormData : userRegisterFrontI ) => {
      console.log( 'Desde handleRegister' )
  }



  return (

    <div>

      
      <h2 className="text-2xl text-white font-bold">Made a account</h2>

      <div className="w-full max-w-2xl mx-auto">
          
          <form
              onSubmit={handleSubmit(handleRegister)}
              className=" bg-white
                          px-5 py-5
                          rounded-lg
                          space-y-5
                          mt-2
              "
          >

              {/*(div.grid.grid-cols-1.space-y-3>label.text-1xl.text-slate-500+input.bg-slate-100.border-none.p-2.rounded-lg.placeholder-slate-400[id=x type=text placeholder=x])*5 */}

              <div className="grid grid-cols-1 space-y-3">

                  <label htmlFor="name" className="text-1xl text-slate-500">Name</label>

                  <input
                      type="text"
                      className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400"
                      id="name"
                      placeholder="Name"
                      {...register( 'name', {
                          required: errorsMessageObj.required('name')
                      } )}
                  />

                  { errors.name && <ErrorMessageComponent> { errors.name.message } </ErrorMessageComponent> }
              
              </div>


              <div className="grid grid-cols-1 space-y-3">

                  <label htmlFor="email" className="text-1xl text-slate-500">Email</label>

                  <input
                      type="text"
                      className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400"
                      id="email"
                      placeholder="Email"
                      { ...register( 'email', {
                          required: errorsMessageObj.required('email'),
                          pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Email format is invalid"
                          }
                      } ) }
                  />

                  { errors.email && <ErrorMessageComponent> { errors.email.message } </ErrorMessageComponent> }

              </div>


              <div className="grid grid-cols-1 space-y-3">

                  <label htmlFor="handleProfileAlias" className="text-1xl text-slate-500">Handle Profile Alias</label>

                  <input
                      type="text"
                      className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400"
                      id="handleProfileAlias"
                      placeholder="A user profile alias for the URLs | NoSpacesAllowed"
                      {...register( 'handleProfileAlias' , {
                          required: errorsMessageObj.required('handle profile alias')
                      } ) }
                  />

                  { errors.handleProfileAlias && <ErrorMessageComponent> { errors.handleProfileAlias.message } </ErrorMessageComponent> }
                  
              </div>


              <div className="grid grid-cols-1 space-y-3">

                  <label htmlFor="password" className="text-1xl text-slate-500">Password</label>

                  <input
                      type="text"
                      className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400"
                      id="password"
                      placeholder="Password"
                      { ...register( 'password', {
                          required: errorsMessageObj.required('password')
                      } ) }
                  />

                  { errors.password && <ErrorMessageComponent> {errors.password.message} </ErrorMessageComponent> }

              </div>


              <div className="grid grid-cols-1 space-y-3">

              <label htmlFor="password_confirmation" className="text-1xl text-slate-500">
                      Password Confirmation
              </label>

              <input
                  type="text"
                  className="bg-slate-100 border-none p-2 rounded-lg placeholder-slate-400"
                  id="password_confirmation"
                  placeholder="Password"
                  { ...register( 'password_confirmation', {
                      required: errorsMessageObj.required('password confirmation'),
                      validate: (inputValue) => (
                        inputValue === inputPassword 
                                      ? true 
                                      : errorsMessageObj.notTheSamePassword
                      )
                  } ) }
              />

              { errors.password_confirmation && <ErrorMessageComponent> { errors.password_confirmation.message } </ErrorMessageComponent> }
              
              </div>


              <input type="submit" className="bg-cyan-700 p-3 text-lg w-full text-slate-200 rounded-lg font-bold cursor-pointer" value="Make account" />
          

          </form>
      
      
      </div>
    
    
      <nav className="mt-10 text-3xl text-blue-500" >
          <Link to='/auth/login' >
                  <button>Already have a account? Login</button>
          </Link>
      </nav>

    </div>

    
  )


}