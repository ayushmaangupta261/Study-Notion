import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileapi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import { setCourse } from '../../../slices/courseSlice';
import { getCompletedCourse } from '../../../services/operations/profileapi';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [completedCourse, setCompletedCourse] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const getEnrolledCourses = async () => {
        let id;
        try {
            const res = await getUserEnrolledCourses(token);
            console.log("Enrolled courses res -> ", res);
            setEnrolledCourses(res);

            let i = 0;
            let j = res.length;
            console.log("j = ", j);
            console.log("User id -> ", user);
            // while (i < j) {
            //     // setCompletedCourse(await getCompletedCourse(token, res[i]._id, user._id))
            //     console.log("Loop running -> ", i);
            //     const completedCourses = await getCompletedCourse(token, res[i]._id, user._id);
            //     console.log("Completed courses -> ", completedCourses);
            //     // setCompletedCourse(completedCourses);
            //     // setCompletedCourse(completedCourses);
            //     if (completedCourses) {
            //         const newCompletedCourse = [...completedCourse, completedCourses];
            //         setCompletedCourse(newCompletedCourse);
            //     }

            //     console.log("Completed courses useaState-> ", completedCourse);
            //     i++;
            // }


            console.log("Completed courses useaState-> ", completedCourse);
            console.log("enrolled courses -> ", enrolledCourses);
        } catch (e) {
            console.log("Unable to fetch enrolled courses ", e);
        }
    }

    // const calculateProgress = async () => {
    //     console.log("Calculation progress")
    //     let i = 0;
    //     let j = enrolledCourses?.length;
    //     var totalCourses = 0;
    //     while (i < j) {
    //         if (completedCourse?.includes(enrolledCourses[i]?._id)) {
    //             let k = 0;
    //             while (k < enrolledCourses?.courseContent?.length) {
    //                 totalCourses += enrolledCourses.courseContent[k].subSection.length;
    //                 k++;
    //             }
    //             console.log("Total courses -> ", totalCourses);
    //             i++;
    //         }
    //     }

    // }

    // const getCompletedCourses = async () => {
    //     // let id;
    //     console.log("Completed courses");
    //     try {

    //         let i = 0;
    //         let j = enrolledCourses.length;
    //         console.log("j = ", j);
    //         console.log("User id -> ", user);
    //         while (i < j) {
    //             // setCompletedCourse(await getCompletedCourse(token, res[i]._id, user._id))
    //             const completedCourses = await getCompletedCourse(token, enrolledCourses[i]._id, user._id);
    //             console.log("Completed courses -> ", completedCourses);
    //             i++;
    //         }



    //         console.log("enrolled courses -> ", enrolledCourses);
    //     } catch (e) {
    //         console.log("Unable to fetch enrolled courses ", e);
    //     }
    // }

    useEffect(() => {
        getEnrolledCourses();
        // calculateProgress();
        // getCompletedCourses();
        // setEnrolledCourseseEffect -> ",enrolledCourses);
    }, [])

    const clickHandler = (index) => {
        console.log("Click handler -> ", index)

        navigate('/dashboard/courseOverview');
    }


    return (
        <div className='text-richblack-5 mx-auto flex flex-col h-[100vh]   items-center  pb-[10rem] '>

            <div className='text-3xl text-richblack-5 '>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div className='loader'>Loading...</div>) :
                    (
                        !enrolledCourses.length ? (<p className=' flex justify-center items-center'>You are not enrolled in any course yet...</p>) :
                            (
                                <div className=' mt-[3rem] '>
                                    {/* Cards */}
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-[2rem]  w-[80%]  mx-auto'>
                                        {
                                            enrolledCourses?.map((course, index) => {
                                                return (
                                                    <div key={index} className='bg-richblack-800 w-auto min-h-[6rem] h-auto max-w-[606px]:h-[20rem] flex flex-row  gap-y-[1rem] sm:gap-y-0 justify-center items-center px-5 py-4 rounded-xl text-richblack-5 hover:scale-105 duration-300'

                                                    >
                                                        <div className='flex flex-col w-[30rem]  items-center 4 gap-y-[1rem] ' >
                                                            {/* onClick={navigate(`/view-course/${course?._id}/sction/${course.courseCourseContent?.[0]?.subSection?.[0]?._id} `)} */}
                                                            <img src={course.thumbnail} alt="Image of the course" className='rounded-xl w-auto ' />

                                                            <div className='flex flex-col items-start justify-start text-start w-auto gap-y-1 mr-[50%] '>
                                                                <p className='text-lg'>{course.courseName} </p>
                                                                <p className='text-sm'> {course.courseDescription}</p>

                                                            </div>

                                                            <button
                                                                onClick={
                                                                    () => {
                                                                        console.log("Course in click -> ", course.courseContent);
                                                                        dispatch(setCourse(course));
                                                                        navigate('/dashboard/courseOverview');
                                                                    }
                                                                }
                                                                className='bg-yellow-25 w-full px-[0.5rem] py-[0.25rem] text-black  rounded-lg mt-[1rem] text-lg'
                                                            >
                                                                Start Learning
                                                            </button>

                                                        </div>

                                                        <div>
                                                            {course?.totalDuration}
                                                        </div>

                                                        {/* {
                                                            completedCourse.map((singleCourse, index) => (
                                                                <div className='flex flex-col gap-y-2 w-full' key={index}>

                                                                    {/* <p>{singleCourse.courseId}</p> */}
                                                        {/* 
                                                                    {singleCourse.courseId == course._id ?
                                                                        (<div className='flex flex-col gap-y-2 w-full'>

                                                                            <p className='text-[1rem] text-center flex flex-col'>
                                                                                <span>Progress</span>
                                                                                <span>{course.progressPercentage || 0}%</span></p>
                                                                            <ProgressBar
                                                                                completed={course.progressPercentage || 0}
                                                                                height='8px'
                                                                                isLabelVisible={false}
                                                                            />
                                                                        </div>)
                                                                        :    */}
                                                        {/* (<div> */}
                                                        {/*                                                                             
                                                                            <p className='text-[1rem] text-center flex flex-col'>
                                                                                <span>Progress</span>
                                                                                <span>{course.progressPercentage || 0}%</span></p>
                                                                            <ProgressBar
                                                                                completed={course.progressPercentage || 0}
                                                                                height='8px'
                                                                                isLabelVisible={false}
                                                                            /> */}
                                                        {/* </div>) */}


                                                        {/* } */}
                                                        {/* </div>
                                                            )) */}








                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                    )
            }

            {/* <div>
            {
                completedCourse?.map((Ccourse)=>{
                    <div>
                        {
                            Ccourse
                        }
                    </div>
                })
            }
           </div> */}

        </div >
    )
}

export default EnrolledCourses
