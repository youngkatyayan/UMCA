import express from 'express'
import { addCategory, addCourse, addGroup, addMode, addSession, franchiseRequest, getCategory,  getCourse,  getCourseDetails,  getFranchise,  getGroup,  getIncomFranchise,  getMode, getSession, updateCategory, updateCourse, updateCourseStatus, updateFranchiseStatus, updateGroupStatus, updateIncomFranchiseStatus, updateModeStatus, updateSessionStatus, updateSesson } from '../../controllers/adminControlllers/MastController.js'
const router = express.Router()

import multer from 'multer'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadDir = path.join(__dirname,"..","..", 'courseimage', 'uploads');
const franchreqUploadDir = path.join(__dirname, '..', '..', 'franchreqfront', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(franchreqUploadDir)) {
  fs.mkdirSync(franchreqUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,uploadDir); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const franchreqStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, franchreqUploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload = multer({ storage: storage });
const franchreqUpload = multer({ storage: franchreqStorage });


router.post('/add-course', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ]), addCourse)
router.post('/add-group', addGroup)
router.post('/add-mode', addMode)
router.post('/add-category', addCategory)
router.post('/add-session', addSession)


router.get('/get-category', getCategory)
router.get('/get-mode', getMode)
router.get('/get-group', getGroup)
router.get('/get-course', getCourse)
router.get('/get-session', getSession)
router.get('/get-franchiseactive', getFranchise)
router.get('/get-incomfranchise',express.static(path.join("franchreqfront","uploads")) ,getIncomFranchise)

router.post('/updatecostatus', updateCourseStatus) 
router.post('/updatecmstatus', updateModeStatus) 
router.post('/updategrpstatus', updateGroupStatus) 
router.post('/updatesesstatus', updateSessionStatus) 


router.post('/update-course', updateCourse) 
router.post('/update-category', updateCategory) 
router.post('/update-sesson', updateSesson) 
router.post('/get-coursedetails/:CoId', getCourseDetails) 

router.post('/updatefrstatus', updateFranchiseStatus) 
router.post('/updateincfrstatus', updateIncomFranchiseStatus) 


// franchiseRequest from frontend
router.post('/franchise-request', franchreqUpload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
]), franchiseRequest) 
export default router