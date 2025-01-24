import React, { useEffect, useState } from 'react'

const UploadVideo = ({ name, label, register, errors, setValue, getValue, setVideoData, section,vide }) => {

    const [requirement, setRequirement] = useState();
    const [videoList, setVideoList] = useState([]);
    const [videoPreview, setVideoPreview] = useState([null]);
    const [video, setVideo] = useState();

    // console.log("Requirement -> ", requirement)
    // console.log("Requirement List -> ", requirementList, "List length -> ", requirementList.length)

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);
    // register is a function provided by the useForm hook. We can assign it to each input field so that the react-hook-form can track the changes for the input field value

    useEffect(() => {
        setValue(name, videoList)
    }, [videoList])

    const handleAddRequirement = () => {
        console.log("Video in add list -> ", video);
        // if (video) {
        setVideoList([...videoList, video]);

        // console.log("Video list -> ", requirementList);
        // const file = requirement;
        // // console.log("")
        // // const urlVideo = URL.createObjectURL(file);
        // // setImagePreview(urlImage);
        // // setImage(file);
        // setVideoPreview(file);

        // // console.log("Image file-> ", e.target.files);
        // // setRequirement("");
        const videoUrl = URL.createObjectURL(video);
        setVideoPreview([...videoPreview, videoUrl]);
        // setImage(file);

        console.log("video list-> ", videoList);
        // console.log("Name -> ", name);

        console.log("Video -> ", videoPreview);
        // }

        video(null);
    }

    const handleRemoveRequirement = (index) => {
        console.log("Index -> ", index);
        const updatedVideoList = [...videoList];
        const updatedVideoPreview = [...videoPreview]
        console.log("video list  -> ", updatedVideoList);
        updatedVideoList.splice(index, 1);
        updatedVideoPreview.splice(index, 1);
        console.log("updated video list -> ", updatedVideoList);
        setVideoPreview(updatedVideoPreview)
        setVideoList(updatedVideoList);
    }

    return (
       <div>
        
       </div>
    )
}

export default UploadVideo
