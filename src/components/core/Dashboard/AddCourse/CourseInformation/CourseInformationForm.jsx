import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BiUpload } from "react-icons/bi"

import IconButton from "../../../../common/IconButton"

import { COURSE_STATUS } from "../../../../../utils/constants"

import RequirementField from './RequirementField';
import Upload from './Upload';
import toast from 'react-hot-toast';
import { categories } from '../../../../../services/api';

import { setStep, setCourse, } from "../../../../../slices/courseSlice"
// import { useSelector } from 'react-redux';


const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const { step, course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const { token } = useSelector((state) => state.auth);



  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log("  Category -> ", categories);
      // if (categories.length > 0) {
      setCourseCategories(categories);
      // }
      setLoading(false);
      console.log(" Course Category -> ", courseCategories);
    }


    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTag", course.Tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();

  }, [categories]);

  const isFormUpdated = () => {
    const currentValues = getValue();
    if (currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category_.id ||
      currentValues.courseImage !== course.thumbnailImage ||
      currentValues.courseRequirements.toString() !== course.instructions.toString()) {
      return true;
    } else {
      return false;
    }
  }

  // handles next button click
  const onSubmit = async (data) => {

    // Edit the existing course
    if (editCourse) {
      if (isFormUpdated) {
        const currentValues = getValue();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("CourseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instruction", JSON.stringify(data.courseRequirements));
        }
        // Add tags and images/thumbnail


        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("No changes made so far");
      }
      return;
    }

    // create a new course
    console.log("Data for form -> ", data);
    // console.log("Image in form -> ", data.file[0]);

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    // thumbnail and tags are pending
    formData.append("thumbnailImage", data.thumbnail[0]);

    setLoading(true);

    console.log("Form Data -> ", formData);

    const result = await addCourseDetails(formData, token);

    console.log("Result -> ", result);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
      console.log("Course in step1 -> ", course, " Set step in step1 -> ", step);
    }
    setLoading(false);



  }


  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md border-richblack-700 p-6 space-y-8 pb-10  '
    >

      {/* Course Title */}
      <div className='flex flex-col'>
        <label htmlFor="courseTitle" >Course Title <sup>*</sup></label>
        <input

          id='courseTitle'
          placeholder='Enter course Title'
          {...register("courseTitle", { required: true })}
          className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
        />
        {
          errors.courseTitle && (
            <span>Course Title is required</span>
          )
        }
      </div>

      {/*Course Short  Description  */}
      <div className='flex flex-col'>
        <label htmlFor="courseShortDesc">Course Short Description <sup>*</sup></label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Decription"
          {...register("courseShortDesc", { required: true })}
          className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center min-h-[200px]'
        >
          {
            errors.courseShortDesc && (
              <span>Course Description is required</span>
            )
          }
        </textarea>
      </div>

      {/*Thumbnail */}
      <div className='flex flex-col'>
        <label htmlFor="courseShortDesc">Thumbnail <sup>*</sup></label>
        <input
          type='file'
          id="courseImage"
          placeholder="Upload your thumbnail"
          accept="image/*"
          {...register("thumbnail", { required: true })}
          onChange={(e) => {
            const file = e.target.files[0];
            // console.log("")
            const urlImage = URL.createObjectURL(file);
            setImagePreview(urlImage);
            setImage(file);

            console.log("Image file-> ", e.target.files);
            // console.log("Name -> ", name);

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
        {
          image && (
            <div className='mt-[1rem] rounded-xl flex justify-center bg-richblack-700 '>
              <img src={imagePreview} alt="" className='rounded-xl' />
            </div>
          )
        }
      </div>


      {/*Course Price */}
      <div className='flex flex-col '>
        <label htmlFor="coursePrice">Course Price <sup>*</sup></label>
        <div className='flex flex-row-reverse items-center gap-x-5'>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true
            })}
            className='rounded-[0.5rem] w-[100%] bg-richblack-500 p-[12px] text-white text-center'
          />
          <FaIndianRupeeSign className='' />
        </div>
        {
          errors.coursePrice && (
            <span>Enter Course Price</span>
          )
        }
      </div>

      {/* Course category */}
      <div className='flex flex-col z-10 h-auto  '>
        <label htmlFor="courseCategory">Course Category <sup>*</sup></label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className='rounded-[0.5rem]  bg-richblack-500 p-[12px] z-10  text-richblack-5 text-center '
        >
          <option value="" disabled="" className='text-richblack-5 border-b  bg-richblack-700 rounded-xl mt-[1rem] py-[1rem] '> Choose a category</option>


          {

            courseCategories?.map((category, index) => (

              <option key={index} value={category?._id} className=' text-richblack-5  bg-richblack-700 py-[1rem] rounded-[0.5rem]' >
                {
                  <p className='rounded-xl mt-[1rem] py-[1rem] '> {category?.name}</p>
                }

              </option>

            ))
          }


        </select>




        {errors.courseCategory && (
          <span>Course Category is Required</span>
        )
        }

      </div>

      {/* Create a custom component for handling tags input */}
      {/* <ChipInput
        label="Tags"
        name="courseTag"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValues={setValue}
        getValue={getValue}
      /> */}

      {/* create a component for uploading and showing preview of the course */}
      {/* <Upload
        name="thumbnailImage"
        label="CoursePreview"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValue}
      /> */}

      {/* Benefits of the course */}
      <div className='flex flex-col'>
        <label htmlFor="courseBenefits">Benefits of the course <sup>*</sup></label>
        <textarea
          id="courseBenefits"
          placeholder='Enter benefits of this course'
          {...register("courseBenefits", { required: true })}
          className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center min-h-[200px]'
        />
        {errors.courseBenefits && (
          <span>Benefits of course is required</span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Intructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValue}
      />

      <div>
        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className='flex items-center bg-richblack-300'
            >
              Continue without saving
            </button>
          )
        }

        <IconButton
          text={!editCourse ? "Next" : "Save Changes"}
        />

      </div>





    </form>

  )
}

export default CourseInformationForm
