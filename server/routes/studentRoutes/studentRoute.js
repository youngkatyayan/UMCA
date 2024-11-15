
import express from 'express';
import multer from 'multer'
import fs from 'fs'
import { allstudentCourses, getStudAnnouncement, getStudentProceedDataController, updateUserProfileController, ectrollCourseController,feeStatementController
    
 } from '../../controllers/studentController/StudentController.js';
import path from 'path';


const router = express.Router();

router.get('/get-studcourse', allstudentCourses);
router.get('/get-studannouncement', getStudAnnouncement);
router.post('/getStudent-data', getStudentProceedDataController)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "Profile";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const suffix = Math.floor(Math.random() * 10000).toString().padStart(6, '0')
        const ext = file.originalname.split('.').pop()
        const name = file.originalname.split('.')[0]
        cb(null, file.fieldname + name + '_' + suffix + '.' + ext);
    },
});
const upload = multer({ storage: storage });
router.post('/updateProfile-user', upload.single('image'), updateUserProfileController)

router.post('/get-entroll-course', ectrollCourseController)
router.use('/get-entroll-course',express.static(path.join('Profile')))

router.post('/fee-statement',feeStatementController)

export default router;
