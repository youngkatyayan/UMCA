import express from 'express'
import { addCategory, addCourse, addGroup, addMode, addSession, getCategory,  getCourse,  getGroup,  getMode } from '../../controllers/adminControlllers/MastController.js'
const router = express.Router()

router.post('/add-group', addGroup)
router.post('/add-mode', addMode)
router.post('/add-category', addCategory)
router.post('/add-session', addSession)
router.post('/add-course', addCourse)


router.get('/get-category', getCategory)
router.get('/get-mode', getMode)
router.get('/get-group', getGroup)
router.get('/get-course', getCourse)


export default router