
import express from 'express';
import { allstudentCourses, getStudAnnouncement,getStudentProceedDataController,updateUserProfileController,ectrollCourseController } from '../../controllers/studentController/StudentController.js';


const router = express.Router();

router.get('/get-studcourse', allstudentCourses);
router.get('/get-studannouncement', getStudAnnouncement);
router.post('/getStudent-data',getStudentProceedDataController)

router.post('/updateProfile-user',updateUserProfileController)
router.post('/get-entroll-course',ectrollCourseController)

export default router;
