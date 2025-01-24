import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
};

// Load the course state from localStorage if available
const savedCourseState = JSON.parse(localStorage.getItem("courseState"));
const initialCourseState = savedCourseState ? savedCourseState : initialState;

const courseSlice = createSlice({
    name: "course",
    initialState: initialCourseState,
    reducers: {
        setStep(state, action) {
            state.step = action.payload;
        },
        setCourse(state, action) {
            state.course = action.payload;
            // Save the updated course state to localStorage
            localStorage.setItem("courseState", JSON.stringify(state));
        },
        setEditCourse(state, action) {
            state.editCourse = action.payload;
            // Save the updated course state to localStorage
            localStorage.setItem("courseState", JSON.stringify(state));
        },
        setPaymentLoading(state, action) {
            state.paymentLoading = action.payload;
            // Save the updated course state to localStorage
            localStorage.setItem("courseState", JSON.stringify(state));
        },
        resetCourseState(state) {
            state.step = 1;
            state.course = null;
            state.editCourse = false;
            // Save the updated course state to localStorage
            localStorage.setItem("courseState", JSON.stringify(state));
        },
    },
});

export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    resetCourseState,
} = courseSlice.actions;

export const selectCourse = (state) => state.course;

export default courseSlice.reducer;
