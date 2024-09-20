const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");


// sendOTP :- OTP must be verified before signUp
exports.sendOTP = async (req, res) => {

    try {

        // fetch email from body of request
        const { email } = req.body;
        console.log("Email for otp is -> ", email)

        // check if user already exists
        var checkUserPresent = await User.findOne({ email });
        // console.log("Check user -> ",checkUserPresent);

        // if a user already exist , then send a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exists..."
            });
            
        }

        // generate otp
        
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // check otp is unique or not
        var result = await OTP.findOne({ otp });

        // this method is wrong because we have to interact with db many times | in industry some library are used that always sends unique otp
        while (result) {
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        };
        console.log("Otp generated : ", otp);

        // otp object
        console.log("For payload -> ", email, otp);
        const otpPayload = { email, otp };
        console.log("Otp payload -> ", otpPayload)

        //create an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log("Otp body -> ", otpBody);
        const data = `${otpBody.otp}`;
        const title = "Verification Email from the team of StudyNotion"
        const msg = "Your Otp for verification  "
        const name = email;

        // console.log("goin to mailsender->", email, otp);
        const mailRes = mailSender({ email, data, title, msg, name });
        // console.log("Mail res -> ", mailRes);

        //return response successfully
        res.status(200).json({
            success: true,
            message: "OTP created successfully",
            otp
        });

    } catch (e) {

        console.log("Error in controller/auth.js", e);
        return res.status(500).json({
            success: false,
            message: e.message,
        })

    }

}



// signUp
exports.signUp = async (req, res) => {

    try {

        // fetch data from the body of the request
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
        // console.log(otp);

        // validating the details
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status((403)).json({
                success: false,
                message: "Enter all the details carefully..."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password doesn't matched, please enter the details carefully..."
            })
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: true,
                message: "User is already exists, please goand login or try with another email address..."
            });
        }

        // finding the most recent otp
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1); // createdAt:-1 means sorting in the reverse order and limit(1) means sendinng only one response from the dB
        console.log(recentOtp);

        // validating the otp
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        console.log("otp verified");

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("password hashed");

        // create the user
        let approved = "";
        approved = "Instructor" ? (approved = false) : (approved = true);

        // create an entry in the dB
        const profileDetails = await Profile.create({ // creating additional details object
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            approved: approved,
            additionalDetails: profileDetails._id, // saving the id as reference 
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        const title = "SignUp Successfully"
        const msg = "You have been successfully registered with us"
        const data = "If it is not done by you kindly reply us as soon as possible"
        const name = `${firstName} ${lastName}`;

        const mailRes = mailSender({ email, data, title, msg,name });

        //return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully...",
            user
        });

    } catch (e) {

        console.log(e);
        return res.json({
            success: false,
            message: "User can't be registered, please try again later..."
        });

    }

}



// login
exports.login = async (req, res) => {

    try {

        //  get data from req body
        const { email, password } = req.body;

        //validating the data
        if (!email || !password) {
            res.status(403).json({
                success: false,
                message: "All fields are necessary, please enter the details carefully..."
            });
        }

        // check user existing or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found, please go and register first..."
            });
        }

        console.log("User -> ",user);

        //generate jwt token, after matching the password
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            // console.log("payload");

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            // req.user=user;
            console.log("token");
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })

        } else {

            return res.status(401).json({
                success: false,
                message: "Password is incorrect bro..."
            });

        }

        const title = "Login Successfully"
        const msg = "You have been successfully logged into your StudyNotion account"
        const data = "If it is not done by you kindly reply us as sson as possible"
        const name = `${user?.firstName} ${user?.lastName}`;

        const mailRes = mailSender({ email, data, title, msg,name });


    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Login failure, please try again later..."
        })

    }

}



// change password
exports.changePassword = async (req, res) => {

    try {

        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

        const user = await User.findOne({ email });

        // verify the user with the email address
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found, please go and register first..."
            });
        }

        // verify password
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Wrong password please try using forgot password..."
            });
        }

        // update the password
        const updateResponse = await User.findOneAndUpdate(
            req.user.id,
            {
                password: oldPassword
            }
        );

        // mailing feature is left

    } catch (e) {

        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Please try again later..."
        })

    }

}


