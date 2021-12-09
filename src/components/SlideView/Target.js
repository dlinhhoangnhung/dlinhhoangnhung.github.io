import React, { useState } from 'react'
import dot from "../../assets/img/dot.svg"
import { switchView } from "../../redux/actions/slideActions";
import { useDispatch, useSelector } from 'react-redux'

const Target = () => {
    const dispatch = useDispatch()
    const handleClick = (index) => {
        dispatch(switchView(index))
    }
    return (
        <div class="grid place-items-center h-screen w-screen pr-11 justify-end">
            <ul class="">
                <li onClick={() => { handleClick(0) }} class="">
                    <span
                        class="active:border-black block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                        <img src={dot} class="mt-1.5 ml-1.5" />
                    </span>
                </li>
                <li onClick={() => { handleClick(1) }} class="">
                    <span
                        class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                        <img src={dot} class="mt-1.5 ml-1.5 stroke-current stroke-1  text-white hover:text-black" />
                    </span>
                </li>
                <li onClick={() => { handleClick(2) }} class="">
                    <span
                        class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                        <img src={dot} class="mt-1.5 ml-1.5 stroke-current fill-current hover:text-black" />
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Target
