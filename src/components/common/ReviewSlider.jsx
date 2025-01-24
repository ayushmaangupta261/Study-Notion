import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination"

// import {  autoplay, freeMode, Navigation } from "swiper/react";
import { Pagination, Autoplay, FreeMode, Navigation } from 'swiper/modules';

import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";

import { ratingEndpoints } from '../../services/api';

import { apiConnector } from "../../services/apiconnector"
import { FaStar } from "react-icons/fa";


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const response = await apiConnector("GET", ratingEndpoints.REVIEWS_DETAILS_API);
            console.log("Logging the api response -> ", response);

            const { data } = response;

            if (data?.success) {

                setReviews(data?.data);

            }

            console.log("Printing reviews -> ", reviews);

        }

        fetchAllReviews();

    }, []);

    return (
        <div className='text-richblack-5'>
            <div className='h-[190px] max-w-maxContent'>

                <Swiper
                    slidesPerView={4}
                    SpaceBetween={20}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full"
                >

                    {
                        reviews.map((review, index) => {
                            <swiperSlide key={index}>

                                <img src={review?.user?.image ? (review?.user?.image) : (`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`)} alt="" />

                                <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                <p>{review?.course?.courseName}</p>
                                <p>{review?.review}</p>
                                <p>{review?.rating.toFixed(1)}</p>

                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />

                            </swiperSlide>
                        })
                    }

                </Swiper>

            </div>
        </div>
    )
}

export default ReviewSlider
