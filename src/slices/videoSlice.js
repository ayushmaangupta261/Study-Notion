import { Slice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    courseVideo: "",
    viewMore: false,
    completedVideo: [],
    isCompleted:false
}

const videoSlice = createSlice({
    name: "video",
    initialState: initialstate,
    reducers: {
        setCourseVideo(state, action) {
            state.courseVideo = action.payload
        },
        setViewMore(state, action) {
            state.viewMore = action.payload
        },
        setCompletedVideo(state, action) {
            state.completedVideo = action.payload
        },
        setIsCompleted(state, action) {
            state.isCompleted = action.payload
        },


    }
});

export const {
    setCompletedVideo,
    completedVideo,
    setCourseVideo,
    courseVideo,
    viewMore,
    setViewMore,
    videoId,
    setVideoId,
    setIsCompleted,
    isCompleted
} = videoSlice.actions

export default videoSlice.reducer;