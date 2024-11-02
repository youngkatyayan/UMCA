import express from 'express'
import path from 'path'
import { displayCourseController, getCourseController } from '../../controllers/userControllers/UserController.js'

const router=express.Router()

router.post('/get-course-according-data/:id',getCourseController)
router.use('/get-course-according-data' ,express.static(path.join('courseimage','uploads')))
router.get('/display-popular-course',displayCourseController)
router.use('/display-popular-course',express.static(path.join('courseimage','uploads')))


export default router