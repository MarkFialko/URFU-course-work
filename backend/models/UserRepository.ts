import {Document, model, Schema, Types} from 'mongoose'


export interface IUserRepository {
    user: any,
    repository: any,
}

export interface UserRepositoryDocument extends IUserRepository, Document {
}

const UserRepositorySchema = new Schema<IUserRepository>({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    repository: {
        type: String,
        required: true,
        ref: 'Repository'
    },
})

export default model<IUserRepository>('UserRepository', UserRepositorySchema)
