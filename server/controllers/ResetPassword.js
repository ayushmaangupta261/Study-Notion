const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// reset password token , it will send link for reset password0
exports.resetPasswordToken = async (req, res) => {

    try {

        // get email from req body
        const email = req.body.email;
        console.log("Email : ", email);

        // check user for this email, email validations
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "Your email is not registered with us...",
            });
        }

        // console.log("User found");
        // console.log(user);

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiry time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            {
                new: true, // It will return updated document not the old one
            }
        );

        console.log("user details updated")

        // create url
        const url = `http://localhost:3000/reset-password/${token}`;
        const msg = "This is an email  from the team of StudyNotion to provide you with the link to reset your password";
        const title = "Reset your password";
        const data = `<a href="${url}" style="background-color: #FFED4A; padding: 0.5rem; border-radius: 0.25rem; text-decoration: none; color: #000;">Reset Password</a>`;
        const name = `${user?.firstName} ${user?.lastName}`


        // send mail
        await mailSender({
            email, title, data, msg, name
        }
        );

        //return response
        return res.json({
            success: true,
            message: "Email send successfully, please check and reset your password..."
        });

    } catch (e) {

        console.log(e);
        return res.status(500).json({
            status: false,
            message: "Something went wrong while resetting the password..."
        });

    }

}



// reset password , it will update the password in the db
exports.resetPassword = async (req, res) => {

    try {
        console.log("req -> ", req)
        //fetch data
        const { password, confirmPassword, token } = req.body // we are able to fetch the data from the body because front-end has put the data into the body of the request

        // validaton
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Pssword and confirm pasword is not matching..."
            })
        }

        //get userdetails fromdb using token
        const userDetails = await User.findOne({ token: token });

        console.log("user details -> ", userDetails);




        // if no entry is found - token invalid
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is invald..."
            })
        }
        // token expiry
        if (!(userDetails.resetPasswordExpires > Date.now())) {
            return res.json({
                success: false,
                message: "Token is expired..."
            });
        }

        // Hashinng the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate(
            { token: token }, // find the element on the basis of the token
            { password: hashedPassword }, // saving the hashed password in the password
            { new: true }, // return new object
        )

        const email = userDetails?.email;
        const name = `${userDetails?.firstName} ${userDetails?.lastName}`
        const title = "Password Reset Successfull"
        const msg = "You password has been reset successfully"
        const data = "If this is not done by you then kindly reply us as soon as possible"

        const mailRes = mailSender({ email, title, msg, data, name });

        // return response
        return res.status(200).json({
            success: true,
            message: "Password is reset successfully..."
        });

    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error in saving the new password..."
        });

    }



}