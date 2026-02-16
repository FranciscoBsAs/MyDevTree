export interface userFrontI {
    name : string,
    email : string,
    password : string,
    handleProfileAlias : string ,
    description : string ,
    imageURL : string
    links? : string
}


export interface userRegisterFrontI extends userFrontI {

    password_confirmation : string

}


export interface userLoginFrontI extends Pick< userFrontI, 'email' | 'password' > {}


export interface userEditFrontI extends Pick< userFrontI, 'handleProfileAlias' | 'description' | 'links' > {}


export interface updateProfileResponseI extends Pick< userFrontI, 'imageURL' > {
    messageSuccess : string ,
    message : string ,
}


export interface userByHandleProfileAliasI extends Pick<userFrontI, 'name' | 'handleProfileAlias' | 'description' | 'imageURL' | 'links' > {}
