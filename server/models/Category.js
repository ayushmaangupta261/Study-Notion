const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true, // give me this field in output
    },
    description: {
        type: String
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],

});

module.exports = mongoose.model("Category", CategorySchema);