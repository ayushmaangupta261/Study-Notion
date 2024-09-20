const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const { completedLectures } = require("./Profile");

exports.updateCourseProgress = async (req, res) => {
    console.log(req.body)
    const { courseId, subSectionId } = req.body;
    const { userId } = req.body;
    console.log(subSectionId, courseId, userId);

    try {
        // check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({ error: "Invaid Sub-Section " });
        }

        // check for old enteries
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        });

        if (!courseProgress) {
            const created = await CourseProgress.create({
                userId: userId,
                courseId: courseId,
                // completedVideos:[]
                percentageCompleted:""
            })

            // return res.status(404).json({
            //     success: false,
            //     message: "Course progress not exists"
            // })
        }

        // check for re-completing re completing the videos
        const includes = await courseProgress?.completedVideos?.includes(subSectionId);
        // if (includes) {
        //     return res.status(400).json({
        //         error: "Subsection alredy completed"
        //     })
        // }
        // push into the completed video
        await courseProgress.completedVideos.push(subSectionId);

        await courseProgress.save();




        // calculate percentage of completelessness
        console.log("Course progress -> ", courseProgress.completedVideos)
        const course = await Course.findById(courseId).populate({
            path: "courseContent"
        }).exec();

        const courseContent = course.courseContent;

        console.log("courseContent -> ", courseContent);
        var totalCourse = 0;
        var completedCourse = 0;

        for (let i = 0; i < courseContent.length; i++) {
            let section = courseContent[i];
            console.log("Inside loop -> ", section);

            for (let j = 0; j < section.subSection.length; j++) {

                if (courseProgress.completedVideos.includes(section.subSection[j])) {
                    completedCourse++;
                }
            }

            totalCourse += section?.subSection?.length;

        }
        console.log("Total course -> ", totalCourse);
        console.log("Total course completed-> ", completedCourse);

        let completedPercentage = (completedCourse / totalCourse) * 100;
        console.log("Completed percent -> ", completedPercentage)

        await CourseProgress.updateOne(
            { userId: userId, courseId: courseId },
            { $set: { percentageCompleted: completedPercentage } }
        );



        return res.status(200).json({
            success: true,
            message: "Course Progress upsated successfully",
        })

    } catch (e) {

        console.log(e);
        return res.status(400).json({
            error: "Internal server error"
        })

    }

}