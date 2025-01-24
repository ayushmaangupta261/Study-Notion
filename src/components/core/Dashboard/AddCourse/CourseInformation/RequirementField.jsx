import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValue }) => {

    const [requirement, setRequirement] = useState();
    const [requirementList, setRequirementList] = useState([]);

    console.log("Requirement -> ", requirement)
    console.log("Requirement List -> ", requirementList, "List length -> ", requirementList.length)

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);
    // register is a function provided by the useForm hook. We can assign it to each input field so that the react-hook-form can track the changes for the input field value

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement ])
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div className='flex flex-col'>

            <label htmlFor={name}>{label} <sup>*</sup></label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='rounded-[0.5rem] w-[100%] bg-richblack-500 p-[12px] text-white text-center mb-1' 
                />
                <button
                    type='button'
                    onClick={() => handleAddRequirement()}
                    className='font-semibold text-yellow-50'
                >
                    Add
                </button>
            </div>

            <div className='bg-richblack-500 w-fit px-5 py-2 rounded-[0.5rem] mt-5 mb-5'>
            
                {
                    requirementList.length > 0 && (
                        <ul className='text-white flex flex-col mx-auto'>
                            {
                                requirementList.map((requirement, index) => (
                                    <li key={index} className="flex items-center text-richblack-5 justify-between ">
                                        <span>{requirement} </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveRequirement(index)}
                                            className='text-pink-50 ml-5'
                                        >
                                            clear
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>

            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}

export default RequirementField
