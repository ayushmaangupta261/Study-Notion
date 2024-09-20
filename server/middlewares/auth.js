const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// auth
exports.auth = async (req, res, next) => {

    try {
        //extract tokken
        const token = req?.cookies?.token || req?.body?.token || req?.header("Authorization").replace("Bearer ", "");

        console.log("Inside auth -> ", token)

        //if token is missing, then return reponse
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing...",
            });
        }

        //verify the token
        try {
            console.log("Authenticating... -> ", process.env.JWT_SECRET);
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (e) {
            // verification-issue
            return res.status(401).json({
                success: false,
                message: "Token is invalid...",
            });
        }

        console.log("Authenticated...")


    } catch (e) {

        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the tokem..."
        });

    }

    next();

}



// is Student
exports.isStudent = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students..."
            })
        }
        next();

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "User role cant't be verified..."
        });

    }

}



// is Instructor
exports.isInstructor = async (req, res, next) => {

    console.log("Authenticating Instructor")
    try {

        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor..."
            })
        }
        

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "User role cant't be verified..."
        });

    }
    console.log("Instructor authentication done")
    next();

}



// is Admin
exports.isAdmin = async (req, res, next) => {

    try {
        console.log("In the try of isAdmin...");
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin..."
            });
        }
        console.log("Try of isAdmin ends here...");
        next();
    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "User role cant't be verified..."
        });

    }

}