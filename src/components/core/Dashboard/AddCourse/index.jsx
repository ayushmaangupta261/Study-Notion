import RenderSteps from "./RenderSteps"

import React from "react"

export default function AddCourse() {
    return (
        <>
            <div className="text-richblack-5 flex flex-col-reverse min-[1075px]:flex-row justify-center max-[1075px]:items-center w-[100%]  mx-auto overflow-y-auto min-[1075px]:gap-x-10 max-[1075px]:gap-y-10">
                <div className="bg-richblack-800 w-[90%] min-[1075px]:w-[50%] rounded-lg h-full">
                    <h1 className='text-3xl text-richblack-5 mb-10 text-center py-10'>Add Course</h1>
                    <div className="px-5 ">
                        <RenderSteps />
                    </div>
                </div>
                <div className="rounded-lg w-fit min-[1075px]:w-[30%] h-fit min-[1075px]:h-[450px] px-10 flex flex-col items-center justify-center max-[1075px]:py-[3rem] bg-richblack-800  ">
                    <h1 className='text-3xl text-richblack-5 mb-5 text-center'>Course Upload Tips</h1>
                    <ul className="list-disc">
                        <li className='text-md text-richblack-5'>Set the course price or make it free</li>
                        <li className='text-md text-richblack-5'>Standard size of thumbnail for the course is 1024x576</li>
                        <li className='text-md text-richblack-5'>Video section controls the course overview video </li>
                        <li className='text-md text-richblack-5'>Course builder where you can create and organize a course</li>
                        <li className='text-md text-richblack-5'>Add Topics in the course builder section to create lessons, quizzes and assignments</li>
                        <li className='text-md text-richblack-5'>Information from the additional data section shows up on the course single page</li>
                        <li className='text-md text-richblack-5'>Make announcements to notify any important point</li>
                        <li className='text-md text-richblack-5'>Notes to all enrolled student at once</li>
                    </ul>
                </div>
            </div>
        </>
    )
}