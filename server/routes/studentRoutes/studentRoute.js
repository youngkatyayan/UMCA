import express from 'express';
import { allstudentCourses } from '../../controllers/studentController/StudentController.js';

const router = express.Router();

router.get('/get-studcourse', allstudentCourses);

export default router;
