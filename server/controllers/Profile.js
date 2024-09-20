
// Profile has been made automatically(with null values) during the registration of user as per user schema

const { response } = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
const CourseProgress = require("../models/CourseProgress");

// we only have to update the profile that is already created during registration
exports.updateProfile = async (req, res) => { // personal details

    try {

        // get data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body.formData;

        // get user id
        // console.log("Request in backend -> ", req);

        console.log("User in backend -> ", req.body.userId);
        const id = req.body.userId; // we have added the id of user in req previously
        console.log("User in backend -> ", id);

        console.log("Dob -> ", dateOfBirth, " about -> ", about, " contact -> ", contactNumber, " gender -> ", gender);

        // validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // find the profile
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // console.log("User details -> ",userDetails);
        const profileId = userDetails.additionalDetails;
        // console.log("profile id -> ",profileId);
        const profileDetails = await Profile.findById(profileId);
        // console.log("profile details -> ",profileDetails);

        // update the profile details
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        // save the details
        const result = await profileDetails.save();
        updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log("Result in backend -> ", result);

        // return response
        console.log("Returning true response")
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully...",
            updatedUserDetails
        });


    } catch (e) {

        return res.status(500).json({
            success: false,
            error: e.message,
        });

    }

}


// delete account
exports.deleteAccount = async (req, res) => {

    try {

        // get id
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: true,
                message: "User not found..."
            });
        }

        // delete profile | TODO: find a method to schedule the delete operation | Find crone job
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // TODO : un-enroll the user from all enrolled courses 

        // delete user
        await User.findByIdAndDelete({ _id: id });

        // send response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully..."
        });


    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "User can't be deleted..."
        });

    }

}



// get all user details
exports.getAllUserDetails = async (req, res) => {

    try {

        // get id
        const id = req.user._id;

        // validation and get user details
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Unable to find the user...",
            });
        }

        // console.log(req.user.id);
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "Unable to fetch the user details...",
            });
        }

        // return response 
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully...",
            data: userDetails
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}

// mark lectures as completed
exports.markCompleted = async (req, res) => {
    // console.log("Backend -> ",req);
    try {
        const id = req.body.videoId;
        const userID = req.body.userId;

        console.log(req);

        if (!id || !userID) {
            return res.status(500).json({
                message: "Please prove all details",
                success: false,
            })
        }

        // var verify = await User.findOne({ userID }).lecturesCompleted.includes(id);

        // if(verify){
        //     console.log("Already present");
        // }

        const response = await User.findByIdAndUpdate(
            { _id: userID },
            {
                $push: { lecturesCompleted: id }
            },
            { new: true },
        )

        if (!response) {
            return res.status(504).json({
                message: "Error in bakckend",
                message: false
            })
        }

        return res.status(200).json({
            message: "Work done",
            success: true,
            data: response
        })


    } catch (e) {
        return res.status(500).json({
            message: e.message,
            success: false
        })
    }
}

// get enrolled courses

exports.getEnrolledCourses = async (req, res) => {

    try {
        const userId = req.user.id;
        console.log("UserID in enrolled courses -> ", userId);
        // const userDetails = await User.find({ _id: userId }).
        //     populate({
        //         path: "courses",
        //         // populate: {
        //         //     path: "courseContent",
        //         //     populate: {
        //         //         path: "subSection",
        //         //     }
        //         // }
        //         populate: {
        //             path: "courseName"
        //         }
        //     }).exec();

        const userDetails = await User.find({ _id: userId }).populate(
            {
                path: "courses",
                // match: { status: "Published" },
                // populate: "ratingAndReviews",

                // populate:
                // {
                //     path: "instructor",
                //     model: "User"
                // },
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }


            }
        ).exec();

        console.log("Done with enrolled courses..");

        // userDetails = userDetails.toObject();
        // var subSectionLength = 0;

        console.log("user deatails -> ", userDetails);
        // let courses = userDetails[0].courses;
        console.log("courses -> ", userDetails[0].courses);

        

        // let i = 0;
        // let data = [];
        // // while (i < courses.length) {
        //     data[i] = await User.find(courses[i]);
        //     // i++;
        // // }

        // console.log("Data -> ", data[0]);

        // if (!courses) {
        //     console.log("No user details found")
        //     return res.status(400).json({
        //         success: false,
        //         message: `Could not find user with id : ${userDetails}`
        //     });
        // }

        // for (var i = 0; i < userDetails.courses.length; i++) {
        //     let toTalDurationInSeconds = 0;
        //     subSectionLength = 0;
        //     for (var j = 0; i < userDetails.courses[i].courseContent.length; j++) {
        //         toTalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);

        //         userDetails.courses[i].toTalDuration = convertSectondsToDuration(toTalDurationInSeconds);

        //         subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
        //     }

        //     let courseProgressCount = await CourseProgress.findOne({
        //         courseID: userDetails.course[i]._id,
        //         userId: userId,
        //     });

        //     courseProgressCount = courseProgressCount?.completedVideos.length
        //     if (sebSectionLength === 0) {
        //         userDetails.courses[i].progressPercentage = 100;
        //     } else {
        //         // To make it up to 2 decimal places
        //         const multiplier = Math.pow(10, 2);
        //         userDetails.courses[i].progressPercentage
        //         Math.round(
        //             (courseProgressCount / subSectionLength) * 100 * multiplier
        //         ) / multiplier;
        //     }
        // }

        // if (!userDetails) {
        //     console.log("No user details found")
        //     return res.status(400).json({
        //         success: false,
        //         message: `Could not find user with id : ${userDetails}`
        //     });
        // }

        // console.log(userDetails);

        console.log("Returning courses");
        return res.status(200).json({
            success: true,
            message: "All enrolled  courses send successfully",
            data: userDetails[0].courses
        });
        // console.log("Returned courses");

    } catch (e) {
        console.log("Error catched ->", e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}


// instructor dashboard
exports.instructorDashboard = async (req, res) => {

    try {
        const courseDetails = await CourseProgress.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {

            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // create a new object with the additional fields
            const constcourseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return constcourseDataWithStats;

        })

        res.status(200).json({
            courses: courseData
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error..."
        })
    }

}


// update the details

// update the image
exports.updateProfilePicture = async (req, res) => {

    try {

        // const {}

    } catch (e) {

    }

}

// completed lectures
exports.completedLectures = async (req, res) => {

    const userId = req.body.userId;
    // const subSectionId = req.body.subSectionId;
    const courseId = req.body.courseId;

    console.log("Request in completed lectures controller -> ", req.body)
    console.log("user and course in completed lectures controller -> ", userId, courseId);

    try {

        if (!userId || !courseId) {
            return res.status(200).json({
                success: false,
                message: "Please prove all the details",
            })
        }

        const result = await CourseProgress.findOne(
            {
                userId: userId,
                courseId: courseId
            });

        // const answer = result.includes(courseId);

        console.log("Result -> ", result);
        // console.log("answer -> ", answer);

        if (!result) {
            return res.status(200).json({
                success: false,
                message: "Unable to fetch data"
            })
        }

        return res.status(200).json({
            sucess: true,
            data: result
        })

    } catch (e) {
        return res.status(200).json({
            sucesss: false,
            message: e.message,
        })
    }
}