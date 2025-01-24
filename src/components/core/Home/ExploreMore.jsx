import React, { useState } from "react";
// import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Home from "../../../pages/Home";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Carrer paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    console.log(value);
    console.log("Explore ->", HomePageExplore);
    var result = [];
    try {
      result = HomePageExplore.filter(
        (courses) => courses.tag === value
      );
      console.log("Result -> ", result);
    } catch (e) {
      console.log(e);
      throw e;

    }
    // console.log(HomePageExplore.filter(
    //     (courses) => courses.tag === value
    //   ))
    // console.log("Result -> ", result);
    setCourses(result[0]?.courses);
    setCurrentCard(result[0]?.courses[0]?.heading);
  };

  return (
    <div className="w-11/12 flex flex-col mx-auto justify-center items-center mt-10">
      <div className="text-4xl  font-semibold text-center ">
        Unlock the
        <HighlightText text={"Power of code"} />
      </div>
      <p className="text-center text-richblack-300  text-lg  md:text-[20px] mt-3">
        Learn to build anything you can imagine
      </p>

      <div className="grid sm:w-full  md:grid-cols-5   rounded-xl md:rounded-full bg-richblack-800 mb-5 mt-8 md:mt-5 px-3 py-3 md:px-1 md:py-1">
        {tabName.map((element, index) => {
          return (
            <div
              className={` text-sm md:text-[16px] flex items-center justify-center gap-1 md:gap-2 ${currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
                } rounded-xl md:rounded-full transition-all duration-200 cursor-pointer hover:scale-105 px-3 py-2  `}
              key={index}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* <div className="lg:h-[100px]"></div> */}

      {/* course card */}
      <div className="mt-10">
        <div className="flex flex-col  lg:flex-row justify-center items-center gap-10">
          {courses.map((element, index) => {
            return (
              <div className="flex  md:flex-row overflow-x-auto md:overflow-x-hidden justify-center  items-center hover:scale-110 bg-richblack-800 rounded-lg  transition-all duration-300 ">
                <CourseCard
                  key={index}
                  cardData={element}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
