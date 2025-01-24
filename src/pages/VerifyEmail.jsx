import React from 'react'
import { useEffect, useState } from 'react';
import OtpInput from "react-otp-input";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signUp } from '../services/operations/authAPI';
import { sendOtp } from '../services/operations/authAPI';

const VerifyEmail = () => {

    const { signupData, loading } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);


    // const handleOnChange = (e) => {
    //     setOtp((pre) => (
    //         {
    //             ...pre,
    //             [e.target.name]: e.target.value
    //         }
    //     ))
    // }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;

        dispatch(signUp({ accountType, firstName, lastName, email, password, confirmPassword, otp }, navigate));
    }

    return (
        <div className='text-white w-11/12 h-screen flex flex-col justify-center items-center mx-auto'>
            {
                loading ?
                    (<div>
                        <div class="banter-loader">
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                            <div class="banter-loader__box"></div>
                        </div>
                        <p className="font-semibold text-richblue-5"> Please wait while we are creating your account</p>
                    </div>) :
                    (
                        <div className='text-center flex flex-col  '>
                            <h1 className="text-[1.75rem] font-semibold leading-[2.375rem] text-richblack-5">Verify Email</h1>
                            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">A verification code has been sent to you, Enter the code below</p>
                            <form onSubmit={handleOnSubmit}
                                className="w-full mx-auto flex flex-col mt-2  justify-between mx-auto items-center"
                            >
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props}
                                        className="bg-richblue-5 text-richblack-500 rounded-md text-[3rem] mx-3"
                                    />}
                                    className="w-[100%] mx-auto "
                                />


                                <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 w-full"
                                >
                                    Verify Email
                                </button>
                            </form>
                            <div className='mt-1 flex justify-between'>
                                <div>
                                    <Link to="/login">
                                        <p className="mt-5 ml-auto max-w-maxContent text-sm text-blue-100">Back to login</p>
                                    </Link>
                                </div>

                                <button
                                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                >
                                    <p className="mt-5 ml-auto max-w-maxContent text-sm text-blue-100">Resend otp</p>
                                </button>
                            </div>
                        </div>
                    )

                // <div>
                //     <h1>Verify Email</h1>
                //     <p>A verification code has been sent to you, Enter the code below</p>
                //     <form onSubmit={handleOnSubmit} >
                //         <OTPInput
                //             value={otp}
                //             onChange={setOtp}
                //             numInputs={6}
                //             renderSeparator={<span></span>}
                //             renderInput={(props) => (<input{...props}
                //                 className="w-full p-6 bg-richblue-600 text-white"
                //             />)}

                //         />
                //         <button type='submit'>
                //             Verify Email
                //         </button>
                //     </form>
                //     <div>
                //         <div>
                //             <Link to="/login">
                //                 <p>Back to login</p>
                //             </Link>
                //         </div>

                //         <button
                //             onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                //         >
                //             Resend otp
                //         </button>
                //     </div>
                // </div>
            }

        </div>
    )
}

export default VerifyEmail
