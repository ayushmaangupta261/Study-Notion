import React from "react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const [showPassword, setShowPassword] = useState(false);
  const { signupData, loading } = useSelector((state) => state.auth);
  // const loading =true;


  function handleOnChange(e) {
    console.log("Target ->  ", e.target.name, e.target.value);
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(e.target.name);
    console.log(e.target.value);

    console.log("Form data email -> ", formData)
  };
  // const { email, password } = formData;
  // console.log("Email is -> ",email)

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <div className="h-screen">

      {
        loading ? (
          <div className="h-[100vh] flex flex-col justify-center items-center ">
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
            <p className="font-semibold text-richblue-5">Please Wait...</p>
          </div>
        ) :
          (
            <form
              onSubmit={handleOnSubmit}
              className="mt-6 flex w-full flex-col gap-y-4 mx-auto"
            >
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                  className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblue-5  text-center"
                />

              </label>
              <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Passsword"
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                  className="w-full rounded-[0.75rem]  bg-richblack-800 p-[12px] pr-12 text-richblack-5 text-center"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 z-[10] cursor-pointer"
                >
                  {/* {showPassword} ? (<BsEye fontSize={24} fill="#AFB2BF" />) : (
              <BsEyeSlash fontSize={24} fill="#AFB2BF" />) */}
                </span>
                <Link to="/forgot-password">
                  <p className="mt-5 ml-auto max-w-maxContent text-xs text-blue-100">
                    Forgot Password
                  </p>
                </Link>
              </label>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 "
              >

                Log In
              </button>
            </form>)
      }
    </div>
  );
};

export default LoginForm;
