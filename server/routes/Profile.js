const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent } = require("../middlewares/auth");
const { deleteAccount, updateProfile, getAllUserDetails, updateProfiePicture, getEnrolledCourses, instructorDashboard, markCompleted, completedLectures } = require("../controllers/Profile");
const { updateCourseProgress } = require("../controllers/CourseProgress");


// profile routes
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// get enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
// router.put("/updateDisplayPicture", auth, updateProfilePicture);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

router.put("/markCompleted", auth, isStudent, updateCourseProgress);
router.post("/completedLectures",  completedLectures);


module.exports = router;