import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingEndpoints } from "../api";




const { UPDATE_PROFILE_API } = settingEndpoints;

export async function updateProfile(data) {

    const { gender, dateOfBirth, contactNumber, about , userId } = data;
   

    const reqData = {};
    // console.log(" User -> ", user);
    console.log("Data to be updated -> ", data);

    let result;

    try {
        console.log("api call")
        const res = await apiConnector("PUT", UPDATE_PROFILE_API, data);

        if (!res) {
            throw new Error(res.data.message);
        }

        console.log("Response from updation -> ", res);

        result = res;

    } catch (e) {
        console.log("Error in updation api call -> ", e);
        // toast.error("Updation api error");
    }

    return result;

}