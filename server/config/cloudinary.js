require("dotenv").config();

const cloudinary = require('cloudinary').v2;
// const database = require("../config/database");

// database.connect();

exports.cloudinaryConnect = () => {

    try {
        // console.log("cloud name ",  process.env.CLOUD_NAME)

        cloudinary.config({
            // configuring cloudinary to upload media
            clound_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_NAME,
            api_secret: process.env.API_SECRET,
        });

    } catch (e) {
        console.log("Error in cloudinary config")
        console.log(e);
    }

};
