import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createSection } from '../../../../../services/operations/courseDetailsAPI';
import IconButton from '../../../../common/IconButton';
import RequirementField from '../../AddCourse/CourseInformation/RequirementField';
import { setCourse } from '../../../../../slices/courseSlice';

const Section = ({ setEditCourse }) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValue,
        formState: { errors }
    } = useForm();

    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth)


    const { course, step } = useSelector((state) => state.course)

    console.log("Course in step 2 -> ", course);

    const courseId = course._id;

    const submitHandler = async (data) => {

        console.log("Data of section -> ", data);



        const formData = new FormData();

        formData.append("sectionName", data.Sections);
        formData.append("courseId", courseId);

        // setLoading(true);
        console.log("Form Data -> ", formData);
        const result = await createSection(formData, token);
        console.log("Step 2 result -> ", result);
        // dispatch(setCourse(result));

        if (result) {
            // dispatch(setStep(3));
            dispatch(setCourse(result));
            console.log("Step in end of step 2 -> ", step);
            setEditCourse("");
            

        }

        // setLoading(false);

    }



    return (
        <div className='text-richblack-5'>

            {/* <p> Welcome in step 2</p> */}

            <form onSubmit={handleSubmit(submitHandler)}>

                {/* Section Name
                <div className='flex flex-col'>
                    <label htmlFor="sectionName" >Section Name <sup>*</sup></label>
                    <input

                        id='sectionName'
                        placeholder='Enter Section Name'
                        {...register("section", { required: true })}
                        className='rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
                    />
                    {
                        errors.courseTitle && (
                            <span>Section Name is required</span>
                        )
                    }
                </div> */}

                <RequirementField
                    name="Sections"
                    label="Chapters"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValue={getValue}
                />

                <IconButton
                    text={"Next"}
                />

            </form>

        </div>
    )
}

export default Section
