import axiosInstance from "@/api";
import axios from "axios";
import {useUserStore} from "@/app/store";

class GithubService {
    static async logout() {
        const userStore = useUserStore()
        await axiosInstance.post('/auth/logout')
        userStore.setAuth(false)
        userStore.setUser({})

    }

    static async getMe() {
        const response = await axiosInstance.get('auth/me',{
            withCredentials:true,
        })

        return response
    }


    static async getRepos(query: string) {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`)

        return response

    }


    static async sendToFavorites(repoId: string) {
        const response = await axiosInstance.post('repositories', {
            id: repoId
        })

        console.log(response)

    }

    static async deleteFromFavorites(repoId: string) {
        const response = await axiosInstance.patch('repositories/delete', {
            id: repoId
        })

        console.log(response)

    }


    static async getFavorites() {
        const response = await axiosInstance.get('repositories')

        return response.data.response
    }

}

export default GithubService
