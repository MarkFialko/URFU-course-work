import axios from "axios";
import UserSchema, {UserDocument} from "../models/User.model";

class GithubService {
    static async getAccessToken(code: string): Promise<string> {
        const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`, {}, {
            headers: {
                Accept: 'application/json'
            }
        })

        const {access_token: accessToken} = response.data

        const userResponse = await GithubService.getMe(accessToken)


        const candidate: UserDocument | null = await UserSchema.findOne({
                userId: userResponse.id
        })

        if (!candidate) {
            const user = new UserSchema({
                userId: userResponse.id,
                userLogin: userResponse.login
            })

            await user.save()
        }

        return accessToken

    }


    static async getMe(token: string): Promise<any> {
        const response = await axios.get('https://api.github.com/user',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        return response.data
    }

}


export default GithubService
