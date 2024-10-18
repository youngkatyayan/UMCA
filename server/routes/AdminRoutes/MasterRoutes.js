import express from 'express'
import { addCategory, addMode } from '../../controllers/adminControlllers/MasterController.js'
const router = express.Router()

router.post('/add-category', addCategory)
router.post('/add-mode', addMode)


export default router