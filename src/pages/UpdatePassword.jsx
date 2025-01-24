import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';



const UpdatePassword = () => {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        newpassword: "",
        confirmNewPassword: ""
    });

    const handleOnChange = (e) => {
        // const name = e.taget.name;
        // const value = e.target.value;
        // console.log("Name -> ", name, "Value -> ", value);
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
        console.log("Form data -> ", formData)
    }

    // console.log("Form data -> ", formData.password, formData.confirmPassword);
    // const { password, confirmPassword } = formData;

    const handleOnSubmit = (e) => {

        e.preventDefault();

        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(formData.newPassword, formData.confirmNewPassword, token));
    }


    return (
        <div className='text-white'>
            {
                loading ?
                    (<div class="bar">
                        <div class="ball"></div>
                    </div>)
                    :
                    (
                        <div>
                            <h1>Create a new Password</h1>
                            <p>Almost done... Enter your new password and your are all set.</p>
                            <form onSubmit={handleOnSubmit} className=''>

                                <label >
                                    <p>New Password <sup>*</sup></p>
                                    <input
                                        required
                                        type={showNewPassword ? "text" : "password"}
                                        value={formData.newPassword}
                                        name='newPassword'
                                        onChange={handleOnChange}
                                        placeholder='Enter your new password'
                                        className='w-full p-6 bg-richblack-600 text-richblack-5'
                                    />
                                    <span onClick={() => setShowNewPassword((prev) => !prev)}>
                                        {
                                            showNewPassword ?
                                                (<AiFillEyeInvisible fontSize={24} />)
                                                : (<AiFillEye fontSize={24} />)
                                        }
                                    </span>
                                </label>


                                <label >
                                    <p>Confirm New Password <sup>*</sup></p>
                                    <input
                                        required
                                        type={showConfirmNewPassword ? "text" : "password"}
                                        name="confirmNewPassword"
                                        value={formData.confirmNewPassword}
                                        onChange={handleOnChange}
                                        placeholder='Confirm your new password'
                                        className='w-full p-6 bg-richblack-600 text-richblack-5'
                                    />
                                    <span onClick={() => setShowConfirmNewPassword((prev) => !prev)}>
                                        {
                                            showConfirmNewPassword ?
                                                (<AiFillEyeInvisible fontSize={24} />)
                                                : (<AiFillEye fontSize={24} />)
                                        }
                                    </span>
                                </label>

                                <button type='submit'>
                                    Reset Password
                                </button>

                            </form>

                            <div>
                                <Link to="/login">
                                    <p>Back to login</p>
                                </Link>
                            </div>

                        </div>
                    )
            }
        </div>
    )
}

export default UpdatePassword
