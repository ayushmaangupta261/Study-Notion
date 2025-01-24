import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from "../../../services/operations/authAPI";
import { useDispatch } from 'react-redux';
// import VerifyEmail from '../../../pages/VerifyEmail';
import { setSignupData } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';


const SignupForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });


  const [accountType, setAccountType] = useState("Student");


  const finalData = {
    ...formData, accountType
  }


  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const [showPassword, setShowPassword] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(setSignupData(finalData));

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't matched !!");
      return;
    }

    const res = dispatch(sendOtp(formData.email, navigate));

  }


  return (
    <div className='h-[100vh]  mx-auto'>
      {loading ? (
          <div className="flex flex-col gap-10 justify-center items-center">
            <div class="typewriter">
              <div class="slide"><i></i></div>
              <div class="paper"></div>
              <div class="keyboard"></div>
            </div>

            <p className="font-semibold text-richblue-5"> Please wait while we are sending you an email</p>
          </div>
        ) :
          (
            <div className='mx-auto flex flex-col '>
              {/* Student-Instructor Tab */}
              <div className=' flex  px-1 py-1 rounded-xl md:rounded-full bg-richblack-800 w-fit mt-10 mb-5'>
                <button
                  onClick={() => setAccountType("Student")}
                  className={`${accountType === "Student"
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                    } rounded-xl md:rounded-full transition-all duration-200 cursor-pointer hover:scale-105 px-3 py-2 `}
                >Student</button>
                <button
                  onClick={() => setAccountType("Instructor")}
                  className={`${accountType === "Instructor"
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                    } rounded-xl md:rounded-full transition-all duration-200 cursor-pointer hover:scale-105 px-3 py-2 `}
                >Instructor</button>
              </div>

              <form
                className='flex flex-col  w-full justify-center mx-auto'
                onSubmit={submitHandler}>
                  
                {/* First and last name */}
                <div className='flex w-[100%] flex-col md:flex-row'>
                  <div className='w-[100%] md:w-[50%]'>
                    <label>
                      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className="text-pink-200">*</sup>
                      </p>

                      <input
                        required
                        type="text"
                        name="firstName"
                        onChange={changeHandler}
                        placeholder='Enter your First Name !!'
                        value={formData.firstName}
                        className='w-[95%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                      ></input>
                    </label>
                  </div>

                  <div className='w-[100%] md:w-[50%]'>
                    <label>
                      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name <sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                        type="text"
                        name="lastName"
                        onChange={changeHandler}
                        placeholder='Enter your Last Name !!'
                        value={formData.lastName}

                        className='w-[95%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                      ></input>
                    </label>
                  </div>
                </div>

                {/* Email Address */}
                <div className='w-[95%] md:w-[97%] mt-5'>
                  <label className=' gap-x-4 mt-[15px] w-full'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="email"
                      name="email"
                      onChange={changeHandler}
                      placeholder='Enter your Email Address !!'
                      value={formData.email}

                      className=' w-[100%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                    ></input>
                  </label>
                </div>

                {/* Create Password and Confirm Password */}
                <div className='flex w-[100%] flex-col md:flex-row mt-5'>
                  <div className='w-[100%] md:w-[50%]'>
                    <label className=' '>
                      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Creeate Password <sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder='Create a Password !!'
                        value={formData.password}

                        className='w-[95%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                      />
                      {/* <span onClick={(prev) => !prev}>
                  {showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
              </span> */}

                    </label>

                  </div>

                  <div className='w-[100%] md:w-[50%]'>
                    <label>
                      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder='Confirm Password !!'
                        value={formData.confirmPassword}

                        className='w-[95%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                      ></input>

                      {/* <span onClick={(prev) => !prev}>
                  {showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
              </span> */}

                    </label>

                  </div>
                </div>

                {/* <div className='w-[95%] md:w-[97%] mt-5'>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">OTP<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="otp"
            onChange={changeHandler}
            placeholder='OTP please !!'
            value={formData.otp}

            className=' w-[100%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
          ></input>
        </label>
      </div> */}

                <div className='w-[97%] mt-5'>
                  <button
                    type="submit"
                    className=' mt-[30px]  bg-yellow-50 text-black rounded-[8px] font-medium w-[100%] px-[12px] py-[8px] '>Create Account</button>
                </div>

              </form>
            </div>
          )
      }

    </div >
  );
};

export default SignupForm
