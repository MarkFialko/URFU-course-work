import axios from "axios";

class UserService {
    static async getAccessToken(code: string): Promise<string> {
        const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`, {}, {
            headers: {
                Accept: 'application/json'
            }
        })

        const {access_token: accessToken} = response.data

        return accessToken

    }

}


export default UserService
