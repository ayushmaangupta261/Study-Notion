// Import the required modules
const express = require("express");
const router = express.Router();
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })

const fileUpload = require('express-fileupload');

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'uploads/'
}))


// Import the controllers

// course controller
const { createCourse, getAllCourses, getCourseDetails, getInstructorCourse } = require("../controllers/Course");

// category controller
const { showAllCategory, createCategory, categoryPageDeatils } = require("../controllers/Category");

// section controller
const { createSection, updateSection, deleteSection } = require("../controllers/Section");

// subsection controllers
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSection");

// rating and reviews
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");

// Importing middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// course progress
const { updateCourseProgress } = require("../controllers/CourseProgress");


// Routes

// courses can only be created by instructor only
router.post("/createCourse", auth, isInstructor, createCourse);

// careate a section
router.post("/createSection", auth, isInstructor, createSection);

// create a subsection 
router.post("/createSubSection", auth, isInstructor, createSubSection)

// update a section
router.post("/updateSection", auth, isInstructor, updateSection);

// delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Edit a sub section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

//delete a sub section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// add a sub section to a section
router.post("/addSubSection", auth, isInstructor, createSubSection);

//  get all registered courses
router.get("/getAllCourses", getAllCourses);

// get details for a specific courses
router.post("/getCourseDetails", getCourseDetails);

//get full course details
// router.post("/getFullCourseDetails", auth, getFullCourseDetails);

//edit course
// router.post("/editCourse", auth, isInstructor, editCourse);

// geta all course under a specific instructor
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// delete
// router.delete("/deleteCourse", deleteCourse);

// category creation
router.post("/createCategory", auth, isAdmin, createCategory);

// show all category
router.get("/showAllCategory", showAllCategory);

// get category
router.post("/categoryPageDeatils", categoryPageDeatils)

//delete category


// course progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// category can only be created by the isAdmin
// TODO : put isAdmin middleware here

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

// Intructor course
router.get("/getIntructorCourse", auth, isInstructor, getInstructorCourse);
// router.get("/getIntructorCourse",  getInstructorCourse);

module.exports = router;