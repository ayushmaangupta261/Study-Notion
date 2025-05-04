
import './App.css';
import { Route, Routes } from 'react-router-dom';
import OpenRoute from './components/core/Auth/OpenRoute';
import Home from "./pages/Home";
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error"
import Setting from './components/core/Extras/Setting';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './components/core/Dashboard/AddCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';
import InstructorCourses from './components/core/Dashboard/InstructorDashboard/InstructorCourses';
// import { useSelector } from 'react-redux';

import CourseBuilderForm from './components/core/Dashboard/AddCourse/CourseBuilder/CourseBuilderForm';
import EditCourse from './components/core/Dashboard/InstructorDashboard/EditCourse/EditCourse';
import CourseOverview from './components/core/ViewCourse/PlayBack/CourseOverview';
import VideoPlayBack from './components/core/ViewCourse/PlayBack/VideoPlayBack';




function App() {

  // const {user} = useSelector((state)=>state.a)
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <div className="w-screen h-full bg-richblack-900 flex flex-col font-inter ">

      {/* Start */}
      <Navbar />

      
      
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path='courses/:courseId' element={<CourseDetails />} />

        <Route path='catalog/:catalogName' element={<Catalog />} />




        <Route path='signup'
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />

        <Route path='login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }>
        </Route>

        <Route path='forgot-password'
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }>
        </Route>



        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        <Route path="/reset-password/:id" element={<UpdatePassword />} />
        <Route path='/verify-email' element={<VerifyEmail />}></Route>
        <Route path='/about' element={<About />}></Route>


        {/* <Route path='/verify-password' element={<VerifyPassword />}></Route> */}

        <Route
          path='dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="/dashboard/settings" element={<Setting />}></Route>


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />}></Route>
                <Route path="/dashboard/cart" element={<Cart />}></Route>
                <Route path='/dashboard/courseOverview' element={<CourseOverview />} ></Route>
                <Route path='/dashboard/courseVideo' element={<VideoPlayBack />} ></Route>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />}></Route>
                <Route path="/dashboard/buildCourse" element={<CourseBuilderForm />}></Route>
                <Route path='/dashboard/instructor' element={<Instructor />} ></Route>
                <Route path='/dashboard/:courseId' element={<EditCourse />} />

                {/* <Route path='/dashboard/instructorCourses' element={<InstructorCourses />}></Route> */}

                <Route path='/dashboard/my-courses' element={<InstructorCourses />} ></Route>

                


                {/* <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} ></Route>  */}
              </>
            )
          }


        </Route>



        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='view-course/:courseId/section/:sectionId/sub-section/:subsectionId' element={<VideoDetails />} />
              </>
            )

          }
        </Route>



        <Route path='*' element={<Error />}></Route>


      </Routes>

    </div >
  );
}

export default App;












