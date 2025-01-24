import React from "react";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    // console.log(cardData),
    (
      <div className="">
        {/* card */}
        <div className=" rounded-lg  px-5 py-3">
          {
            <div className="flex flex-col gap-y-3 w-[200px]">
              <p className="text-lg font-semibod text-blue-200"> {cardData.heading}</p>
              <p className="text-sm">
                <span className="text-lg font-semibod ">Description:</span>{" "}
                {cardData.description}
              </p>
              <p className="text-sm ">
                <span className="text-md font-semibod">Level:</span>{" "}
                {cardData.level}
              </p>
              <p className="text-sm">
                <span className="text-md font-semibod">Lession Number:</span>{" "}
                {cardData.lessionNumber}
              </p>
            </div>
          }
        </div>
      </div>
    )
  );
};

export default CourseCard;
