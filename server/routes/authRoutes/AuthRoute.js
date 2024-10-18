import express from 'express'
import { authController } from '../../controllers/authControllers/AuthController.js';
import { authToken } from '../../middlewares/AuthMiddleware.js';
const router=express.Router()

router.get('/access-token',authToken,authController)

export default router;  