import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({ modalData }) => {
    console.log("Modal data -> ", modalData.btn1Handler)
    return (
        <div className='bg-richblack-700 px-3 rounded-xl py-3 mt-2 text-sm flex flex-col  justify-center gap-y-2 max-w-[17rem] max-[1075px]:items-center items-start'>

            <div className="flex flex-col justify-center gap-y-2">
                <p>{modalData.text1}</p>
                <p className='hidden  min-[1075px]:flex'>{modalData.text2}</p>
            </div>
            <div>
                <button
                    onClick={modalData?.btn1Handler}
                    className='bg-yellow-25  mt-2 rounded-lg px-2 py-2 text-black hover:scale-95 transition-all duration-200'
                >
                    {modalData?.btn1Text}
                </button>

                {/* <IconButton
                    onClick={modalData?.btn2Handler}
                    text={modalData?.btn2Text}
                />

                <button onClick={modalData?.btn2Handler}>
                    {modalData?.btn2Text}
                </button> */}
            </div>
        </div>
    )
}

export default ConfirmationModal
