
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses "
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ],
    percentageCompleted: {
        type: String,
    }

});

module.exports = mongoose.model("CourseProgress", progressSchema);