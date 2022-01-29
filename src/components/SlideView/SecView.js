import React, { Component } from 'react'
import dot from "../../assets/img/dot.svg"
import Target from './Target'
import { switchView } from "../../redux/actions/slideActions";
import { useDispatch, useSelector } from 'react-redux'

const SecView = () => {
    const dispatch = useDispatch()
    const handleClick = (index) => {
        dispatch(switchView(index))
    }
    return (
        <div className="relative">
            <div class="bg-next-2 w-full h-screen bg-cover bg-center">
                {/* <div class="w-full inrow px-10 py-8 justify-between">
                    <div class="inrow flex space-x-8">
                        <div class="header-text">
                            Mobile Case
                        </div>
                        <div class="header-text">
                            Street Style
                        </div>
                        <div class="header-text">
                            For Moman
                        </div>
                    </div>
                    <div class="inrow flex space-x-8 ">
                        <div class="inrow justify-between h-6 w-35 bg-search rounded-md pr-2">
                            <input type="search" class="pl-3 bg-search text-xs rounded-md w-23 h-full inrow justify-between pr-1"
                                placeholder="Items, loai,.." />


                            <img src="img/find.png" class="mt-1 h-4 w-4 stroke-current text-black" />
                        </div>
                        <img src="img/burger-menu.png" class="h-5 w-9" />
                    </div>
                </div> */}

                <div class="h-screec w-screen pl-80 pt-60 space-y-3">
                    <div class="w-full flex justify-between inrow pr-2">
                        <div class="grid w-60 place-items-center justify-start mr-12">
                            <div class="px-1 inrow">
                                <div>
                                    <div class="text-5xl">
                                        Looking for
                                    </div>
                                    <div class="text-5xl">
                                        Hoodies ?
                                    </div>
                                    <div class="mt-6 h-14 w-44 p-2  rounded-2xl bg-shopnow inrow hover:bg-yellow-700">
                                        <div class="ml-4 mt-1 text-2xl text-center text-white text-opacity-75">Shop Now</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mt-1.5 stroke-current stroke-1 text-white text-opacity-75" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-full'>
                        <div class="grid place-items-center flex justify-end inrow px-8">
                            <ul class="">
                                <li class="">
                                    <span
                                        onClick={() => { handleClick(0) }}
                                        class="active:border-black block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                                        <img src={dot} class="mt-1.5 ml-1.5" />
                                    </span>
                                </li>
                                <li class="">
                                    <span
                                        onClick={() => { handleClick(1) }}
                                        class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                                        <img src={dot} class="mt-1.5 ml-1.5 stroke-current stroke-1  text-white hover:text-black" />
                                    </span>
                                </li>
                                <li class="">
                                    <span
                                        onClick={() => { handleClick(2) }}
                                        class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                                        <img src={dot} class="mt-1.5 ml-1.5 stroke-current fill-current hover:text-black" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecView
