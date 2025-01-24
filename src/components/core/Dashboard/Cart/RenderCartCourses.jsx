import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiNinjaStar } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component";
// import Cart from '.';
import { removeFromCart,resetCart } from '../../../../slices/cartSlice';



const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log("Cart -> ", cart)

    return (
        <div className='  z-10 gap-x-5 text-richblack-5  '>
            {
                cart.map((course, index) => (
                    console.log("Inside map - ", course),
                    <div key={index} className='flex w-[600px] justify-evenly items-center bg-richblack-800 mb-10 py-4 rounded-lg hover:scale-105 transition-all duration-200'>
                        {/* Left Part */}
                        <div className=' flex w-[50%]  justify-center items-center  ' >
                            <img src={course?.thumbnail} alt="" className='w-[100%] rounded-lg shadow' />

                        </div>

                        {/* Right Part */}
                        <div className='flex flex-col justify-center items-center'>
                            <div className='bg-richblack-700   flex flex-col justify-center items-center text-center py-4 px-5 rounded-lg text-richblack-5'>
                                <p className='text-richblack-5'>Rs. {course?.price}</p>
                                <p>{course?.courseName} </p>
                                <p>{course?.category.name}</p>
                                <div className='flex gap-x-2 justify-center items-center '>
                                    <span className='mt-1'>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<GiNinjaStar />}
                                        fullIcon={<GiNinjaStar />}
                                        classNames=""
                                    />
                                    <span className='mt-1'>{course?.ratingAndReviews?.length}Ratings</span>
                                </div>
                            </div>

                            <button onClick={() => dispatch(removeFromCart(course._id))} className='flex justify-center items-center gap-x-2 mt-4 bg-yellow-50 text-black px-4 py-3 rounded-lg  hover:scale-95 transition-all duration-200'>
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>



                        </div>

                    </div>
                ))
            }

            <button onClick={() => dispatch(resetCart())} className='flex justify-center items-center gap-x-2  bg-yellow-50 text-black px-4 py-3 rounded-lg  hover:scale-95 transition-all duration-200'>
                <RiDeleteBin6Line />
                <span>Reset</span>
            </button>

        </div>
    )
}

export default RenderCartCourses
