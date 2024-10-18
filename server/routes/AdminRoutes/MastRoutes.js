import express from 'express'
import { addCategory, addGroup, addMode } from '../../controllers/adminControlllers/MastController.js'
const router = express.Router()

router.post('/add-category', addCategory)
router.post('/add-mode', addMode)
router.post('/add-group', addGroup)
router.post('/add-session', addGroup)
router.post('/add-course', addGroup)


// router.post('/get-group', getGroup)


export default router