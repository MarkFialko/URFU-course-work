import {NextFunction, Request, Response} from "express";
import githubService from "../services/Github.service";
import GithubService from "../services/Github.service";
import RepositoryService from "../services/Repository.service";

class RepositoryController {
    static async add(req: Request, res: Response, next: NextFunction) {
        try {
            const repoId = req.body.id
            const token = req.cookies.token

            const response = await RepositoryService.add(token,repoId)


            return res.json({
                response: response
            })

        } catch (e) {
            res.json(e)
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const repoId = req.body.id
            const token = req.cookies.token

            const response = await RepositoryService.delete(token,repoId)

            return res.json({
                response: response
            })

        } catch (e) {
            res.json(e)
        }
    }

    static async getFavorites(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token

            const response = await RepositoryService.getFavorites(token)

            return res.json({
                response: response
            })

        } catch (e) {
            res.json(e)
        }
    }

}

export default RepositoryController
