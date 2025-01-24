import React from "react";
import { Link, Links } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Home/HighlightText";
import CTAButton from "../components/core/Home/Button";
import CodeBlocks from "../components/core/Home/CodeBlocks";
import LearningSection from "../components/core/Home/LearningSection";
import TimeLine from "../components/core/Home/TimeLine";
import InstructorSection from "../components/core/Home/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Home/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";




import banner from "../assets/images/banner.mp4";
import { useSelector } from "react-redux";

const Home = () => {

  const { token } = useSelector((state) => state.auth);


  return (
    <div className="scroll-smooth mt-[3rem]">

     

      {/* Section 1 */}
      <div className="relative   mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between pb-[150px]  ">

        {
          token == null
          && (
            <Link to={"/signup"}>
              <div className="group p-1  mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                <div className="flex items-center gap-2 rounded-full px-10 py-[5px]  transition-all duration-200 group-hover:bg-richblack-900">
                  <p>Become an Instructor</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          )
        }

        <div className="text-center text-4xl font font-semibold mt-6">
          Empower your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 text-center text-lg font-bold text-richblack-300">
          With our coding courses, you can learn at own pace from anywhere in
          the world and get access to a wealth of resouces, including hands-on
          projects, quizzes and personalized feedback from instructor
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>
            Book a demo
          </CTAButton>
        </div>

        {/* Video */}
        <div className="shadow mx-3 my-12  rounded-lg md:w-[50%] flex justify-center  ">
          <div className="w-full"></div>
          <video muted loop autoPlay className="rounded-lg  ">
            <source src={banner} />
          </video>
        </div>
        {/* bg-gradient-to-r from-[#30E8BF] to-[#FF8235]  */}

        {/* Code section 1 */}
        <div className="flex justify-center ">
          <CodeBlocks
            position={" flex-col md:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your{" "}
                <HighlightText
                  text={"coding potential"}
                  with
                  our
                  online
                  courses
                />{" "}
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title> Example </title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1> Hearder </h1>\n<p>\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, repellendus!</p>`}
            codeColor={"text-pink-500"}
          // colorstp1={"#BBD2C5"}
          // colorstp2={"#536976"}
          />
        </div>

        {/* Code section 2 */}
        <div className="flex justify-center ">
          <CodeBlocks
            position={"flex-col md:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start{" "}
                <HighlightText
                  text={"coding in seconds"}
                  with
                  our
                  online
                  courses
                />{" "}
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lessons."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title> Example </title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1> Hearder </h1>\n<p>\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, repellendus!\n</p>`}
            codeColor={"text-pink-500"}
            colorstp1={"#536976"}
            colorstp2={"#BBD2C5"}
          />
        </div>

        <div className="">
          <ExploreMore />
        </div>

      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg h-[250px] flex items-center mx-auto">
          <div className="w-11/12 max-w-maxContent flex  gap-5 mx-auto ">
            <div className="flex flex-col md:flex-row text-white gap-[5rem] md:gap-[15rem] mx-auto ">
              {/* Button 1 */}
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3 justify-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              {/* Button 2 */}
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3 justify-center">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mt-[95px]">
          <div className="flex flex-col md:flex-row gap-5 items-center md:justify-center">
            <div className="text-4xl font-semibold text-center md:w-[45%]">
              Get the skills for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col text-center gap-10 place-items-center md:w-[40%]">
              <div className="text-[16px]">
                The modern studyNotion is the dedicates its own terms. Today, to
                be a compititive specialist requires more than professonal
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimeLine></TimeLine>
          <LearningSection></LearningSection>
        </div>


      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900 text-white items-center">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from other Learners
        </h2>
        <div>
          <ReviewSlider />
        </div>
      </div>

      {/* Section 4 */}
      <div className=" bg-richblack-800">
        <Footer />
      </div>
    </div >
  );
};

export default Home;
