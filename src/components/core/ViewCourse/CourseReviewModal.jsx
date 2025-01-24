import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import IconButton from "../../common/IconButton"

import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({ setReviewModal }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    useEffect(() => {
        setValue("Course Experience ", "");
        setValue("CourseRating", 0);
    }, []);

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperince
            },
            token
        );
        setReviewModal(false);
    }

    return (
        <div>
            <div>
                {/* Modal Header  */}
                <div>
                    <p>Add Review</p>
                    <button onClick={setReviewModal(false)}>close</button>
                </div>

                {/* modal body */}
                <div>
                    <div>
                        <img src={user?.image} alt="User Image" className='aspect-square w-[50px] rounded-full object-cover' />
                        <div>
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p>Posting Publicly</p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'
                    >

                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <div>
                            <label htmlFor="courseExperience">
                                Write about your Experience
                            </label>
                            <textarea
                                id="courseExperince"
                                placeholder='Add your experience here'
                                {...register("courseExperience", { required: true })}
                            ></textarea>
                            {
                                errors.courseExperince && (
                                    <span>Please add Your Experience</span>
                                )
                            }
                        </div>

                        {/* cancel and save */}
                        <div>
                            <button onClick={() => setReviewModal(false)}> Cancel </button>

                            <IconButton text="save" onclick={() => setReviewModal(false)}  />
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default CourseReviewModal
