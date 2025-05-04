import React, { useEffect, useRef, useState } from 'react'
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import 'video-react/dist/video-react.css'; // import css
import { Player } from 'video-react';
import { AiFillPlayCircle } from "react-icons/ai"
import IconButton from '../../common/IconButton';


const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //   const setVideoSpecificDetails = async () => {
  //     if (!courseSectionData.length) {
  //       return;
  //     }
  //     if (!courseId && !sectionId && !subSectionId) {
  //       navigate("/dashboard/enrolled-courses");
  //     }
  //     else {
  //       // lets assume ki all 3 fields are present
  //       const filterData = courseSectionData.filter(
  //         (course) => course._id === sectionId
  //       );

  //       const fiterVideoData = filterData?.[0].subSection.filter(
  //         (data) => data._id === subSectionId
  //       );

  //       setVideoData(fiterVideoData);
  //       setVideoEnded(false);
  //     }
  //   }
  //   setVideoSpecificDetails();
  // }, [courseSectionData, courseEntireData, location.pathname]);


  // const isFirstVideo = () => {

  //   const currentSectionIndex = courseSectionData.findIndex(
  //     (data) => data._id === sectionId
  //   );
  //   const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
  //     (data) => data._id === subSectionId
  //   );

  //   if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  // const isLastVideo = (data) => {

  //   const currentSectionIndex = courseSectionData.findIndex(
  //     (data) = data?._id === sectionId
  //   );
  //   const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsectionId.findIndex(
  //     (data) => data._id === subSectionId
  //   );

  //   if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === totalNoOfLectures - 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  // const goToNextVideo = (data) => {

  //   const currentSectionIndex = courseSectionData.findIndex(
  //     (data) = data._id === sectionId
  //   );

  //   const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

  //   const curentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
  //     (data) => data._id === subSection
  //   )

  //   if (currentSectionIndex !== noOfSubSections - 1) {
  //     // Next video of the same sub-section 
  //     const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
  //     // got to the video
  //     navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
  //   } else {
  //     // 1st video of next section
  //     const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
  //     const nextSubSection = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
  //     // goto this video
  //     navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSection}`);
  //   }

  // }

  // const goToPrevVideo = (data) => {
  //   const currentSectionIndex = courseSectionData.findIndex(
  //     (data) = data._id === sectionId
  //   );

  //   const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

  //   const curentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
  //     (data) => data._id === subSection
  //   )

  //   if (currentSectionIndex !== noOfSubSections - 1) {
  //     // previous video of the same sub-section 
  //     const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
  //     // got to the video
  //     navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
  //   } else {
  //     // 1st video of next section
  //     const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
  //     const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
  //     const prevSubSection = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
  //     // goto this video
  //     navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSection}`);
  //   }
  // }

  // const handleLectureCompletion = async () => {
  //   // dummy code, replace in future
  //   setLoading(true);

  //   const res = await markLectureAsCompleted({ courseId: courseId, subSectionId: subSectionId }, token);

  //   //state updation
  //   if (res) {
  //     dispatch(updateCompletedLectures(subSectionId));
  //   }

  //   setLoading(false);
  // }


  return (
    // <div>
    //   {
    //     !videoData ?
    //       (<div>No Data Found</div>)
    //       :
    //       (
    //         <Player
    //           ref={playerRef}
    //           aspectratio="16:9"
    //           palysInline
    //           onEnded={() => setVideoEnded(true)}
    //           src={videoData?.videoUrl}
    //         >

    //           <AiFillPlayCircle />

    //           {
    //             videoEnded && (
    //               <div>
    //                 {
    //                   !completedLectures.includes(subSectionId) && (
    //                     <IconButton
    //                       disabled={loading}
    //                       onClick={() => handleLectureCompletion()}
    //                       text={!loading ? "Mark as completed" : "Loading..."}
    //                     />
    //                   )
    //                 }

    //                 <IconButton
    //                   disabled={loading}
    //                   onClick={() => {
    //                     if (playerRef?.current) {
    //                       playerRef.current?.seek(0);
    //                       setVideoEnded(false);
    //                     }
    //                   }}
    //                   text="Rewatch"
    //                 />

    //                 <div>
    //                   {!isFirstVideo() && (
    //                     <button
    //                       disabled={landing}
    //                       onClick={goToPrevVideo}
    //                     >
    //                       Prev
    //                     </button>
    //                   )}
    //                   {!isLastVideo() && (
    //                     <button
    //                       disabled={landing}
    //                       onClick={goToNextVideo}
    //                     >
    //                       Next
    //                     </button>
    //                   )}
    //                 </div>

    //               </div>
    //             )
    //           }

    //         </Player>
    //       )
    //   }

    //   <h1>{videoData?.title}</h1>
    //   <p>{videoData?.Description}</p>

    // </div>

    <div>
      <p>Video Details</p>
    </div>

  )
}

export default VideoDetails
