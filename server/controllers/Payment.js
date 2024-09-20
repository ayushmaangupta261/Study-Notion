const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require('crypto');
const { courseEnrollementEmail } = require("../mail/template/courseEnrollementEmail");



require("dotenv").config();

// const { courseProgress } = require("../models/CourseProgres");


// This code can handle multiplepurhase at a time

// Initiate payment
exports.capturePayment = async (req, res) => {

    console.log("Request -> ", req);
    const { courses, userDetails } = req.body;
    // const  = req.body.id;
    console.log("Course id inside controller -> ", courses);
    console.log("User id inside payment controller -> ", userDetails);
    const userId = userDetails._id;

    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "Please select a course to move forward"
        })
    }

    let totalAmount = 0;

    for (const courseid of courses) {
        console.log("Course id in the loop -> ", courseid, " User id -> ", userId)
        let course;
        try {

            course = await Course.findById(courseid);

            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the course"
                })
            }


            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled"
                })
            }

            totalAmount += parseFloat(course.price);
            console.log("Total amounnt -> ", totalAmount)

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: e.message,
                // console.log("Can't make payment")
            })
        }


    }

    // const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    console.log("Ready to initiate payment");

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
        console.log("initiated payment")
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: true,
            message: "Could not initiate order"
        })
    }

}

// verify payment
exports.verifyPayment = async (req, res) => {
    console.log("Inside verify payment  ");
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body.courses;
    const userId = req.user.id;

    console.log("razorpay_order_id -> ", razorpay_order_id, "  razorpay_payment_id -> ", razorpay_payment_id, "razorpay_signature -> ", razorpay_signature, "courses -> ", courses, " userId -> ", userId);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "payment Failed"
        });
    }
    console.log("Every thing is available")

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    console.log("Expected signature -> ", expectedSignature, " Razorpay Signature -> ", razorpay_signature);

    if (expectedSignature === razorpay_signature) {

        // enroll the student
        console.log("going to enroll students")
        await enrollStudents(courses, userId, res);
        console.log("Students enrolled");

        // return res
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        });

    } else {
        // console.log("Payment Failed response")
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        });
    }


}


// function to enroll the students into the courses
const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses or userid"
        })
    }

    for (const courseId of courses) {

        console.log("Courses to add in user -> ", courseId);

        try {
            // find the course and enroll the students in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )

            // console.log("Enrolled course -> ", enrolledCourse);

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            }

            // create course progress
            // const courseProgress = await Course.create({
            //     courseID: courseId,
            //     userId: userId,
            //     completedVideos: [],
            // })


            // find the student and add the course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        // courseProgress: courseProgress,
                    }
                },
                { new: true }
            )

            // console.log("Enrolled Student -> ", enrolledStudent);

            // send mail to the student
            // const mailResponse = await mailSender(
            //     enrolledStudent.email,
            //     `Successfully Enrolled into ${enrolledCourse.courseName}`,
            //     courseEnrollementEmail(enrolledCourse.courseName, `${enrollStudents.firstName}`)
            // )
            // console.log("Mail sent successfully -> ", mailResponse.response);


            // send mail to the student
            console.log("enrolled course -> ", enrolledCourse);
            console.log("EnrolledStudent -> ", enrolledStudent)
            console.log("sending mail")
            const email = enrolledStudent.email;
            const name = `${enrolledStudent?.firstName} ${enrolledStudent?.lastName}`
            const data = `You are successfully Enrolled into ${enrolledCourse.courseName} and the course will be added to your UI in a few moments.`
            const msg = `Congratulations your payment for the course ${enrolledCourse.courseName} has been made successfully with us.`;
            const title = "Course Purchased Successfully"

            const mailResponse = await mailSender({ email, data, msg, title, name });

            console.log("MAil send -> ", mailResponse);

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }


    }



}


// send success email
exports.sendPaymentSuccessEmail = async (req, res) => {

    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    try {
        // Find students
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            PaymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
    } catch (e) {
        console.log("Error in sending mail -> ", e);
        return res.status(500).json({
            success: false,
            message: "Could  not send mail"
        })
    }

}









// This code can handle one purchase at a time

// capture the payment and initialize the razorpay order
// exports.capturePayment = async (req, res) => {

//     // get course Id and user Id
//     const { course_id } = req.body;
//     const userId = req.body.id;

//     // validation
//     // validate course ID
//     if (!course_id) {
//         return res.json({
//             success: false,
//             message: "Please provide valoid course ID",
//         });
//     };


//     // validate course details
//     let course;

//     try {

//         course = await Course.findById(course_id);
//         if (!course) {
//             return res.json({
//                 success: false,
//                 message: "Could not find the course...",
//             });
//         }

//         // check if user has already paid for the course
//         const uid = new mongoose.Types.ObjectId(userId); // changing the user id from string to an object id
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Student is already enrolled..."
//             });
//         }



//     } catch (e) {
//         console.error(e);
//         return res.status(500).json({
//             success: false,
//             message: e.message,
//         });
//     }



//     // create the order

//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         reciept: Math.random(Date.now()).toString(),
//         notes: {
//             courseId: course_id,
//             userId,
//         }
//     };

//     // function call
//     try {

//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options); // called orders.create() function on the instance with options as input
//         console.log(paymentResponse);

//         // send the response
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });

//     } catch (e) {

//         console.log(e);
//         res.json({
//             success: false,
//             message: "Could not initate the order...",
//         });

//     }

// }



// // verify signature of razorpay and server
// exports.verifySignature = async (req, res) => {

//     const webhookSecret = "12345678";

//     const signature = req.header("x-razorpay-signatue"); // the secret send by the razorpay will be stored in this format

//     const shasum = crypto.createHmac("sha256", webhookSecret); // Hmac object
//     shasum.update(JSON.strigify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is authorized...");

//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {

//             // find the course and enroll the student into it
//             const enrolledStudent = await Course.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentsEnrolled: courseId } },
//                 { new: true }
//             );

//             if (!enrolledStudent) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found...",
//                 });
//             }

//             console.log(enrolledStudent);

//             // find the student and add the course into the list of enrolled course
//             const enrolledCourses = await User.findOneAndUpdate(
//                 { _id: userId },
//                 { $push: { courses: courseId } },
//                 { new: true },
//             );

//             console.log(enrolledCourses);

//             // send mail for confirmation
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from StudyNotion",
//                 "Congratulations, you have successfully joined our course"
//             );

//             console.log(emailResponse);

//             //return response
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and course added successfully..."
//             });

//         } catch (e) {
//             console.log(e);
//             return res.status(500).json({
//                 success: false,
//                 message: e.message,
//             });
//         }

//     }
//     else {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request...",
//         });
//     }

// };