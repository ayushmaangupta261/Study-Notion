
const express = require("express");
const router = express.Router();

const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");
// const router = require("./Profile");


// routes

//login
router.post("/login", login);

//signup
router.post("/signup", signUp);

// otp
router.post("/reset-password-token", resetPasswordToken);

// send otp
router.post('/sendotp',sendOTP);

// reset password
router.post("/reset-password", resetPassword);

// export the router
module.exports = router;
