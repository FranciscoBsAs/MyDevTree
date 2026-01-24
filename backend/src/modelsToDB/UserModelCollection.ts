import mongoose, { Document, Schema } from "mongoose";


export interface userI extends Document {

    name : string ,

    email : string,

    password : string ,

    handleProfileAlias : string ,

    //_id? : mongoose.Types.ObjectId | string ,

    description? : string ,

    imageURL? : string



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

        },
        description: {
            
            type: String,

            default: '',

        },

        imageURL: {

            type: String,

            default: '' ,

        }

    }
) ;


export const mongooseUser = mongoose.model<userI>('UserModelCollection', userSchema) ;