const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth 
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}


// Profile Endpoint
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
    PUT_COURSE_COMPLETE_API: BASE_URL + "/profile/markCompleted",
    GET_COMPLETED_COURSE: BASE_URL + "/profile/completedLectures"
}


//Student endpoints
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SECCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}


// Course Endpoints
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategory",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES: BASE_URL + "/course/getIntructorCourse",
    DELETE_SECTION_API: BASE_URL + "/course/delteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    // LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    // LECTURE_COMPLETION_API: BASE_URL + "/course/markCompleted",
    CREATE_RATING_API: BASE_URL + "/course/creatingRating",

}



// Rating and Review
export const ratingEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/courses/getReviews",
}


// Categories 
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategory",
}

// catalog page data
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/categoryPageDeatils"// this must be here
    // CATALOGPAGEDATA_API: BASE_URL + "/course/showAllCategory", // not this one

}


// Contact Us
export const contactUsEndpoint = {
    // CONTACT_US_API: BASE_URL + "/reach/contact",
}


// Settings
export const settingEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPictur",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
} 