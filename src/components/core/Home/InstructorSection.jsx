import React from "react";
import Instructor from "../../../assets/images/Instructor.jpeg";
import HighlightText from "./HighlightText";
import Button  from "./Button";
import {FaArrowRight} from "react-icons/fa"

const InstructorSection = () => {
  return (
    <div className="w-11/12 mt-16 text-white mx-auto">
      <div className="flex flex-col-reverse md:flex-row gap-20 items-center justify:center">
        {/* left */}
        <div className="w-[100%] md:w-[50%] rounded-lg bg-gradient-to-r from-[#30E8BF] to-[#FF8235] px-1">
          <img src={Instructor} alt="" className="shadow-white rounded-lg " />
        </div>
        {/* right */}
        <div className=" w-[100%]  md:w-[50%] flex flex-col justify-center items-center md:items-start  gap-10  text-center md:text-start ">
          <div className="text-4xl font-semibold w-[50%]  ">
            Become an
            <HighlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[100%] md:w-[80%] text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
          <div className="w-fit ">
          <Button active={true} linkto={"/signup"} className="w-fit"  >
          <div className="flex gap-2 items-center "> 
          Start Learning Today
          {/* <FaArrowRight/> */}
          </div>
          </Button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
