
import { apiConnector } from "../apiconnector"
import { endpoints } from "../api"
import toast from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
// import {resetCart} from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { useNavigate } from "react-router-dom"
 

const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSWORDTOKEN_API, RESETPASSWORD_API } = endpoints;


export function sendOtp(email, navigate) {

    return async (dispatch) => {
        // const toastId = toast.loading("Sending OTP...")
        dispatch(setLoading(true))

        try {

            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true
            })
            console.log("SENDOTP_API response -> ", response);
            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP sent successfully")
            // dispatch(setLoading(false));
            navigate("/verify-email");
        } catch (e) {
            console.log("SENDOTP API ERROR......", e)
            toast.error("OTP can't be sent")
        }
        dispatch(setLoading(false));
        // toast.dismiss(toastId)
    }
}


export function signUp(
    { accountType, firstName, lastName, email, password, confirmPassword, otp }, navigate
) {
    // console.log(firstName);
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType, firstName, lastName, email, password, confirmPassword, otp
            });
            console.log("SIGNUP API RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successfull");
            navigate("/login");
        } catch (e) {
            console.log("SIGNUP ERROR...", e);
            toast.error("SignUp Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false))
        // toast.dismiss(toastId);
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            console.log("LOGGIN API RESPONSE -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successfully")
            dispatch(setToken(response?.data?.token))
            // const userImage = response.data.user?.image ? (response.data.image) : (`https://api.dicebear.com/7.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`);

            // dispatch(setUser({ ...response.data.user, image: userImage }));
            console.log("Saving token and user");
            localStorage.setItem("token", JSON.stringify(response?.data?.token));
            // localStorage.setItem("user", JSON.stringify(response?.data?.user));
            dispatch(setUser(response?.data?.user));
            // dispatch(setLoading(false));
            navigate("/dashboard/my-profile");


        } catch (e) {
            console.log("LOGIn API Error ->", e);
            toast.error("Login failed...")
        }
        dispatch(setLoading(false));
        // toast.dismiss(toastId);
    }
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}


// Reset password token 
export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        // console.log(setLoading);
        try {
            console.log("Sending reset token")
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email });
            console.log("Reset password token response -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset email sent successfully");
            setEmailSent(true);

        } catch (e) {
            console.log("Reset password token error...");
            console.log(e)
            toast.error("Unable to sent email")
        }
        dispatch(setLoading(false));
    }
}


// reset password 
export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token })
            console.log("Reset password response -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
            // setEmailSent(true);



        } catch (e) {
            console.log("Reset password  error...");
            console.log(e)
            toast.error("Unable to change password ")
        }
        dispatch(setLoading(false));
    }
}