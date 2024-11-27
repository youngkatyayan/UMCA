import express from "express"

import { Admission, getDistrict, getPartCommission, getState, getUnpaidStudentdataController,franStudentDetails,getFranchiseController,
    filterStudentDataController,getTotalcommission, getTotalStudent, SeletedCategory, SeletedCourse,offlinePaymentController, 
    getFranSudent,
    Selctedatcourse} from "../../controllers/franchiseController/FranchiseController.js"
import path from "path"




const router=  express.Router()


router.post('/get-selctedcategory',SeletedCategory)
router.post('/get-selctedcatcourse',Selctedatcourse)
router.post('/get-selctedcourse',SeletedCourse)
router.get('/get-state',getState)
router.get('/get-district',getDistrict)
router.post('/get-partcommission',getPartCommission)
router.post('/get-student',getTotalStudent)

router.post('/admission-form',Admission)
router.post('/get-totalcommission',getTotalcommission)
router.post('/get-franstudentdetails',franStudentDetails)
router.use('/get-franstudentdetails',express.static(path.join('Profile')))

router.post('/get-student-unpaid-data',getUnpaidStudentdataController)
router.post('/submit-student-payment',offlinePaymentController)
router.get('/get-franchise',getFranchiseController)
router.post('/get-studentfranch',getFranSudent)

router.post('/filter-dataofstudent-byadmin',filterStudentDataController)

export default router