import express from 'express'
import path from 'path'
import { displayCourseController, getCourseController } from '../../controllers/userControllers/UserController.js'

const router=express.Router()

router.post('/get-course-according-data/:id',getCourseController)
router.get('/display-popular-course',displayCourseController)
router.get('/display-popular-course',express.static(path.join('courseimage/uploads')))


export default router