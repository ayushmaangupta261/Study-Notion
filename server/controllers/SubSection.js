
const subSection = require("../models/SubSection");
const Section = require("../models/Section");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req, res) => {

    try {

        console.log("Publish course data -> ", req.body);

        // fetch the details from request
        const { sectionId, title, timeDuration, description } = req.body; // section-Id will be sent manually 
        // const { sectionID, videoContent } = req.body.videoData;

        // let i = 0;
        // while (i < req.body.videoData.length) {
        //     console.log("Video data -> ", req.body.videoData[i]);
        //     i++;
        // }

        // console.log("Section Id -> ", sectionID);


        // extract video file
        console.log("Video File -> ", req.files);
        const video = req.files.videoFile;

        console.log("sectionid -> ", sectionId, " title -> ", title, " description -> ", description, " video -> ", video);

        // validations
        // || !timeDuratio
        if (!sectionId || !title || !description
            || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required..."
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create a subsection
        const subSectionDetails = await subSection.create({
            title: title,
            // timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update the section with this sub-section object-Id || TODO: log the updated section here , after adding populate query
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: { subSection: subSectionDetails._id }
            },
            { new: true },
        )

        //return response
        return res.status(200).json({
            success: true,
            message: "Sub Section created successfully...",
            updatedSection,
        });

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal server errror",
            error: e.message,
        });

    }

}

// update subsection
exports.updateSubSection = async (req, res) => {

    try {

    } catch (e) {

    }

}



// delete subsection
exports.deleteSubSection = async (req, res) => {

    try {

    } catch (e) {

    }

}
