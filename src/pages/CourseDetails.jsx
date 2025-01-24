import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import confirmationModal from "../components/common/ConfirmationModal"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import Error from "./Error"
import { formatDate } from "../services/formatDate"
import RatingStars from "../components/common/RatingStars"
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';



const CourseDetails = () => {

    const { user, profileLoading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [confirmationmodal, setConfirmationModal] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    console.log("course Id -> ", courseId)




    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result[0]);
                console.log("course data -> ", courseData)
            } catch (e) {
                console.log(e);
                console.log("Can't fetch the course details")
            }
        }
        getCourseFullDetails();
    }, [courseId]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        // courseData?.data?.CourseDetails?.courseContent?.forEach((sec) => {
        //     lectures += sec.subSection.length || 0;
        // })
        setTotalNoOfLectures(lectures);
    }, [courseData])



    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        // const count = GetAvgRating(courseData?.ratingAndReviews);
        // setAvgReviewCount(count);
    }, [courseData]);

    // const [totalNoOfLectures, setTotalNoOfLectures} = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        console.log("Lectures -> ", lectures)
        setTotalNoOfLectures(lectures);
    }, [courseData])


    const [isActive, setIsActive] = useState(Array(0));
    // const handleActive = (id) => {
    //     setIsActive(
    //         !isActive.includes(id)
    //             ? (isActive.concat(id))
    //             :
    //             (isActive.filter(e)(e != id))
    //     )
    // }

    if (profileLoading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!courseData) {
        return (
            < div >
                <Error />
            </ div>
        )
    }



    // console.log("Course id inside capture details -> ", courseId, "User -> ", user)

    const handleBuyCourse = () => {
        if (token) {
            console.log("Going to buy the course")
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not Logged In",
            text2: "Please Log In to purchase the course",
            btntext1: "LogIn",
            btntext2: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),

        })
    }
    console.log(courseData)
    const {
        id: _id,
        courseName, courseDescription, thumbnail, price, whatYouWillLearn, courseContent, ratingAndReviews
        , instructor, studentsEnrolled, createdAt } = courseData;


    return (
        <div className='flex flex-col   text-richblack-5 pt-5 bg-richblack-700 w-[100vw] h-auto'>

            <div className='flex w-11/12 h-[25rem] mx-auto justify-between items-center relative'>

                <div className=' flex flex-col w-[30%]  gap-y-1  '>
                    <p className='text-3xl font-semibold'>  {courseName}</p>
                    <p className='text-lg'>   {courseDescription}</p>

                    <div className='flex flex-col'>
                        <span className='flex gap-x-2 text-lg items-center'>Average Review <span className='font-semibold'>:</span>  {avgReviewCount}  <span className='font-semibold'>,</span>   <RatingStars Review_Count={avgReviewCount} Star_Size={24} /></span>

                        <span className='text-lg'>{`${ratingAndReviews.length} reviews`}</span>
                        <span className='text-lg'>{`${studentsEnrolled.length} students enrolled`}</span>
                    </div>

                    <div>
                        {/* <p>
                        Created At : {formatDate(createdAt)}
                    </p> */}
                        <p className='text-lg'>
                            Language preferred <span className='font-semibold'>:</span> {" "} English
                        </p>
                    </div>


                </div>

                <div className='absolute w-[70%] -right-[15rem] top-[0.5rem]'>
                    <CourseDetailsCard
                        course={courseData}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />

                </div>





            </div>



            <div className=' bg-richblack-900 h-[100vh]'>

                <div className=' w-11/12 mx-auto mt-[5rem] flex flex-col  items-start gap-y-1 '>

                    <div >

                        <p className='text-3xl'> What you'll learn : <span className='text-2xl'>{whatYouWillLearn}</span> </p>

                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <div>
                            <p className='text-2xl'>Course Content</p>
                        </div>

                        <div>
                            <div className='flex flex-col gap-y-1'>

                                <span className='text-xl'>{courseContent.length} sections</span>
                                <span className='text-xl'>{totalNoOfLectures} lectures</span>
                                <span className='text-xl'>Duration of course : {courseData.data?.totalDuration}</span>

                            </div>

                            <div className='mt-[1rem] text-sm'>
                                <button onClick={() => setIsActive([])}>
                                    Collapse all Sections
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>




            {confirmationmodal && <confirmationModal modalData={confirmationModal} />}

        </div>
    )
}

export default CourseDetails
