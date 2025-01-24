import React from "react";

import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import frameImg from "../../../assets/login/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="  ">
      <div className="flex justify-center items-center w-10/12 mx-auto mt-[5rem]">
        {loading ? (
          <div className="flex flex-col justify-center items-center gap-y-[3rem]">
            <div className=" spinner">
            </div>
            <p className="font-semibold text-richblue-5">Please Wait...</p>

          </div>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row justify-center  lg:justify-between items-center lg:items-start w-full">

            <div className="mx-auto max-w-[450px] md:mx-0">
              <h1 className="text-[1.75rem] font-semibold leading-[2.375rem] text-richblack-5">
                {title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-richblack-100">{description1}</span>
                <span className="font-edu-sa font-bold italic text-blue-100">
                  {description2}
                </span>
              </p>
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>


            <div className="flex justify-center items-center mb-[3rem] lg:mb-0 ">
              <img
                src={image}
                alt="Students"
                // width={320}
                loading="lazy"
                className="shadow rounded-lg w-[320px] md:w-[400px] "
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Template;
