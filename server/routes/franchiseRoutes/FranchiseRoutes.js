import express, { Router } from "express"
import { Admission, getDistrict, getState, SeletedCourse } from "../../controllers/franchiseController/FranchiseController.js"

const router=  express.Router()


router.post('/get-selctedcourse',SeletedCourse)
router.get('/get-state',getState)
router.get('/get-district',getDistrict)

router.post('/admission-form',Admission)

export default router