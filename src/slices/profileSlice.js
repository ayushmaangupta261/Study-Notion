// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//     profileLoading: false,
// };

// const profileSlice = createSlice({
//     name: "profile",
//     initialState: initialState,
//     reducers: {
//         setUser(state, value) {
//             state.user = value.payload;
//         },
//         setProfileLoading(state, value) {
//             state.loading = value.payload
//         }
//     },
// });

// export const { setUser,  setProfileLoading, user } = profileSlice.actions;
// export default profileSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

// Function to save user data to localStorage
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  profileLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      // Save user data to localStorage whenever it changes
      saveUserToLocalStorage(action.payload);
    },
    setProfileLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setProfileLoading } = profileSlice.actions;
export default profileSlice.reducer;