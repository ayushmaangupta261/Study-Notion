import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

    const { thumbnail: Thumbnail, price: CurrentPrice, } = course;
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Sorry as a Instructor you can't buy a course");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            // toast.success("Item added to cart");
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please to add the item to the cart",
            btn1Text: "LogIn",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

    return (
        <div className='w-full flex justify-center items-center '>

            <div className='flex flex-col gap-y-3 w-[40%] items-center py-3 rounded-xl  bg-richblack-500 shadow-xl'>
                <img src={Thumbnail} alt="" className='w-[90%] rounded-xl' />

                <div className=' w-[90%] flex flex-col gap-y-2'>

                    <div className='text-xl w-full  '>
                        Rs. {CurrentPrice}
                    </div>

                    <div className='flex flex-col w-auto '>

                        <button onClick={
                            user && course?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") :
                                handleBuyCourse
                        }
                            className="rounded-[8px] bg-yellow-50 w-full py-2 font-medium text-richblack-900 hover:scale-95 transition-all duration-200 "
                        >
                            {
                                user && course?.studentsEnrolled.includes(user?._id) ? "Got to Course" : "Buy Now"
                            }
                        </button>

                        <div>
                            {
                                (!course?.studentsEnrolled.includes(user?._id)) && (
                                    <button onClick={handleAddToCart}
                                        className="mt-7 rounded-[8px] bg-yellow-50 py-2 w-full font-medium text-richblack-900 hover:scale-95 transition-all duration-200 "
                                    >
                                        Add to Cart
                                    </button>
                                )
                            }
                        </div>


                    </div>


                    <div className='flex flex-col gap-y-2 mt-3'>
                        <p className='font-semibold'>30-Day Money-Back Gaurantee</p>
                        <p>This course includes : </p>
                        <div className='flex flex-col'>
                            {
                                course?.instruction?.map((item, index) => {
                                    <p key={index} className='flex gap-x-2'>
                                        <span>{item}</span>
                                    </p>
                                })
                            }
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={handleShare}
                            className="mt-7  rounded-[8px] bg-yellow-50 w-full py-2 font-medium text-richblack-900 hover:scale-95 transition-all duration-200 "
                        >
                            Share
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CourseDetailsCard;
