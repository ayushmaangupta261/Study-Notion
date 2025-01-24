import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import Course_Card from './Course_Card';

const CourseSlider = ({ Courses }) => {
    console.log("Inside course slider -> ", Courses)
    return (
        <>
            {
                Courses?.length ?
                    (
                        <Swiper
                            slidesPerView={3}
                            // spaceBetween={10}
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className=""
                        >
                            {
                                Courses?.map((course, index) => (
                                    
                                    <SwiperSlide key={index} className=''>
                                        <Course_Card course={course} Height={"h-[250px]"} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )
                    : (<p> No courses were found </p>)
            }
        </>
    )
}

export default CourseSlider
