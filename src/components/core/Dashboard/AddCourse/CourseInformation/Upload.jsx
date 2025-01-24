import React, { useState, useEffect } from 'react'

const Upload = ({ name, label, register, errors, setValue, getValue }) => {

    const [image, setImage] = useState();

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect(() => {
        setValue(name, image);
        // console.log("Image -> ", image);
    }, [image])




    return (
        <div>

            <input
                type="file"
                id={name}
                multiple accept="image/*"
                // value={image}
                onChange={(e) => {
                    const file = e.target.files[0];
                    const urlImage = URL.createObjectURL(file)
                    setImage(urlImage)
                    console.log("Image -> ", urlImage);
                    console.log("Name -> ", name);

                }
                }
                className='rounded-[0.5rem] w-[100%] bg-richblack-500 p-[12px] text-white text-center mb-1'
            />


            {
                image && (
                    <img src={image} alt="No Image" />
                )
            }

        </div>
    )
}

export default Upload
