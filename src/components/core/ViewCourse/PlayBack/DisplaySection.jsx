import React, { useEffect, useState } from 'react'
import Lectures from "./Lectures"
import { setViewMore, setCompletedVideo } from '../../../../slices/videoSlice';

import { useDispatch, useSelector } from 'react-redux';
import { markLectureAsCompleted } from '../../../../services/operations/courseDetailsAPI';
// import { setCourse } from '../../../../slices/courseSlice';



const DisplaySection = ({ courseContent, index }) => {

    const [viewMore, setViewMore] = useState(null);
    // const {viewMore } = useSelector((state) =>state.video);
    // const dispatch  = useDispatch();
    console.log("Course Content -> ", courseContent);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.profile);
    console.log("User in display section -> ", user);
    var lecturesCompleted = user.lecturesCompleted;
    console.log("Lectures Completed -> ", lecturesCompleted);
    dispatch(setCompletedVideo(lecturesCompleted));

    const getCompletedCourses = async () => {
        try {
            markLectureAsCompleted(user._id,)
        } catch (e) {

        }
    }

    useEffect(() => {
        setViewMore(false);


    }, []);


    return (
        <div key={index} className='bg-richblack-700 w-full px-[1rem] py-[1rem] rounded-lg flex flex-col gap-y-[1rem] justify-center'>

            <div className='flex justify-between'>
                <p className='my-auto'><span>Unit : </span>{courseContent.sectionName}</p>
                <button
                    className='text-black bg-yellow-25 px-[1rem] py-[0.5rem] rounded-lg hover:scale-95 duration-300'
                    onClick={() => {
                        setViewMore(!viewMore);
                    }}
                >
                    {
                        viewMore === false ?

                            <p>Expand</p>

                            :

                            <p>Collapse</p>

                    }

                </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[1rem] lg:gap-x-[1rem] w-full mx-auto transition-all duration-300'>
                {

                    viewMore == true ?
                        (
                            courseContent?.subSection?.map((lectures, index) => (

                                <Lectures lectures={lectures} key={index} />
                                // <div></div>


                            ))
                        )
                        :
                        (<div></div>)

                }
            </div>



        </div>
    )
}

export default DisplaySection
