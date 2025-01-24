import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);

    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent)); // since setEmailsent is a state variable so as it it will be updated ui will also be updated
    }

    return (
        <div className=" text-richblue-5 h-screen w-11/12 flex flex-col mx-auto justify-center items-center ">
            {loading ? (
                <div className="flex flex-col gap-10 justify-center items-center">
                    <div class="typewriter">
                        <div class="slide"><i></i></div>
                        <div class="paper"></div>
                        <div class="keyboard"></div>
                    </div>

                    <p className="font-semibold text-richblue-5"> Please wait while we are sending you an email</p>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center gap-y-5 w-[30%]">
                      <h1 className="text-[1.75rem] font-semibold leading-[2.375rem] text-richblack-5">{!emailSent ? "Reset your password" : "Check your email"}</h1>
                      <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-center">
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery..."
                            : `We have sent the reset email to ${email}`}
                    </p>

                    <div className="flex flex-col w-full">
                        <form onSubmit={handleOnSubmit}
                            className=" flex flex-col w-full"
                        >
                            {!emailSent && (
                                <label htmlFor="">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address</p>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Write your email here..."
                                        className='w-[95%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                                    />
                                </label>
                            )}
                            <div className='mt-5 flex items-center justify-center'>
                           <button type="submit"   className='   bg-yellow-50 text-black rounded-[8px] font-medium  px-[12px] py-[8px] mt-1'>{!emailSent ? "Reset Password" : "Resend Email"}</button>
                           </div>
                        </form>
                        <div className="flex items-center justify-center">
                            <Link to="/login">
                            <p className="mt-5 ml-auto max-w-maxContent text-xs text-blue-100">Back to login</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
