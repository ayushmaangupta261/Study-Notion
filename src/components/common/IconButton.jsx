import React from 'react'

const IconButton = (
    { text, onclick, children, disabled, outline = false, customClasses, type }
) => {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className="text-center text-[13px] px-4 py-2 rounded-md font-bold bg-yellow-50 text-black  hover:scale-95 transition-all duration-200"
        >
            {
                children ?
                    (<>
                        <span>{text}</span>{children}</>
                    ) :
                    (text)
            }
        </button>
    )
}

export default IconButton
