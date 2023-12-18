import {Document, model, Schema} from 'mongoose'

export interface IRepository {
    repositoryId: string,

}

export interface RepositoryDocument extends IRepository, Document {
}

const RepositorySchema = new Schema<IRepository>({
    repositoryId: {
        type: String,
        required: true
    },
})

export default model<IRepository>('Repository', RepositorySchema)
