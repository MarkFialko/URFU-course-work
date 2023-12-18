import GithubService from "./Github.service";
import UserSchema, {UserDocument} from "../models/User.model";
import RepositorySchema, {RepositoryDocument} from "../models/Repository.model";
import UserRepositorySchema, {UserRepositoryDocument} from "../models/UserRepository";

class RepositoryService {
    static async add(token: string, repoId: string) {
        const userResponse = await GithubService.getMe(token)

        const user: UserDocument | null = await UserSchema.findOne({
            userId: userResponse.id
        })

        if (user) {

            let repository = await RepositorySchema.findOne({
                repositoryId: repoId
            })
            if (!repository) {
                repository = new RepositorySchema({
                    repositoryId: repoId
                })

                await repository.save()
            }

            const userRepository: UserRepositoryDocument = new UserRepositorySchema({
                user: user._id,
                repository: repository._id
            })

            await userRepository.save()

            console.log('UserRepository created')
            return {
                message: 'good'
            }
        }
    }

    static async delete(token: string, repoId: string) {
        const userResponse = await GithubService.getMe(token)

        const user: UserDocument | null = await UserSchema.findOne({
            userId: userResponse.id
        })

        if (user) {

            const repositoryToDelete = await RepositorySchema.findOne({
                repositoryId: repoId
            })
            console.log(repositoryToDelete, 'repos', user, 'user')
            const repository: RepositoryDocument | null = await UserRepositorySchema.deleteOne({
                user: user._id,
                repository: repositoryToDelete._id,
            })

            console.log('Repository was deleted', repository)

            return {
                message: 'good'
            }

        }
    }


    static async getFavorites(token: string) {
        const userResponse = await GithubService.getMe(token)
        const user: UserDocument | null = await UserSchema.findOne({
            userId: userResponse.id
        })

        const repositories = await UserRepositorySchema.find({
            user: user?._id
        }).populate('repository')
        return repositories.map(rep => rep.repository.repositoryId)
    }
}


export default RepositoryService
