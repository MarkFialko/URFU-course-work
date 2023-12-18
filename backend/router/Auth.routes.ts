import Router from "express";
import AuthController from "../controllers/Auth.controller";

const authRouter = Router()

authRouter.get('', AuthController.authorization)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/me',AuthController.getMe)

export default authRouter
