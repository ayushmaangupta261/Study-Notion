import { toast } from "react-hot-toast"

import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { setLoading } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../api"
import { ACCOUNT_TYPE } from "../../utils/constants"


const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    
} = courseEndpoints

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        if (!response?.data?.success) {
            throw new Error("Could not fetch course category");
        }
        result = response?.data?.data;

    } catch (e) {
        console.log("GET ALL COURSE API Error -> ", e);
        toast.error(e.message);
        return result;
    }

    toast.dismiss(toastId);
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    let result = [];
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId })
        console.log("Response from fetch course details -> ", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
        console.log("result in  - ", result);
    } catch (e) {
        console.log("Course details api error -> ", e);
        result = e.message;

    }

    toast.dismiss(toastId);
    return result;


}

// fetch the available course category
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE CATEGORY API -> ", response);
        if (!response?.data?.success) {
            throw new Error("Could not get course categories");
        }
        result = response?.data?.data;
        console.log("API call result for get all course -> ", result)
    } catch (e) {
        console.log("Course category api error -> ", e);
        toast.error(e.message);
    }
    return result;
}

// add course details
export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "Video/form-data",
            Authorization: `Bearer ${token}`
        });
        console.log("Create course api response -> ", response);
        if (!response?.data?.success) {
            throw new Error("Could not add course details");
        }
        toast.success("Course Details Added successfully...");
        result = response?.data?.data;
    } catch (e) {
        console.log("Create course api -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result
}

// edit course details
export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "Video/form-data",
            Authorisation: `Bearer ${token}`
        });
        console.log("Edit course api response -> ", response);
        if (!response?.data?.success) {
            throw new Error("Could not update course details...");
        }
        toast.success("Course eddited successfully ");
        result = response?.data?.data;
    } catch (e) {
        console.log("Edit course error -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create sections
export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("Create Section response -> ", response);

        if (!response?.data?.success) {
            throw new Error("Error in the creating section");
        }
        toast.success("Course section created successfully");
        result = response?.data?.data;
    } catch (e) {
        console.log("Error in creating the course", e);
        toast.error("Unable to create the section");
    }

    toast.dismiss(toastId);
    return result;
}

// create sub section
export const createSubSecction = async (data, token) => {
    let result = null;
    console.log("MAking the api call -> ", data);
    const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("Create sub section response -> ", response);
        if (!response?.data?.success) {
            throw new Error("Error in creating sub section");
        }
        toast.success("Lecture created successfully");
        result = response?.data?.success;
    } catch (e) {
        console.log("Create subsection api error -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update section
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("Update section api  response -> ", response);

        if (!response?.data?.success) {
            throw new Error("Could not update section");
        }
        toast.success("Course section updated");
        result = response?.data?.data;

    } catch (e) {
        console.log("Updated section api error -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update sub section
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("Update sub section api response -> ", response);

        if (!response?.data?.success) {
            throw new Error("Could not update lectures");
        }
        toast.success("Course subsection updated");
        result = response?.data?.data;

    } catch (e) {
        console.log("Update subs section api error -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update delete section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("Delete section api response -> ", response);

        if (!response?.data?.success) {
            throw new Error("Could not delete section");
        }
        toast.success("Section deleted");
        result = response?.data?.data;

    } catch (e) {
        console.log("Delete section api error -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update delete section
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("Delete sub section api response -> ", response);

        if (!response?.data?.success) {
            throw new Error("Could not delete sub section");
        }
        toast.success("sub section deleted");
        result = response?.data?.data;

    } catch (e) {
        console.log("Delete sub section api error -> ", e);
        toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}

// mark lecture as complete
export const markLectureAsCompleted = async (userId, videoId, token) => {
    let result = null;
    console.log("mark complete data ", userId, videoId);
    console.log("Token -> ", token);
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("PUT", LECTURE_COMPLETION_API, { videoId, userId },
            {
                Authorization: `Bearer ${token}`
            }
        );

        console.log("Mark lecture as completed api response ", response);

        if (!response.data.message) {
            throw new Error(response.data.error);
        }
        toast.success("Lecture Completed");
        result = true;
    } catch (e) {
        console.log("Mark lecture completed api response error ", e);
        toast.error(e.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}


export const createRating = async (data, token) => {

}









// TODO: remaining all the stuffs