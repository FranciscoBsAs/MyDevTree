export interface userFrontI {

    name: string,
    email: string,
    password: string,
    handleProfileAlias: string

}


export interface userRegisterFrontI extends Pick< userFrontI, 'name' | 'email' | 'handleProfileAlias' | 'password' > {

    password_confirmation : string

}

