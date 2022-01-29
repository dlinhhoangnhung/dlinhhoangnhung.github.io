import React, { Component } from 'react'
import dot from "../../assets/img/dot.svg"
import Target from './Target'
import { switchView } from "../../redux/actions/slideActions";
import { useDispatch, useSelector } from 'react-redux'

const LastView = () => {
    const dispatch = useDispatch()
    const handleClick = (index) => {
        dispatch(switchView(index))
    }

    return (
        <div className="relative">
            <div class="bg-next-3 w-screen h-screen bg-cover">
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
                        <div class="inrow justify-between h-6 w-35 bg-searchlast rounded-md pr-2">
                            <input type="search" class="pl-3 bg-searchlast text-xs rounded-md w-23 h-full inrow justify-between"
                                placeholder="Items, loai,.." />
                            <img src="img/find.png" class="mt-1 h-4 w-4 stroke-current text-black" />
                        </div>
                        <img src="img/burger-menu.png" class="h-5 w-9" />
                    </div>
                </div> */}
                <div class=" h-screen w-screen  inrow">
                    <div class="pl-14 ml-24 mt-70 w-1/3 h-screen space-y-4">
                        <div class="text-6xl">
                            Tee's
                        </div>
                        <div class="text-5xl">
                            Collection
                        </div>
                    </div>

                    <div class=" h-screen w-screen grid place-items-center justify-end pr-11">
                        <ul class="">
                            <li class="">
                                <span
                                    onClick={() => handleClick(0)}
                                    class="active:border-black block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                                    <img src={dot} class="mt-1.5 ml-1.5" />
                                </span>
                            </li>
                            <li class="">
                                <span
                                    onClick={() => handleClick(1)}
                                    class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                                    <img src={dot} class="mt-1.5 ml-1.5 stroke-current stroke-1  text-white hover:text-black" />
                                </span>
                            </li>
                            <li class="">
                                <span
                                    onClick={() => handleClick(2)}
                                    class="block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75">
                                    <img src={dot} class="mt-1.5 ml-1.5 stroke-current fill-current hover:text-black" />
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>


                <div>
                    <div class="grid place-items-center h-screen w-screen justify-end pr-11">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastView
