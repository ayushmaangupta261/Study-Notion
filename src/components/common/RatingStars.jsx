import React, { useEffect } from 'react'
import { TiStarFullOutline, TiStarHalfOutline} from "react-icons/ti";
import { RiStarSLine } from "react-icons/ri";
import { useState } from 'react';


function RatingStars({ Review_Count, Start_Size }) {
    const [startCount, setStartCount] = useState({
        full: 0,
        half: 0,
        empty: 0,
    })

    useEffect(
        () => {
            const wholeStars = Math.floor(Review_Count) || 0
            setStartCount({
                full: wholeStars,
                half: Number.isInteger(Review_Count) ? 0 : 1,
                empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars
            })
        }, [Review_Count])

    return (
        <div className='flex gap-x-1'>
            {
                [...new Array(startCount.full)].map((_, i) => {
                    return <TiStarFullOutline key={i} size={Start_Size || 20} />
                })
            }
            {
                [...new Array(startCount.half)].map((_, i) => {
                    return <TiStarHalfOutline key={i} size={Start_Size || 20} />
                })
            }
            {
                [...new Array(startCount.empty)].map((_, i) => {
                    return <RiStarSLine  key={i} size={Start_Size || 20} />
                })
            }
        </div>
    )
}


export default RatingStars
