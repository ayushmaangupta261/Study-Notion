import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoPlayBack from './VideoPlayBack';
import { setCourseVideo } from '../../../../slices/videoSlice';
import { useNavigate } from 'react-router-dom';
// import Lectures from "./Lectures"
import { Link } from 'react-router-dom';
import DisplaySection from './DisplaySection';
// import { useHistory } from "react-router-dom";

const CourseOverview = () => {

  const { course } = useSelector((state) => { return state.course });

  console.log("Course here -> ", course);

  var count = 0;
  course?.courseContent?.map((sections, index1) => (
    sections?.subSection?.map((subsections, index2) => (
      count = count + 1

    ))
  ))

  console.log("Counts -> ", count);



  const courseContents = course?.courseContent;
  console.log("Course content -> ", courseContents);
  const [watch, setWatch] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const history = useHistory();
  // var count = 0;

  useEffect(() => {

  })

  return (
    <div className='text-richblack-5 w-[80%] mx-auto pb-5 h-[100vh]' >

      <div>
        <div className='flex flex-col gap-y-[2rem] w-full justify-center' >

          <div>
            <Link to={"/dashboard/enrolled-courses"}
            >
              <button className='text-black bg-yellow-25 px-[1rem] py-[0.5rem] rounded-lg hover:scale-95 duration-300'
              >
                Back
              </button>
            </Link>

          </div>

          <div className='flex flex-col gap-y-[2rem] w-full justify-center'>
            {
              courseContents?.map((courseContent, index) => (
                <DisplaySection courseContent={courseContent} key={index} />
              ))
            }
          </div>

        </div>


        {/* Image */}
        {/* <div>
                <img src={course.thumbnail} alt="" />
              </div> */}

      </div>
    </div>
  )
}

export default CourseOverview
