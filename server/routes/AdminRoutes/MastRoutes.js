import express from 'express'
import { addCategory, addGroup, addMode, addSession, getCategory,  getGroup,  getMode } from '../../controllers/adminControlllers/MastController.js'
const router = express.Router()

router.post('/add-group', addGroup)
router.post('/add-mode', addMode)
router.post('/add-category', addCategory)
router.post('/add-session', addSession)


router.get('/get-category', getCategory)
router.get('/get-mode', getMode)
router.get('/get-group', getGroup)


export default router