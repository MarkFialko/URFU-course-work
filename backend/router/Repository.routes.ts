import Router from "express";
import AuthController from "../controllers/Auth.controller";
import RepositoryController from "../controllers/Repository.controller";

const repositoryRouter = Router()

repositoryRouter.post('', RepositoryController.add)
repositoryRouter.patch('/delete', RepositoryController.delete)
repositoryRouter.get('', RepositoryController.getFavorites)


export default repositoryRouter
