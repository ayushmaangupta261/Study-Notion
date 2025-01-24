import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from "../components/core/Dashboard/Sidebar"
import MyProfile from '../components/core/Dashboard/MyProfile';

const Dashboard = () => {

    const { authLoading } = useSelector((state) => state.auth);
    const { profilrLoading } = useSelector((state) => state.profile);

    if (profilrLoading || authLoading) {
        <div class="spinner text-xl font-semibold">
            Loading...
        </div>
    }


    return (
        <div className=' flex flex-col min-[1075px]:flex-row overflow-y-auto w-screen justify-center max-[1075px]:items-center h-full pb-[5rem]'>
            <div className='z-10 w-full min-[1075px]:w-[10%]'>
            <Sidebar />
            </div>
            
            <div className='  pb-[100px] w-full min-[860px]:w-[90%]  flex justify-center min-[860px]:justify-start '>
                <div className=' w-[100vw]  py-10 flex flex-col items-center  '>
                    <Outlet />
                    {/* <MyProfile/> */}

                </div>

            </div>
        </div>
    )
}

export default Dashboard
