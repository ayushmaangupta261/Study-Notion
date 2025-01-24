import React from 'react'
import toast, { Toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import { catalogData } from '../api';


const PageAndComponentData = async (categoryId) => {

    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        console.log("Inside page and componenets ->", categoryId)
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
            { categoryId: categoryId }
        );
        console.log("Page and component api call done -> ", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch category page details")
        }

         result = response?.data;
        console.log("Result at page and component -> ", result)
        toast.success("Data fetched successfully");

    } catch (e) {
        console.log("Catalog page data api error...", e);
        toast.error(e.message);
        result = e.response?.data;
    }
    toast.dismiss(toastId);
    return result
}

export default PageAndComponentData;
