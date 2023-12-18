import {defineStore} from "pinia";
import GithubService from "@/api/github/github.service";
import githubService from "@/api/github/github.service";




export interface State {
    isLoading: boolean,
    isAuth: boolean,
    user: any,
    favorites: string[]
}

export const useUserStore = defineStore('userStore', {
    state: (): State => ({
        isLoading: false,
        isAuth: false,
        user: {},
        favorites: []
    }),
    getters: {
        getUser(): any {
            return this.user as any
        },
        getAuth(): boolean {
            return this.isAuth
        },
        getIsLoading(): boolean {
            return this.isLoading
        },
        gf(): string[] {
            return this.favorites
        }
    },
    actions: {
        async checkAuth() {
            try {
                this.isLoading = true
                const response = await githubService.getMe()
                if (response.data.status !== 401) {
                    this.isAuth = true
                    this.user = response.data
                }
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false
            }
        },
        async addToFavorite(repoId: string) {
            const response = await GithubService.sendToFavorites(repoId)

        },
        async removeFromFavorite(repoId: string) {
            const response = await GithubService.deleteFromFavorites(repoId)
        },
        async getFavorites() {
                const response = await GithubService.getFavorites()
                console.log('FAVORITES',response)
                this.favorites = response as string[]
        },
        setUser(user: any) {
            this.user = user
        },
        setAuth(auth: boolean) {
            this.isAuth =auth
        }
    },
})
