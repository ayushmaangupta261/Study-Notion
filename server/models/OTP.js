const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },

});

// console.log("In the otp schema ->",email,otp);

// mailing function
async function sendVerificationEmail(email, otp) {
    console.log("In the otp schema ->", email, otp);

    const title = "Verification email from studyNotion";
    // const title = { messageTitle };
    const data = otp;

    try {
        const mailResponse = await mailSender({ email, title, data }); //, title
        console.log("Mail send successfully...", mailResponse);
        console.log();
    } catch (e) {
        console.log("Error in sending otp...");
        console.log(e);
        throw e;
    }

}

OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});


module.exports = mongoose.model("OTP", OTPSchema);