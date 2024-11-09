
import express from 'express';
import { allstudentCourses, getStudAnnouncement,getStudentProceedDataController } from '../../controllers/studentController/StudentController.js';


const router = express.Router();

router.get('/get-studcourse', allstudentCourses);
router.get('/get-studannouncement', getStudAnnouncement);
router.post('/getStudent-data',getStudentProceedDataController)

export default router;
