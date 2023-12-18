import {NextFunction, Request, Response} from "express";
import githubService from "../services/Github.service";
import GithubService from "../services/Github.service";

class AuthController {
    static async authorization(req: Request, res: Response, next: NextFunction) {
        try {
            const code = req.query.code as string

            const token = await githubService.getAccessToken(code)

            // set accessToken from gitHub OAuth to cookie
            res.cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.redirect(process.env.CLIENT_APP_URL!)

        } catch (e) {
            res.json(e)
        }
    }


    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token')
            return res.json({
                message: 'Выход'
            })
        } catch (e) {
            res.json(e)
        }
    }

    static async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const {token} = req.cookies

            const response = await GithubService.getMe(token)


            return res.json(response)

        } catch (e) {
            res.json(e)
        }
    }

}

export default AuthController
