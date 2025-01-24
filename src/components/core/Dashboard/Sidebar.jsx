import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'
// import profileSlice from '../../../slices/profileSlice'
import SidebarLink from './SidebarLink'

const Sidebar = () => {

  const { user, profileLoading } = useSelector((state) => state.profile);
  console.log("Account type in sidebar -> ", user)
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  console.log("Confirmation modal", confirmationModal);

  const [hamburger, setHamburger] = useState(false);

  const clickHandler = () => {
    setHamburger(true);
  };

  if (profileLoading || loading) {
    return (
      <div className='mt-10 spinner'>
        Loading...
      </div>
    )
  }


  return (
    <div className="text-richblack-25 relative "
    // onClick={() => setConfirmationModal(null)} 
    >

      {/* normal */}
      <div className='hidden min-[1075px]:flex min-w-[222px] flex-col  borded-r-[1px] border-r-richblack-700  min-[1075px]:bg-richblack-800 py-10 rounded-br-lg mx-auto '>
        <div className='flex flex-row min-[1075px]:flex-col justify-center  flex-wrap '>
          {
            sidebarLinks?.map((link, index) => {
              if (link?.type && user?.accountType !== link?.type) return null;
              return (
                <SidebarLink link={link} iconName={link?.icon} key={link?.id} />
              )
            })
          }
        </div>

        <div className='mx-auto h-[1px] mt-6 mb-6 w-10/12 bg-richblack-600 flex justify-center items-center  '></div>

        <div className='flex flex-row min-[1075px]:flex-col  justify-center   mr-10 '>
          <SidebarLink
            link={{ name: "Settings", path: "settings" }}
            iconName="vscSettingsGear"
          />

          <button
            onClick={() => setConfirmationModal({
              text1: "Are you sure ?",
              text2: "You will be logged out of your Account",
              btn1Text: "Log out",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              // btn2Handle: () => setConfirmationModal(null)
            })}
            className='text-sm font-medium text-richblack-300'
          >
            <div className='flex min-[1075px]:ml-[3rem] gap-x-2 min-[1075px]:mt-[1rem] '>
              <VscSignOut className='text-lg' />
              <span>Log out</span>



            </div>
          </button>

          {/*        
            <button onClick={() => dispatch(logout(navigate))} className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-105">
              Log Out
            </button> */}




        </div>


        <div className='w-[80%]  mx-auto flex flex-col max-[1075px]:items-center  mt-5 '>

          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

          <div className='min-[1075px]:w-[80%] mx-auto mt-[1rem]'>
            {
              confirmationModal && (
                <div onClick={() => setConfirmationModal(null)} className=' cursor-pointer'>
                  Close
                </div>
              )
            }
          </div>

        </div>



      </div>


      {/* hamburger */}
      <div>
        {
          hamburger ?
            (<div className='mr-[1rem] mt-[1rem]  justify-center items-end  max-[1074px]:flex flex-col hidden'
            // onClick={clickHandler}
            >
              <div className='  rounded-lg'
               
              >
                {
                  sidebarLinks.map((link, index) => {
                    if (link.type && user.accountType !== link.type) return null;
                    return (
                      <SidebarLink link={link} iconName={link.icon} key={link.id}
                 
                      />
                    )
                  })
                }
              </div>

              <div className=''></div>

              <div className='flex justify-center items-center'>

                <div className='flex flex-col justify-center items-center mr-[1.75rem]'>

                  <SidebarLink
                    link={{ name: "Settings", path: "settings" }}
                    iconName="vscSettingsGear"
                  />

                  <div className=''>
                    <button
                      onClick={() => setConfirmationModal({
                        text1: "Are you sure ?",
                        text2: "You will be logged out of your Account",
                        btn1Text: "Log out",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        // btn2Handle: () => setConfirmationModal(null)
                      })}
                      className='text-sm font-medium text-richblack-300 flex  items-center  '
                    >
                      <div className='flex justify-center items-center mx-auto'>
                        <VscSignOut className='text-lg' />
                        <span>Log out</span>



                      </div>
                    </button>
                  </div>

                  {/*        
              <button onClick={() => dispatch(logout(navigate))} className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-105">
                Log Out
              </button> */}




                </div>
              </div>


              <div className=''>

                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

                <div className=''>
                  {
                    confirmationModal && (
                      <div onClick={() => setConfirmationModal(null)} className=' cursor-pointer z-20'>
                        Close
                      </div>
                    )
                  }
                </div>

              </div>



            </div>)
            :
            (<div className='mr-[1rem] mt-[1rem]  justify-center items-end  max-[1074px]:flex flex-col hidden'>
              <button
                onClick={clickHandler}
                className='cursor-pointer bg-richblack-800 px-[0.5rem] py-[0.5rem] rounded-lg '
              >
                <p > Quick Links</p>
              </button>
            </div>)
        }
      </div>

    </div>
  )
}

export default Sidebar
