import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";
import { courseEndpoints } from "../api";
import { logout } from "./authAPI";
// 
const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API, PUT_COURSE_COMPLETE_API, GET_COMPLETED_COURSE } = profileEndpoints;
const { GET_ALL_INSTRUCTOR_COURSES } = courseEndpoints;

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    console.log("Going to fetch enrolled courses");
    let result = []

    try {
        console.log("Api call")
        const res = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, { Authorization: `Bearer ${token}` });
        console.log("GET USER ENROLLED API RESPONSE -> ", res);

        if (!res) {
            throw new Error(res.data.message);
        }

        result = res.data.data;

    } catch (e) {
        console.log("Error in profile api call -> ", e);
        toast.error("Profile api error");
        // return res.status(500).json({
        //     success: false,
        //     message: e.message,
        // });

    }
    toast.dismiss(toastId);
    console.log("Result -> ", result);
    return result;
}



export async function getInstructorData(token) {

    const toastId = toast.loading("Loading...");
    let result = [];

    try {

        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Get instructor data api response -> ", response);

        result = response?.data?.courses;

    } catch (e) {

        console.log("Get instructor details api error -> ", e);
        toast.error("Could not get instructor details");

    }

    toast.dismiss(toastId);
    return result;

}

export async function marLectureComplted(userId, subSectionId, courseId, token) {
    console.log("Inside api call -> ", courseId);
    let result;
    try {

        const res = await apiConnector("PUT", PUT_COURSE_COMPLETE_API, { userId, subSectionId, courseId },
            {
                Authorization: `Bearer ${token}`
            }
        );

        console.log("Api call response -> ", res);

        if (!res) {
            console.log("Error in api call");
        }

        result = res;

    } catch (e) {
        console.log(e);
    }

    return result;
}


export async function getAllInstructorCourses(token) {

    const toastId = toast.loading("Loading...");
    let result = [];

    console.log(" token -> ", token);

    try {

        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Get instructor data api response -> ", response);

        result = response?.data?.data?.courses;

        console.log("Result -> ", result);

        toast.success("Courses fetched successfully")

    } catch (e) {

        console.log("Get instructor details api error -> ", e);
        toast.error("Could not get instructor details");

    }

    toast.dismiss(toastId);
    return result;


}

export async function getCompletedCourse(token, courseId, userId) {
    const toastId = toast.loading("Fetching Completed Courses");
    let result = [];

    console.log(" token -> ", token);
    console.log(" user and course -> ", userId, courseId);

    try {

        const response = await apiConnector("POST", GET_COMPLETED_COURSE, { userId, courseId }, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Get completed course api response -> ", response);

        if (response) {
            result = response?.data?.data;
        }

        // console.log("Result -> ", result);

        toast.success("Courses fetched successfully")

    } catch (e) {

        console.log("Get completed course api error -> ", e);
        toast.error("Could not get instructor details");

    }

    toast.dismiss(toastId);
    return result;

}