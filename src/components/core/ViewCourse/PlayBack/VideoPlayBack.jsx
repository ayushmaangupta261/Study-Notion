import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompletedVideo, setCourseVideo, setIsCompleted } from '../../../../slices/videoSlice';
import { useNavigate } from 'react-router-dom';
import { marLectureComplted } from '../../../../services/operations/profileapi';
import Lectures from './Lectures';
import { markLectureAsCompleted } from '../../../../services/operations/courseDetailsAPI';



const VideoPlayBack = () => {

    const { courseVideo } = useSelector((state) => state.video);
    const { isCompleted } = useSelector((state) => state.video);
    const { completedVideo } = useSelector((state) => state.video);

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    console.log("User -> ", user);
    console.log("Video -> ", courseVideo)
    console.log("completed Video -> ", completedVideo)
    console.log("Course -> ", course)
    const courseId = course._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let userId = user?._id;
    let subSectionId = courseVideo?._id;

    const completeLecture = async () => {
        // try {

        //     const result = await marLectureComplted(userId, subSectionId, courseId, token);

        //     if (!result) {
        //         console.log("Api error");
        //     }

        //     console.log("Result -> ", result);


        // } catch (e) {
        //     console.log("Unable to fetch enrolled courses ", e);
        // }
    }


    return (
        <div className='h-screen mx-auto'>

            <div className='w-[60%]   mx-auto  justify-center items-center  rounded-lg flex flex-col gap-y-[2rem]'>
                <video controls className=' rounded-lg shadow'>
                    <source src={courseVideo.videoUrl} />
                </video>

                <button
                    onClick={() => {
                        completeLecture();
                        dispatch(setCourseVideo(""));

                        navigate("/dashboard/courseOverview");
                    }}
                    className='bg-yellow-25 px-[1rem] py-[0.5rem] text-black rounded-lg hover:scale-95 duration-300 transition-all'
                >
                    Back
                </button>

            </div>



        </div>
    )
}

export default VideoPlayBack
