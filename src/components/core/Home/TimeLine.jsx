import React from "react";
import Logo1 from "../../../assets/Time Line Logo/Logo1.png";
import Logo2 from "../../../assets/Time Line Logo/LOgo2.png";
import Logo3 from "../../../assets/Time Line Logo/Logo3.png";
import Logo4 from "../../../assets/Time Line Logo/Logo4.png";
import timeLineImage from "../../../assets/images/TimelineImage.jpeg";

const TimeLineArray = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully commited to the success company",
  },
  {
    Logo: Logo2,
    heading: "Resposibility",
    Description: "Students will be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to the solution",
  },
];

const TimeLine = () => {
  return (
    <div className="bg-pure-greys-5 pb-20">
      <div className="flex flex-col gap-y-5 md:flex-row md:gap-10 mt-10 items-center ">
        {/* Left part */}
        <div className="">
          {TimeLineArray.map((element, index) => {
            return (
              <div className="flex gap-5  place-items-center  " key={index}>
                <div className="drop-shadow-xl w-[80px] p-0 flex items-center mb-2 ">
                  <img src={element.Logo} />
                </div>
                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Right section */}
        <div className=" shadow-blue-200  h-full ">
          <div className="relative bg-gradient-to-r from-[#30E8BF] to-[#FF8235] rounded-xl px-1 ">
            <img
              src={timeLineImage}
              alt=""
              className="shadow-white object-cover h-fit rounded-xl "
            />
          
          <div className="absolute flex flex-col left-11 -bottom-[4rem]  md:flex-row md:-translate-x-[2%] md:translate-y-[-50%] rounded-lg  bg-caribbeangreen-700 flex text-white uppercase py-5">
          <div className="flex gap-5 items-center border-r border-richblue-200 px-7">
            <p className="text-3xl font-bold ">10</p>
            <p className="text-caribbeangreen-300 text-sm">
              Years of Experience
            </p>
          </div>
          <div className="flex gap-5 items-center px-7">
            <p className="text-3xl font-bold ">250</p>
            <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
          </div>
          </div>
        </div>
        </div>

    
      </div>
    </div>
  );
};

export default TimeLine;
