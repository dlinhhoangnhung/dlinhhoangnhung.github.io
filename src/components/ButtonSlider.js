import React, { useState } from 'react'
import '../ButtonSlider.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

{/* <RightOutlined /> */ }
export default function ButtonSlider({ direction, moveSlide }) {
    console.log(direction, moveSlide)
    return (
        // <button onClick={moveSlide} className={direction === "next" ? 'btn-slide next' : "btn-slide prev"}>
        <div>
            {direction === "next" ? (<RightOutlined onClick={moveSlide} className={direction === "next" ? 'btn-slide next' : "btn-slide prev"} />) :
                (<LeftOutlined onClick={moveSlide} className={direction === "next" ? 'btn-slide next' : "btn-slide prev"} />)
                // vex sau
            }
        </div>

        // </button>
    )
}