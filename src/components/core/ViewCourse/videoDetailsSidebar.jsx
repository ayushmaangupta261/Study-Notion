import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../common/IconButton';

const videoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveSatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const [sectionId, setSectionId] = useParams();
    const location = useLocation();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        // set active flag 
        ; (() => {
            if (!courseSectionData.length) {
                return;
            }
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data_.id === subSectionId
            );

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            // set current section 
            setActiveSatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current sub section 
            setVideoBarActive(activeSubSectionId);

        })()
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div>
                {/* for button and heading */}
                <div>
                    {/* for buttons */}
                    <div>
                        <div onClick={() => { navigate("/dashboard/enrolled-courses") }}>
                            Back
                        </div>

                        <div>
                            <IconButton
                                text="Add Review"
                                onclick={() => setReviewModal(true)} />
                        </div>

                    </div>


                    {/* for headings or title */}
                    <div>
                        <p>{courseEntireData.courseName}</p>
                        <p>{completedLectures.length}</p>
                    </div>



                </div>

                {/* for sections and sebsections */}
                <div>
                    {
                        courseSectionData.map((section, index) => {
                            <div onClick={() => setActiveSatus(section?._id)} key={index}>

                                {/* section */}
                                <div>
                                    <div>
                                        {section?.sectionName}
                                    </div>
                                    {/* Add arrow icon and handle rotate functionality */}
                                </div>

                                {/* subsections  */}
                                <div>
                                    {
                                        activeStatus === section?._id && (
                                            <div> {
                                                section.subSection.map((topic, index) => (
                                                    <div className={`flex gap-5 p-5 ${videoBarActive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-richblack-5"}`}
                                                        key={index}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/subsection/${topic?._id}`)
                                                            setVideoBarActive(topic?._id)
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={completedLectures.includes(topic?._id)}
                                                            onChange={() => { }}
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }</div>
                                        )
                                    }
                                </div>


                            </div>
                        })
                    }
                </div>


            </div>
        </>
    )
}

export default videoDetailsSidebar
