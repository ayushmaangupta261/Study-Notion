import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    console.log("user ->", user)
    const navigate = useNavigate();


    return (
        <div className='flex flex-col   text-richblack-5  w-[60%] h-[100vh] pb-[10rem]'>
          
        {
            user ? 
            (  <div  className='flex flex-col   text-richblack-5  '>
            <h1 className='text-3xl text-richblack-5 mb-10  max-[860px]:text-center'>My Profile</h1>
              {/* Section 1 */}
              <div className='flex justify-between px-10 py-10  rounded-lg bg-richblack-700 mb-5 min-h-[150px] '>
                  <div className='flex flex-col max-[775px]:gap-y-5 min-[775px]:flex-row justify-between items-center w-[100%]  '>
                      <div className='flex flex-col min-[740px]:flex-row justify-center items-center gap-x-5 max-[740px]:gap-y-5'>
                          <img src={user?.image} alt={`profile:-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover' />
                          <div>
                              <p className='text-lg text-richblack-5 max-[740px]:text-center'>{user?.firstName + " " + user?.lastName}</p>
                              <p className='text-sm text-richblack-5'>{user?.email}</p>
                          </div>
                      </div>
                      {/* <IconButton
                      text="Edit"
                      onClick={() =>
                          navigate("/dashboard/settings")
                      }
                  > </IconButton> */}
                  </div>
  
  
  
              </div>
  
              {/* Section 2 */}
              <div className='flex flex-col justify-center items-center px-10 py-10  rounded-lg bg-richblack-700 mb-5 w-[100%]'>
                  <div className='flex  items-center gap-x-5 mb-5 '>
                      <div className='flex flex-col justify-center items-center'>
                          <p className='text-lg text-richblack-5 mb-5 text-center'>About</p>
                          <p className='text-sm text-richblack-5 text-center'>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
                      </div>
  
                  </div>
                  {/* <IconButton
                      text="Edit"
                      onClick={() => {
                          navigate("/dashboard/settings")
                      }}
                  /> */}
              </div>
  
              {/* Section 3 */}
              <div className='flex flex-col justify-center items-center  px-10 py-10  rounded-lg bg-richblack-700 mb-5'>
                  <div className='flex flex-col items-center  mb-5 w-[100%] '>
                      <p className='text-lg text-richblack-5 mb-5 mx-auto text-center'>Personal Details</p>
                      <div className='flex flex-col w-[80%] max-[650px]:gap-y-5 '>
                          <div className='flex  max-[650px]:flex-col flex-row max-[650px]:mx-auto min-[650px]:justify-between text-center '>
                              <p className='text-md text-richblack-5'>Name: </p>
                              <p className='text-sm text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                          </div>
  
                          <div className='flex  max-[650px]:flex-col flex-row max-[650px]:mx-auto min-[650px]:justify-between text-center '>
                              <p className='text-md text-richblack-5'> Gender: </p>
                              <p className='text-sm text-richblack-5'> {user?.additionalDetails?.gender ?? "Add your gender"}</p>
                          </div>
                          <div className='flex  max-[650px]:flex-col flex-row max-[650px]:mx-auto min-[650px]:justify-between text-center'>
                              <p className='text-md text-richblack-5'> Contact: </p>
                              <p className='text-sm text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                          </div>
                          <div className='flex  max-[650px]:flex-col flex-row max-[650px]:mx-auto min-[650px]:justify-between text-center'>
                              <p className='text-md text-richblack-5'> Date of Birth: </p>
                              <p className='text-sm text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
                          </div>
                          <div className='flex  max-[750px]:flex-col flex-row min-[750px]:justify-between  items-center'>
                              <p className='text-md text-richblack-5 '> Email: </p>
                              <p className='text-sm text-richblack-5 '>{user?.email}</p>
                          </div>
                      </div>
  
                  </div>
                  <div>
                      <button
                          onClick={() => {
                              navigate("/dashboard/settings")
                          }}
                          className='cursor-pointer text-lg bg-yellow-25 px-5 py-2 text-black rounded-xl  hover:scale-95 duration-200 transition-all '
                      >Edit
                      </button>
                  </div>
              </div>
            </div>)
            :
            (<div className='mx-auto my-auto'>
              <p className='text-3xl '>  Please Wait...</p>
            </div>)
        }


        </div>
    )
}

export default MyProfile
