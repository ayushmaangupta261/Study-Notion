
// import the required module
const express = require("express");
const router = express.Router();


const {capturePayment,verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/capturePayment", capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;
