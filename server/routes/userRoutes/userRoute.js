import express from 'express'
import { getCourseController } from '../../controllers/userControllers/UserController.js'

const router=express.Router()

router.post('/get-course-according-data/:id',getCourseController)


export default router