import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import UploadVideo from './UploadVideo';
import IconButton from '../../../../common/IconButton';
import { createSubSecction } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValue,
        formState: { errors }
    } = useForm();


    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.auth)
    const [sections, setSections] = useState([]);
    // const [sectionName, setSectionName] = useState([]);
    var sectionNames = [];
    const { course, step } = useSelector((state) => state.course)

    useEffect(() => {
        setSections(course.courseContent);
        sections.map((section, i) => {
            console.log("Section name -> ", section.sectionName)
            sectionNames[i] = section.sectionName;
        })
        // console.log("sections in step 3 -> ", course);
        console.log("sections in step 3 -> ", sections);
        console.log("sections name in step 3 -> ", sectionNames);
    }, [])

    // const [video, setVideo] = useState([]);
    // const [section, setSection] = useState();

    const videoTemplate = { sectionID: "", videoContent: {} };
    const [videoData, setVideoData] = useState([videoTemplate]);


    const handleOnChange = (e, index) => {
        console.log("ON change video data -> ", videoData);
        console.log("ON change => ", e.target.name);
        const updatedVideoData = videoData.map((singleData, i) =>
            index === i
                ?
                (
                    Object.assign(singleData, { [e.target.name]: e.target.value })
                )
                :
                (singleData)
        );

        setVideoData(updatedVideoData);

        console.log("Video Data -> ", videoData);


    }







    const [videoPreview, setVideoPreview] = useState();

    const handleAddPreview = (e) => {
        const videoUrl = URL.createObjectURL(e.target.files[0]);
        console.log("Video -> ", videoUrl);
        setVideoPreview(videoUrl);
    }


    // const handleRemoveVideoPreview = (index) => {
    //     console.log("Index -> ", index);
    //     const updatedVideoList = [...videoList];
    //     const updatedVideoPreview = [...videoPreview]
    //     console.log("video list  -> ", updatedVideoList);
    //     updatedVideoList.splice(index, 1);
    //     updatedVideoPreview.splice(index, 1);
    //     console.log("updated video list -> ", updatedVideoList);
    //     setVideoPreview(updatedVideoPreview)
    //     setVideoList(updatedVideoList);
    // }



    // Api call
    const onSubmit = async (data) => {
        console.log("Inside on submit")
        // data.preventDefault();

        let i = 0;

        console.log("Going to make api call ->", data);
        const formData = new FormData();
        formData.append("sectionId", data.courseChapter);

        formData.append("title", data.videoTitle);
        formData.append("description", data.videoDescription);
        formData.append("videoFile", data.video[0]);

        // while (i < data.length) {
        //     formData.append(data[i]);
        //     console.log("Data inside loop -> ", data[i]);
        //     i++;
        // }


        console.log(" Formdata ", formData);

        const result = await createSubSecction(formData, token);

        console.log(" create subsection api result -> ", result);

        if (result) {
            navigate("/dashboard/my-courses");
        }

    }







    return (
        <div className='h-auto flex flex-col '>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-y-3 pb-5'
            >

                {/* Chapters */}
                <div className='flex flex-col z-10 h-auto  '>
                    <label htmlFor="courseCategory">Course Chapters <sup>*</sup></label>
                    <select
                        id="courseChapter"
                        defaultValue=""
                        {...register("courseChapter", { required: true })}
                        className='rounded-[0.5rem]  bg-richblack-500 p-[12px] z-10  text-white text-center'
                    >
                        <option value="" disabled="" className='text-richblack-5  bg-richblack-700 '> Choose a chapter</option>


                        {

                            sections?.map((section, index) => (

                                <option key={index} value={section?._id} className=' text-richblack-5 h-auto  bg-richblack-700' >
                                    {
                                        section?.sectionName
                                    }

                                </option>

                            ))
                        }


                    </select>




                    {errors.courseCategory && (
                        <span>Course chapter is Required</span>
                    )
                    }

                </div>


                {/* Video Title */}
                <div className='flex flex-col'>
                    <label htmlFor="videoTitle" >Video Title <sup>*</sup></label>
                    <input

                        id='videoTitle'
                        placeholder='Enter video Title'
                        {...register("videoTitle", { required: true })}
                        className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                    />
                    {
                        errors.courseTitle && (
                            <span>Video Title is required</span>
                        )
                    }
                </div>

                {/*video */}
                <div className='flex flex-col'>
                    <label htmlFor="courseShortDesc">Video <sup>*</sup></label>
                    <input
                        type='file'
                        id="video"
                        placeholder="Upload your video"
                        accept="video/*"
                        {...register("video", { required: true })}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            // console.log("")
                            handleOnChange(e);
                            handleAddPreview(e);

                        }
                        }
                        className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center '
                    >


                        {
                            errors.thumbnail && (
                                <span>Thumbnail is required</span>
                            )
                        }
                    </input>
                    {/* {
                        image && (
                            <img src={imagePreview} alt="" />
                        )
                    } */}
                </div>

                {/* Video description */}
                <div className='flex flex-col'>
                    <label htmlFor="videoTitle" >Video Description <sup>*</sup></label>
                    <input

                        id='videoDescription'
                        placeholder='Enter video Description'
                        {...register("videoDescription", { required: true })}
                        className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                    />
                    {
                        errors.courseTitle && (
                            <span>Video Description is required</span>
                        )
                    }
                </div>

                <div className='mt-2'>
                    <IconButton text={"Save"} />
                </div>

            </form>

        </div>
    )
}

export default PublishCourse