import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllInstructorCourses } from '../../../../services/operations/profileapi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const InstructorCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // const userId = user._id;
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getCourses = async () => {
        try {
            // console.log("Courses -> ",user.courses);
            const res = await getAllInstructorCourses(token);
            console.log("Instructor courses res -> ", res);
            setCourses(res);


            console.log("enrolled courses -> ", courses);
        } catch (e) {
            console.log("Unable to fetch enrolled courses ", e);
        }

    }

    useEffect(() => {
        console.log("User -> ", user);
        getCourses();
        console.log("Courses -> ", courses);
        // setEnrolledCourseseEffect -> ",enrolledCourses);
    }, [])



    return (
        <div className='h-[100vh]'>

            {
                courses.length === 0 ?
                    (
                        <div className='mx-auto flex justify-center items-center mt-[50%]'>
                            <p className='text-center  text-richblack-5 text-4xl'>You don't have any courses yet...</p>
                        </div>

                    )
                    :
                    (
                        <div className='text-richblack-5  mx-auto grid grid-cols-2 gap-x-[4rem] gap-y-[3rem] '>
                            {


                                courses?.map((course, index) => (
                                    // card
                                    <div key={index} className='w-[25rem] rounded-xl bg-richblack-700 px-[2rem] py-[2rem] flex flex-col justify-center items-center mx-auto gap-y-[1rem]  hover:scale-105 duration-300 transition-all '>
                                        {/* Image */}
                                        <div className='flex items-center justify-center  bg-gradient-to-r from-[#30E8BF] to-[#FF8235] px-1 rounded-lg '>
                                            <img src={course.thumbnail} alt="" className=' rounded-lg' />
                                        </div>


                                        {/* Description */}
                                        <div>
                                            <p className='text-2xl'>{course.courseName}</p>

                                        </div>

                                        <div>
                                            <button className='text-black bg-yellow-25 px-[2rem] py-[0.5rem] rounded-lg hover:scale-95 duration-300 transition-all'   >

                                                <Link to={`/dashboard/${course._id}`}>
                                                    Edit</Link>
                                            </button>
                                        </div>

                                    </div>
                                )

                                )
                            }
                        </div>
                    )
            }


        </div>
    )
}

export default InstructorCourses
