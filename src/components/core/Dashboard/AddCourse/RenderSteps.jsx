import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"

import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse/PublishCourse'

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);
    console.log("Step -> ", step)
    //  step = 2


    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ]

    console.log("Steps -> ", steps)

    return (
        <>
            <div className='h-full'>
                <div className='text-richblack-5 flex justify-evenly  mx-auto mb-5 '>
                    {
                        steps.map((item) => (
                            <>
                                <div className=''>
                                    <div className={`${step === item.id ? (
                                        "bg-yellow-900 text-yellow-50 border-yellow-50"
                                    ) : (
                                        "border-richblack-700 bg-richblack-800 text-richblue-5"
                                    )} border px-5 py-3 rounded-full`} >
                                        {
                                            step > item.id ? (<FaCheck />) : (item.id)
                                        }
                                    </div >
                                </div>


                                {
                                    // Add dashesh
                                }
                            </>
                        ))
                    }
                </div >

                <div className='text-richblack-5 flex justify-center '>
                    {
                        steps.map((item) => (
                            <>
                                <div>
                                    <p className='text-lg text-richblack-5'>
                                        {item.id === step && item.title
                                        }</p>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>

            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}

            {/* <CourseBuilderForm /> */}

        </>
    )
}

export default RenderSteps
