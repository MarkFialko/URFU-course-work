import {Document, model, Schema} from 'mongoose'

export interface IUser {
    userLogin: string,
    userId: string,
}

export interface UserDocument extends IUser, Document {
}

const UserSchema = new Schema<IUser>({
    userLogin: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
})

export default model<IUser>('User', UserSchema)
