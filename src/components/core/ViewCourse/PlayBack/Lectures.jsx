import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setCourseVideo, setIsCompleted } from '../../../../slices/videoSlice';
import VideoPlayBack from './VideoPlayBack';
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { setCourse } from '../../../../slices/courseSlice';



const Lectures = ({ lectures, index }) => {

    const { completedVideo } = useSelector((state) => state.video);


    console.log("Lectures -> ", lectures);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (



        <div key={index} className='w-full   flex  flex-col sm:flex-row lg:flex-col justify-between   mx-auto bg-richblack-600 px-[1rem] py-[1rem] rounded-lg hover:scale-105 duration-300 transition-all'>



            {/* <p>{++count}</p> */}
            <div>
                <p><span>Lecture Title : </span>{lectures.title}</p>
                <p><span>Description : </span>{lectures.description}</p>
            </div>

            {/* <div>
                <p className='flex gap-x-[1rem] mt-2  items-center'>Completed :
                    {
                        completedVideo.includes(lectures._id) ?
                            (
                                <div className='flex items-center justify-center my-auto bg-caribbeangreen-300 rounded-full animate-bounce px-1 py-1'><FaCheck /></div>
                            )
                            :
                            (<div className='flex items-center justify-center my-auto bg-[#dc2626] rounded-full animate-bounce px-1 py-1'>
                                <RxCross1 />
                            </div>)
                    }
                </p>
            </div > */}



            <div className='flex mt-[1rem] '>

                <button className='bg-yellow-25 text-black px-[1rem] max-h-[3rem]  rounded-lg mx-auto'
                    onClick={() => {
                        // console.log("Video url -> ", video)
                        // console.log("Video url -> ", video)
                        dispatch(setCourseVideo(lectures));
                        // dispatch(setCourse(course));

                        if (completedVideo.includes(lectures._id)) {
                            dispatch(setIsCompleted(true));
                        }

                        navigate("/dashboard/courseVideo");
                    }}
                >
                    watch
                </button>

                {/* <VideoPlayBack /> */}

                {/* {
                    watch == "yes" ?
                        (<div>
                            <video controls >
                                <source src={video} />
                            </video>
                        </div>) :
                        (
                            <div></div>
                        )
                } */}


                {/* {
                    lectures.videoUrl.map((video, videoIndex) => (
                        <div key={videoIndex}
                            className='flex justify-center items-center mt-[1rem]'
                        >



                            <button className='bg-yellow-25 text-black px-[1rem] py-[0.5rem] rounded-lg'
                                onClick={() => {
                                    console.log("Video url -> ", video)
                                    console.log("Video url -> ", video)
                                    dispatch(setCourseVideo(video));

                                    navigate("/dashboard/courseVideo");
                                }}
                            >
                                watch
                            </button>

                            {/* <VideoPlayBack  /> */}



                {/* {
                                  watch == "yes" ?
                                    (<div>
                                      <video controls >
                                        <source src={video} />
                                      </video>
                                    </div>) :
                                    (
                                      <div></div>
                                    )
                                } */}

                {/* <img src={video} alt="" /> */}
                {/* </div> */}
                {/* )) */}
                {/* } */}
            </div>

        </div >
    )
}

export default Lectures
