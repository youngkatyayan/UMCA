import express, { Router } from "express"
import { Admission, getDistrict, getPartCommission, getState, getUnpaidStudentdataController,
    getTotalcommission, getTotalStudent, SeletedCategory, SeletedCourse,offlinePaymentController } from "../../controllers/franchiseController/FranchiseController.js"

const router=  express.Router()


router.post('/get-selctedcategory',SeletedCategory)
router.post('/get-selctedcourse',SeletedCourse)
router.get('/get-state',getState)
router.get('/get-district',getDistrict)
router.post('/get-partcommission',getPartCommission)
router.post('/get-student',getTotalStudent)

router.post('/admission-form',Admission)
router.post('/get-totalcommission',getTotalcommission)
router.post('/get-franstudentdetails',franStudentDetails)

router.post('/get-student-unpaid-data',getUnpaidStudentdataController)
router.post('/submit-student-payment',offlinePaymentController)

export default router