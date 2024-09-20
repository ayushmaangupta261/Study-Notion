
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


// create rating
exports.createRating = async (req, res) => {

    try {

        // get user id
        const userId = req.user.id;

        // fetch data from req body
        const { rating, review, courseId } = req.body;

        // check if user is already enrolled
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },  // searching student enrolled with the userid int the course
            }
        );

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course...",
            });
        }

        // check if user already reviewed the course or not
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: true,
                message: "Course is already reviewed by the user...",
            });
        }

        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review, course: courseId, user: userId,
        });

        //update the course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true },
        );

        console.log(updatedCourseDetails);

        // return response
        return req.status(200).json({
            success: true,
            message: "Rating and Review created successfully...",
        });


    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}



// get average rating
exports.getAverageRating = async (req, res) => {

    try {

        // get course id
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([ // It will an array
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId), // give me an entry whose id is equal to the course id || course id was a string but we have changed it into an object
                }
            },
            {
                $group: {
                    _id: null, // wrapping all the items in a single group
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);

        // return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating, // Average will be stored at the 0th index
            });
        }

        // if no rating/review exists
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no ratings given till now...",
            averageRating: 0,
        });


    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }

}



// get all ratings and reviews | TODO : Find course specific rating and review
exports.getAllRating = async (req, res) => {

    try {

        const allReviews = await RatingAndReview.find({}) // find the all entry like this\
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image", // populate these things int the user path...
            })
            .populate({
                path: "course",
                select: "courseName",
            }).exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully...",
            data: allReviews,
        });

    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });

    }


}

