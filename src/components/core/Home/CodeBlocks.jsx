import React from "react";
import Button from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  //   backkgroundGrdient,
  codeColor,
  //   colorstp1,
  //   colorstp2
}) => {
  return (
    <div
      className={`flex  ${position} my-10 justify-between gap-10 w-11/12 rounded-xl  items-center`}
    >
      {/* Section 1 */}
      <div className=" text-center md:w-[50%] flex flex-col gap-8 place-items-center">
        {heading}

        <div className="text-richblack-300 font bold">{subheading}</div>

        {/* Button */}

        <div className="flex gap-7 mt-7 ">
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            {ctabtn1.btnText}
            {/* <FaArrowRight /> */}
          </Button>
          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </Button>
        </div>
      </div>


      {/* Section 2 */}
      <div
        className={`flex h-fit  w-[100%] text-[10px] py-4 lg:w-[500px] rounded-xl shadow-lg shadow-[#25f0a6] bg-gradient-to-r from-[#BBD2C5] to-[#536976]`}
      >
        {/* HW - Gradient */}
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p className="invisible">12</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
