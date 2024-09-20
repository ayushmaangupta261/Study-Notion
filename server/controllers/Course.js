require("dotenv").config();
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { findById } = require("../models/SubSection");
// const cloudianry = require("cloudinnary").v2;





// create createCourse handler
exports.createCourse = async (req, res) => {

    try {

        // fetch data 
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;  // Here tag will be the id bcz it is defined in the schema as object id
        const categoryId = category;

        console.log("Request -> ", req.body);
        // console.log("File -> ", req.files);

        // for(const val of req.body.thumbnailImage) {
        //     console.log(val)
        // }

        // get thumbnail
        // const { path: thumbnailImage } = req.body

        const thumbnail = req.files.thumbnailImage;
        console.log("Thumbnail->", thumbnail)

        console.log(courseName);
        console.log(courseDescription);
        console.log(whatYouWillLearn);
        console.log(price);
        console.log(categoryId);


        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !categoryId || !thumbnail) {
            return res.json({
                success: false,
                message: "All fields are compulsory...",
            });
        }
        console.log("All details are valid")

        //check for the instructor || TODO: check for user id instructor._id are same or not
        const userId = req.user.id;
        console.log("User id : ", userId);
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details : ", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found..."
            });
        }

        //check given tag is valid or not (i.e., whether the tag is present or not)
        const categoryDetails = await Category.findById(categoryId);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found..."
            });
        }
        console.log(categoryDetails);

        // upload image to cloudinary
        const coverImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        console.log("Creating course , thumbnailImage response ->", coverImage)

        console.log(coverImage.secure_url);

        // create an entry in DB for the new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: coverImage.secure_url
        });
        console.log("Course created")


        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id }, // find using this id
            { $push: { courses: newCourse._id } }, // if this particular field in not present then it will add that
            { new: true },
        );

        // update the tag schema (HW)
        await Category.findByIdAndUpdate(
            categoryId, // find using this id
            { $push: { course: newCourse._id } },
            { new: true },
        );



        // return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully...",
            data: newCourse
        });


    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to create new course...",
            error: e.message
        });

    }

}


// get all courses
exports.getAllCourses = async (req, res) => {

    try {

        // TODO: It can be changed in future
        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true
            }
        ).populate("Instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data found successfully...",
            data: allCourses,
        });

    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Can't fetch course data",
            error: e.message
        });

    }

}


// get course details
exports.getCourseDetails = async (req, res) => {

    try {

        // get id
        const { courseId } = req.body;
        console.log("Course id in backend - ", courseId)
        // find course details
        const courseDetails = await Course.find({ _id: courseId })
            .populate(
                {
                    path: "instructor",
                    // populate: {
                    //     path: "additionalDeatails",
                    // },
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not finnd the course with ${courseId}`,
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully...",
            data: courseDetails,
        });


    } catch (e) {

        console.log(e);
        return res.json({
            success: false,
            messsage: e.message,
        });

    }

}


// get instructor course
exports.getInstructorCourse = async (req, res) => {

    try {

        console.log("Backend -> ", req.user.id);
        const userId  = req.user.id;

        if (!userId) {
            return res.json({
                success: false,
                message: "Please provide all the details"
            })
        }

        const user = await User.findById(userId).populate({
            path: "courses"
        }
        ).exec();


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Error with the user Id"
            })
        }


        console.log("User is found -> ", user);

        return res.status(200).json({
            success: true,
            data: user,
            message: "User found successfully"
        })

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Error in backend"
        })

    }

}