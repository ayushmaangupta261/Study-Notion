import React from 'react'
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Course_Card = ({ course, Height }) => {

    console.log("Course in card -> ", course._id);

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    return (
        <div className=' mb-[5rem] w-[75%] mx-auto z-10'>

            <Link to={`/courses/${course._id}`}>
                
                <div className='bg-richblack-700 px-3 py-3 rounded-lg hover:sale-105 transition-all duration-200' >
                    <div className=''>
                        <img src={course?.thumbnail} alt="Course Thumbnail" className={`${Height} w-full rounded-xl object-cover`} />
                    </div>
                    <div className='mt-3 mx-auto rounded-lg bg-richblack-800 px-2 py-2'>
                        <p className='text-lg'>{course?.courseName}</p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex gap-x-4 mt-1'>
                            {/* <span>{avgReviewCount || 0}</span> */}
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='text-sm '>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='mt-2 font-semibold text-lg'>{course?.price}</p>
                    </div>
                </div>


            </Link>
        </div>
    )
}

export default Course_Card
