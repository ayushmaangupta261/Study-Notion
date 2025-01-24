import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard } from 'react-icons/vsc';
import { AiOutlineCaretDown } from 'react-icons/ai';

const ProfileDropDown = () => {

  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button className='relative' onClick={() => setOpen(true)}>
      <div className='flex items-center gap-x-1 w-[100%]  px-[1rem] py-[0.75rem] bg-richblack-700 rounded-lg'>
        <img src={user?.image} alt={`profile-${user?.firstName}`} className='rounded-lg' />
        <AiOutlineCaretDown className=" text-richblack-5 z-10" />
      </div>
      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className='absolute md:top-[118%] md:right-0 -right-[1.7rem]  z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-800 mt-[1.5rem]'
            ref={ref}
          >
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className='flex w-full items-center mt- gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-800  bg-richblack-700 duration-200 tarsition-all '>
                <VscDashboard className='text-lg' />
                Dashboard
              </div>
            </Link>

            <div className='w-full bg-richblack-800 h-[2px]'>
           </div>

            <div
              className=' w-full flex items-center justify-center py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-800  bg-richblack-700 duration-200 tarsition-all '
              onClick={() => setOpen(false)}
            >
              Close
            </div>

          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown
