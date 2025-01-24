import React from "react";
import HighlightText from "./HighlightText";
import Button from "./Button";

import { FaHtml5 } from "react-icons/fa";
import Face from "../../../assets/images/Face.png";
import Planning from "../../../assets/images/Planning.webp";

const LearningSection = () => {
  return (
    <div className=" w-11/12 mt-[30px] pb-20 ">
      <div className="  flex flex-col items-center justify-center mx-auto text-center">
        <div className="text-4xl font-semibold ">
          Your Swiss knife for
          <HighlightText text={"learning my language"} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-base mt-5 md:mt-3 text-base font-medium w-[70%]">
          Using spin making learning multiple languages easy. With 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        {/*  3 cards */}
        <div className=" flex flex-col  md:flex-row  items-center justify-center mt-20 mb-12">
          {/* 1st card */}
          <div className="shadow-xl hover:scale-110 hover:z-10 hover:rotate-0 flex flex-col justify-envenly bg-white rounded-lg rotate-6 w-[250px] h-[280px] transition-all duration-300">
            <div className="rounded-lg w-full bg-richblack-200 p-2 font-semibold text-richblack-500 text-center">
              Know your progress
            </div>
            <div className="p-5 flex flex-col gap-10 ">
              <div className="flex flex-col border-b border-richblack-100 p-5 justify-center items-center">
                <div className="flex items-center justify-center gap-2">
                  <FaHtml5 />
                  HTML
                </div>
                <p className="text-sm text-pure-greys-200">
                  Your Current League
                </p>
              </div>
              <div className="flex gap-5">
                <div>
                  <img src="" alt="" />
                  <p className="text-lg ">420</p>
                  <p className="text-sm text-pure-greys-200">Points Earned</p>
                </div>
                <div>
                  <img src="" alt="" />
                  <p className="text-lg ">1254</p>
                  <p className="text-sm text-pure-greys-200">Minutes in top</p>
                </div>
              </div>
            </div>
          </div>
          {/* 2nd card */}
          <div className="shadow-xl hover:scale-110 hover:z-10 hover:rotate-0 rounded-lg flex flex-col justify-envenly bg-white -rotate-6 w-[250px] h-[280px] transition-all duration-300">
            <div className=" rounded-lg w-full bg-yellow-50 p-2 font-semibold text-richblack-500 text-center">
              Compare with others
            </div>
            <div className="p-5 flex flex-col gap-x-10 gap-y-6 ">
              <div className="flex gap-10">
                <img src={Face} alt="" className="w-[30px] " />
                <p className="text-lg text-pure-greys-200">Wade Warren</p>
              </div>
              <div className="flex gap-10">
                {" "}
                <img src={Face} alt="" className="w-[30px]" />
                <p className="text-lg text-pure-greys-200">Jane Cooper</p>
              </div>
              <div className="flex gap-10">
                {" "}
                <img src={Face} alt="" className="w-[30px]" />
                <p className="text-lg text-pure-greys-200">Eleanor Pena</p>
              </div>
              <div className="flex gap-10">
                {" "}
                <img src={Face} alt="" className="w-[30px]" />
                <p className="text-lg text-pure-greys-200">Ralph Edwards</p>
              </div>
            </div>
          </div>
          {/* 3rd card */}
          <div className="shadow-xl rounded-lg hover:scale-110 hover:z-10 hover:rotate-0 transition-all duration-300 flex flex-col justify-envenly bg-white rotate-6 w-[250px] h-[280px]">
            <div className="rounded-lg w-full bg-pink-50 p-2 font-semibold text-richblack-500 text-center">
              Plan according to yourself
            </div>
            <div className=" flex justify-center items-center my-auto">
              <div className="object-cover ">
                <img src={Planning} alt="" className="w-[200px] rounded-md" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit mt-10">
          <Button active={true} linkto={"/signup"}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
