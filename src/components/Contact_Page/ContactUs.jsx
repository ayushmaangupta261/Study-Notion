import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactUsEndpoint } from '../../services/api';
// import countrycode from "../../data/countrycode.json"



const ContactUs = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const submitContactForm = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactUsEndpoint.CONTACT_US_API, data);
            const response = { status: "OK" };
            console.log("Submit contact us res -> ", response);
            setLoading(false);
        } catch (e) {
            console.log("Error in the contact us");
            console.log(e);
            setLoading(false);
        }
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className=''>

            <div className='flex flex-col md:flex-row gap-y-10 md:gap-x-10 justify-center items-center text-center'>
                <div className='flex flex-col gap-y-10 justify-center items-center text-center'>
                    <div className="flex gap-5 justify-center items-center">
                        {/* First name */}
                        <div className="flex flex-col ">
                            <label htmlFor='firstname' className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name</label>
                            <input
                                type="text"
                                name='firstname'
                                id='firstname'
                                placeholder='Enter your First Name '
                                {...register("firstname", { required: true })}
                                className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblue-5  text-center"
                            />
                            {
                                errors.firstname && (
                                    <span>
                                        Please enter your name
                                    </span>
                                )
                            }
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label htmlFor='lastname' className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</label>
                            <input
                                type="text"
                                name='lastname'
                                id='lastname'
                                placeholder='Enter your Last Name '
                                {...register("lastname")}
                                className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblue-5  text-center"
                            />

                        </div>

                    </div>

                    {/* Email */}
                    <div className='flex flex-col justify-center items-center w-full'>
                        <label htmlFor="email" className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Enter your email please'
                            className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblue-5  text-center"
                            {
                            ...register("email", { required: true })
                            }
                        />
                        {
                            errors.email && (
                                <span>Please enter your email address</span>
                            )
                        }
                    </div>

                    {/* Mobile Number */}
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="phonenumber" className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Number</label>
                        <div className='flex '>
                            {/* dropdown */}
                            {/* <div className='flex flex-col gap-2 w-[80px]'>
                            <select name="dropdown" id="dropdown"
                                {...register("countrycode", { required: true })}
                                className='text-black  text-center'
                            >
                                {
                                    countrycode.map((element, index) => {
                                        return (
                                            <option key={index} value={element.name} className='text-black'>
                                                {element.dial_code}-{element.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div> */}

                            <div className='flex flex-col  '>{/* w-[calc(100%-80px)] */}
                                <input
                                    type="text"
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder='12345 67890'
                                    className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblue-5  text-center"
                                    {...register("phoneNo",
                                        {
                                            required: { value: true, message: "Please enter your mobile number" },
                                            maxLength: { value: 10, message: "Invalid obile number" },
                                            minLength: { value: 8, message: "Invalid mobile number" }
                                        })}

                                />
                                {
                                    errors.phoneNo && (
                                        <span>{errors.phoneNo.message}</span>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>

                {/* Message */}
                <div className='flex flex-col justify-center items-center  '>
                    <label htmlFor="message" className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message</label>
                    <textarea name="message" id="message" cols="52" rows="10" placeholder='Enter your message here'
                        {...register("message", { required: true })}
                        className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblue-5  text-center"
                    />
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }

                   

                </div>


            </div>
            
            <button type='submit' className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 ">
                        Send Message
                    </button>
        </form>
    )
}

export default ContactUs
