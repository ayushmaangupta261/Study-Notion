import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { useNavigate } from "react-router-dom";

// import RAZORPAY_KEY from process.env;

import { studentEndpoints } from "../api"
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SECCESS_EMAIL_API } = studentEndpoints;

// const navigate = useNavigate();



function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {

    const toastId = toast.loading("Loading...");

    console.log("Inside the buy Course -> ", token, " Courses -> ", courses, "user details -> ", userDetails);

    try {
        //load the script
        console.log("Loading the script")
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        console.log("res from razorpay -> ", res);

        if (!res) {
            toast.error("RazorPay sdk failed to load");
            return;
        }

        // initialize the order 
        console.log("Initializing the order", " Courses -> ", courses, " User -> ", userDetails);
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses, userDetails },
            { Authorization: `Bearer ${token}` }
        )
        console.log("order response -> ", orderResponse)

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // options
        console.log("working with options - >",orderResponse.data);
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for purchasing the course",
            // image:
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },

            handler: function (response) {

                // verify Payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);

                // send mail
                // sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);


            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            console.log(response.error);
        })


    } catch (e) {

        console.log("Payment api error -> ", e);
        toast.error("Could not make payment");

    }

    toast.dismiss(toastId);
}


// send mail
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SECCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {
            Authorization: `Bearer ${token}`
        }
        )
    } catch (e) {
        console.log("Payment success email error -> ", e);
    }
}


// Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {

    const toastId = toast.loading("Verifying payments...");
    dispatch(setPaymentLoading(true));
    try {
        console.log("Token in verify payment -> ",token);
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Verify payment response -> ",response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment successfully, you are added to the course");
        navigate("/dashboard/enrolled-courses");

        dispatch(resetCart());

    } catch (e) {
        console.log("Payment verify-error -> ", e);
        toast.error("Could not verify payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));

}