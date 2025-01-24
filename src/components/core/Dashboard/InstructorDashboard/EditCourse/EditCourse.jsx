import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import Section from './Section';
import SubSection from './SubSection';

const EditCourse = () => {

    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    console.log("CourseId -> ", courseId, " token -> ", token);

    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                console.log("Api call -> ", result);
                setCourseData(result[0]);

                console.log("course data -> ", courseData)

            } catch (e) {
                console.log(e);
                console.log("Can't fetch the course details")
            }
        }
        getCourseFullDetails();
    }, [courseId]);

    const [editCourse, setEditCourse] = useState("");

    const editSectionHandler = () => {
        setEditCourse("section");
        dispatch(setCourse(courseData));
        console.log("Course in slice -> ", course);
        console.log("Done with edit section ", editCourse);
    }
    const editSubSectionHandler = () => {
        setEditCourse("subSection");
        dispatch(setCourse(courseData));
        console.log("Done with edit sub section");
    }



    return (
        <div className='text-richblack-5 w-11/12 mx-auto  pb-[5rem]  flex flex-col gap-y-[2rem]'>

            <div className='w-[70%] mx-auto bg-richblack-700 px-[5rem] py-[2rem] rounded-xl flex flex-col gap-y-2'>

                {/* top */}
                <div className=' flex mx-auto gap-x-[10rem] justify-center items-center'>
                    {/* left */}
                    <div className='flex w-[70%] flex-col gap-y-1 text-richblack-5 '>
                        <p className='text-2xl'>{courseData?.courseName}</p>
                        <p className='text-sm'>{courseData?.courseDescription}</p>
                        <p className='text-lg'><span>Price : </span>{courseData?.price}</p>
                        <p className='text-lg'><span >Students Enrolled : </span>{courseData?.studentsEnrolled.length}</p>
                    </div>
                    {/* right */}
                    <div className='w-[90%] rounded-xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-[#30E8BF] to-[#FF8235] px-1 rounded-lg '>
                        <img src={courseData?.thumbnail} alt="" className='rounded-xl' />
                    </div>
                </div>

                {/* bottom */}
                <div className='flex flex-col w-[18rem] justify-between gap-y-[1rem]'>
                    {/* section */}
                    <div className='w-full'>
                        <button
                            onClick={editSectionHandler}
                            className='text-black bg-yellow-25 px-2 py-1 rounded-lg font-semibold w-full hover:scale-105 duration-300'
                        >
                            Edit Section
                        </button>
                    </div>

                    {/* subsection */}
                    <div>
                        <button
                            onClick={editSubSectionHandler}
                            className='text-black bg-yellow-25 px-2 py-1 rounded-lg font-semibold w-full hover:scale-105 duration-300'
                        >
                            Edit SubSection
                        </button>
                    </div>
                </div>

            </div>

            {

                editCourse === "section" ?
                    (
                        <div className='w-[70%] mx-auto flex flex-col gap-y-1'>
                            <p className='text-xl'>Add New Chapters</p>
                            <Section setEditCourse={setEditCourse} />
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )


            }

            {

                editCourse === "subSection" ?
                    (
                        <div className='w-[70%] mx-auto flex flex-col gap-y-1'>
                            <p className='text-xl'>Add New Lectures</p>
                            <SubSection setEditCourse={setEditCourse} />
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )


            }



        </div>
    )
}

export default EditCourse
