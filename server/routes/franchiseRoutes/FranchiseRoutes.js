import express, { Router } from "express"
import { Admission, getDistrict, getPartCommission, getState, getTotalStudent, SeletedCategory, SeletedCourse } from "../../controllers/franchiseController/FranchiseController.js"

const router=  express.Router()


router.post('/get-selctedcategory',SeletedCategory)
router.post('/get-selctedcourse',SeletedCourse)
router.get('/get-state',getState)
router.get('/get-district',getDistrict)
router.post('/get-partcommission',getPartCommission)
router.post('/get-student',getTotalStudent)

router.post('/admission-form',Admission)

export default router