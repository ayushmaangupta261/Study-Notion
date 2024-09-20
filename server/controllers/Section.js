
const { response } = require("express");
const Course = require("../models/Course");
const Section = require("../models/Section");
const User = require("../models/User");

exports.createSection = async (req, res) => {

    try {

        // fetch the data
        const { sectionName, courseId } = req.body;

        console.log("Going to access section name -> ", sectionName);

        const myArray = sectionName.split(",");

        console.log("Array -> ", myArray);


        let i = 0;
        while (i < myArray.length) {
            console.log("Section name in backend-> ", myArray[i]);
            i++;
        }

        // sectionName.forEach(function(value){
        //     console.log("Section name in backend-> ", value);
        // });

        // for (var item in sectionName) {
        //     console.log("Section name in backend-> ", item);
        // }


        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties..."
            });
        }

        // create section
        let j = 0;
        let newSection = [];
        while (j < myArray.length) {
            console.log("Creating entry in db");
            let sectionName = myArray[j];
            newSection[j] = await Section.create({ sectionName });
            j++;
        }
        // const newSection = await Section.create({ sectionName });
        console.log("Section created -> ", newSection);

        //update course with section object id | TODO: use populate to remove object id of section and subsection using populate at once

        var k = 0;
        let updatedCourseDetails = [];
        while (k < newSection.length) {
            let newSectionId = newSection[k]._id;
            console.log("new section id -> ", newSectionId);
            updatedCourseDetails[k] = await Course.findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        courseContent: newSectionId,
                    }
                },
                { new: true }
            ).populate(
                {
                    path: "courseContent",
                    populate: {
                        path:"sectionName"
                
            },
                }
            ).exec();
            k++;
        }

        // const updatedCourseDetails = await Course.findByIdAndUpdate(
        //     courseId,
        //     {
        //         $push: {
        //             courseContent: newSection._id,
        //         }
        //     },
        //     { new: true }
        // );

        console.log("Updated course -> ", updatedCourseDetails[k-1]);

        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully...",
            data: updatedCourseDetails[k-1]
        });

    }
    catch (e) {

        return res.status(500).json({
            success: false,
            message: "Unable to create a section...",
            error: e.message
        });

    }

}


// update section
exports.updateSection = async (req, res) => {

    try {

        // fetch data
        const { sectionName, sectionId } = req.body; // since this section is already created so it must have an id

        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            });
        }

        // update the section
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        // return response
        return res.status(400).json({
            success: true,
            message: "Section updated successfully..."
        });


    } catch (e) {

        return res.status(500).json({
            success: section,
            message: "Unable to update a section...",
            error: e.message
        });

    }

}


// delete section
exports.deleteSection = async (req, res) => {

    try {

        // fetch the id
        const { sectionId, courseId } = req.body;

        // find by id and delete | TODO[Testing time]: Do we need to delete the object id of the section from course
        await Section.findByIdAndDelete(sectionId);

        // Delete from the course || It has too many problems
        //   Course.updateMany(
        //     {},
        //     {$pop:{courseContent:{$in:[sectionId]}}}
        //   );

        let newCourse = await Course.findById(courseId);
        console.log(newCourse)

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully...",
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete a section...",
            error: e.message
        });

    }

}

