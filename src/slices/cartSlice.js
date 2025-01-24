import { createSlice } from "@reduxjs/toolkit";
import toast, { Toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const course = action.payload
            console.log("Inside cart slice -> ", course);
            console.log("Initial state - ", initialState);
            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                // If course is already present in the cart then, do not moodify the quantity
                toast.error("Course is already present in cart");
                console.log("Cart -> ", cart)
                // state.cart.totalItems=2;
                return
            }
            // If the course is not present in the cart, add it to the cart
            state.cart.push(course);
            console.log("Cart -> ", cart)
            // update the total quantity and price
            state.totalItems++;
            state.total = state.total +  parseFloat(course.price);
            console.log("Total -> ", state.total, " Course price -> ", course.price);


            // update to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            // show toast
            toast.success("Course added to cart");
        },

        removeFromCart: (state, action) => {
            const courseId = action.payload;
            console.log("Course id in the slice -> ", courseId);
            console.log(cart);
            console.log("Initial state - ", initialState);

            const index = state.cart.findIndex((item) => item._id === courseId);
            console.log("Index is found at -> ", index);

            if (index >= 0) {
                // If the course is found in the cart, remove it
                // console.log(localStorage.getItem("cart"));

                console.log("Hello 1");
                state.totalItems--;
                console.log("Hello 2");
                state.total -= parseFloat(state.cart[index].price);
                console.log("Hello 3");
                state.cart.splice(index, 1);
                console.log("Hello 4");

                // console.log(state.cart);

                // update to local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                console.log(localStorage.getItem("cart"));

                // show toast
                toast.success("Item removed from the cart")
            }
        },

        resetCart: (state, action) => {
            state.total = 0;
            state.totalItems = 0;
            state.cart.splice(0, state.cart.length);

            // update to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        }

    }
});

export const { setTotalItems, addToCart, removeFromCart, resetCart, total, totalItems, cart } = cartSlice.actions;
export default cartSlice.reducer;