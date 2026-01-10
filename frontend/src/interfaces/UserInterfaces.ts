export interface userFrontI {
    name : string,
    email : string,
    password : string,
    handleProfileAlias : string 
}


export interface userRegisterFrontI extends userFrontI {

    password_confirmation : string

}


export interface userLoginFrontI extends Pick< userFrontI, 'email' | 'password' > {}
