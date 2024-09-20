const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({

    sectionName: {
        type: String
    },
    subSection: [
        { // It will be the array of videos
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SubSection"
        }
    ]

});

module.exports = mongoose.model("Section", sectionSchema);