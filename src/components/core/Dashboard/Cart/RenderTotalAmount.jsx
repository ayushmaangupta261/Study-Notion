import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';


const RenderTotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Purchased these courses -> ", courses)

        // TODO : API integration to the payment gateway
        buyCourse(token, courses, user, navigate, dispatch);

    }

    return (
        <div className='text-center text-richblack-5 flex flex-col gap-y-2 bg-richblack-800 px-3 py-3 rounded-lg '>
            <p>Total : </p>
            <p>Rs. {total}</p>

            <button
                className='cursor-pointer bg-yellow-50 text-black px-[1rem] py-[0.5rem] rounded-md hover:scale-95 transition-all duration-200'
                onClick={handleBuyCourse}

            >Buy Now</button>
        </div>
    )
}

export default RenderTotalAmount
