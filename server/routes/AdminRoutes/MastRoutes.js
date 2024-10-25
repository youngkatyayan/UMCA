import express from 'express'
import { addCategory, addCourse, addGroup, addMode, addSession, franchiseRequest, getCategory,  getCourse,  getCourseDetails,  getFranchise,  getGroup,  getIncomFranchise,  getMode, getSession, updateCategory, updateCourse, updateCourseStatus, updateFranchiseStatus, updateGroupStatus, updateIncomFranchiseStatus, updateModeStatus, updateSessionStatus, updateSesson } from '../../controllers/adminControlllers/MastController.js'
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
router.get('/get-session', getSession)
router.get('/get-franchiseactive', getFranchise)
router.get('/get-incomfranchise', getIncomFranchise)

router.post('/updatecostatus', updateCourseStatus) 
router.post('/updatecmstatus', updateModeStatus) 
router.post('/updategrpstatus', updateGroupStatus) 
router.post('/updatesesstatus', updateSessionStatus) 


router.post('/update-course', updateCourse) 
router.post('/update-category', updateCategory) 
router.post('/update-sesson', updateSesson) 
router.post('/get-coursedetails/:CoId', getCourseDetails) 


router.post('/franchise-request', franchiseRequest) 
router.post('/updatefrstatus', updateFranchiseStatus) 
router.post('/updateincfrstatus', updateIncomFranchiseStatus) 


export default router