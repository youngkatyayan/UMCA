import express from 'express'
import { AddCategory } from '../../controllers/AdminController/masterControllerjs'
const router = express.Router()

router.post('/add-category', AddCategory)


export default router