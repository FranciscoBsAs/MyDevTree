import mongoose, { Schema } from "mongoose";


export interface userI {

    name : string ,

    email : string,

    password : string ,

    handleProfileAlias : string ,

}

const userSchema = new Schema( 
    {
 
        name: {
            
            type: String,

            required: true,

            trim: true,

        },
        email: {

            type: String,

            required: true,

            trim: true ,

            unique: true,

            lowercase: true

        },
        password: {

            type: String,

            required: true,

            trim: true

        },
        handleProfileAlias: {

            type: String,

            required: true,
            
            trim: true,

            unique: true

        }

    }
) ;


export const mongooseUser = mongoose.model<userI>('UserModelCollection', userSchema) ;