import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {getInstructorData} from "../../../../services/operations/profileapi"
import InstructorChart from './InstructorChart';

import { Link } from 'react-router-dom';
// import crea

const Instructor = () => {

    const { token } = useSelector((state) => state.auth);
    const user = useSelector((state => state.profile));
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const getCourseWithStats = async () => {

            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            // const result = await fetchInstructorCourses(token);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }

            // if (result) {
            //     setCourses(result);
            // }

            setLoading(false);

        }

        getCourseWithStats();

    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);




    return (
        <div>

            <div>
                <h1>Hi {user?.firstName}</h1>
                <p>Let's start something new</p>
            </div>

            {
                loading ?
                    (<div className='spinner'>Loading</div>)
                    :
                    (
                        courses.length > 0 ?
                            (
                                <div>

                                    <div>
                                        <div>
                                            <InstructorChart courses={user} />

                                            <div>

                                                <p>Statistics</p>

                                                <div>
                                                    <p>Total Courses</p>
                                                    <p>{courses.length}</p>
                                                </div>

                                                <div>
                                                    <p>Total Students</p>
                                                    <p>{totalStudents}</p>
                                                </div>

                                                <div>
                                                    <p>Total Income</p>
                                                    <p>{totalAmount}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* render the courses */}
                                    <div>
                                        {/* render 3 courses */}
                                        <div>
                                            <p>Your Courses</p>
                                            <Link to="/dashboard/my-courses">
                                                <p>view all</p>
                                            </Link>
                                        </div>

                                        <div>
                                            {
                                                courses.slice(0, 3).map((course) => {
                                                    <div>
                                                        <img src={course.thumbnail} alt="" />
                                                        <div>
                                                            <p>{course.courseName}</p>
                                                            <div>
                                                                <p>Students Enrolled : {course.studentsEnrolled.length}</p>
                                                                <p>|</p>
                                                                <p>Rs {course.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>


                                    </div>


                                </div>
                            )
                            :
                            (<div>
                                <p>You don't have created any courses yet</p>
                                <Link to={"/dashboard/addCourse"}>
                                    Create a Course
                                </Link>
                            </div>)
                    )
            }

        </div>
    )
}

export default Instructor
