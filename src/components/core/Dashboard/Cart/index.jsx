import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount';
import RenderCartCourses from "./RenderCartCourses"

const Cart = () => {

    const { total, totalItems } = useSelector((state) => state.cart);



    return (
        <div className='text-richblack-5 flex flex-col h-[100vh] '>
            <h1 className='text-3xl'>Your Cart</h1>
            <p className='text-2xl mt-3 '>{totalItems} courses in cart</p>
            {
                totalItems >= 0
                    ? (<div className='flex  justify-center items-start  gap-x-10 mt-10'>
                        <RenderCartCourses/>
                        <RenderTotalAmount />
                    </div>)
                    : (
                        <p className='text-lg mt-3'>Your cart is empty...</p>
                    )
            }
        </div>
    )
}

export default Cart

