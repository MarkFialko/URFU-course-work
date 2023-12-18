import Router from 'express'
import authRouter from "./Auth.routes";
import repositoryRouter from "./Repository.routes";

const router = Router()

router.use('/auth', authRouter)
router.use('/repositories',repositoryRouter)
export default router
