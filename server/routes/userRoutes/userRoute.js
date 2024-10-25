import express from 'express'
import { displayCourseController, getCourseController } from '../../controllers/userControllers/UserController.js'

const router=express.Router()

router.post('/get-course-according-data/:id',getCourseController)
router.get('/display-popular-course',displayCourseController)


export default router