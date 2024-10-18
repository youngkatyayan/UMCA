import express from 'express'
import { loginController } from '../../controllers/signInControllers/LoginController.js'
import { authToken } from '../../middlewares/AuthMiddleware.js'
const router = express.Router()

router.post('/login',authToken, loginController)


export default router