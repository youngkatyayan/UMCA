import express from 'express'
import path from 'path'
import { displayCourseController, getCourseController,promoCodeController,orderCourseController } from '../../controllers/userControllers/UserController.js'

const router=express.Router()

router.post('/get-course-according-data/:id',getCourseController)
router.use('/get-course-according-data' ,express.static(path.join('courseimage','uploads')))
router.get('/display-popular-course',displayCourseController)
router.use('/display-popular-course',express.static(path.join('courseimage','uploads')))

// promocode router
router.post('/promocode',promoCodeController)
router.post('/order-course',orderCourseController)


export default router