import React, { useState } from 'react'
import { updateProfile } from '../../../services/operations/settings';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../../../slices/profileSlice';
import { useDispatch } from 'react-redux';

const Setting = () => {

  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    about: "",
    constactNumber: "",
    gender: ""
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    console.log(formData);



  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Going to update the data");

    var userId = user._id;
    console.log("User in settings jsx -> ", user._id);


    try {
      const res = await updateProfile({ formData, userId });

      console.log("Res from update  profile -> ", res);

      if (res.data.success) {
        const reset = res.data.updatedUserDetails;
        console.log(reset);
        dispatch(setUser(res.data.updatedUserDetails));
        navigate("/dashboard/my-profile");
      }



    } catch (error) {
      console.log("Unable to updat the data -> ", error);
    }

  }


  return (



    <div className='text-richblack-5 h-auto w-full flex flex-col justify-center items-center gap-y-[3rem]'>

      <p className='text-4xl'>Settings</p>

      <div className='md:w-[50%] w-[80%]'>

        <form onSubmit={submitHandler}
          className='w-full flex flex-col gap-y-[1rem]'
        >

          {/* DOB */}
          <div className=''>
            <label htmlFor="">
              <p>DOB</p>

              <input
                type="date"
                name='dateOfBirth'
                onChange={changeHandler}
                placeholder='DOB'
                value={formData.dateOfBirth}

                className=' w-[100%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
              />

            </label>

          </div>

          {/* about */}
          <div>
            <label htmlFor="">
              <p>About</p>

              <input
                type="text"
                name='about'
                onChange={changeHandler}
                placeholder='about'
                value={formData.about}

                className=' w-[100%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
              />

            </label>


          </div>

          {/* gender */}
          <div>
            <label htmlFor="">
              <p>Gender</p>

              <input
                type="text"
                name='gender'
                onChange={changeHandler}
                placeholder='gender'
                value={formData.gender}

                className=' w-[100%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
              />

            </label>


          </div>

          {/* contact */}
          <div>
            <label htmlFor="">
              <p>Contact</p>

              <input
                type="number"
                name='contactNumber'
                onChange={changeHandler}
                placeholder='contact'
                value={formData.contactNumber}

                className=' w-[100%] rounded-[0.5rem] bg-richblack-500 p-[12px] text-white text-center'
              />

            </label>


          </div>

      

      <div className='w-[97%] mt-5'>
        <button
          type="submit"
          className=' mt-[30px]  bg-yellow-50 text-black rounded-[8px] font-medium w-[100%] px-[12px] py-[8px] '>Update Account</button>
      </div>

    </form>

      </div >

    </div >
  )
}

export default Setting
