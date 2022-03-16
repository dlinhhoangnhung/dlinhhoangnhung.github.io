import React, { Component, useState, useEffect } from "react";
import dot from "../../assets/img/dot.svg";
import Target from "./Target";
import { switchView } from "../../redux/actions/slideActions";
import { useDispatch, useSelector } from "react-redux";

import {
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter,
} from "react-router-dom";

const FirstView = () => {
  const dispatch = useDispatch();
  const handleClick = (index) => {
    dispatch(switchView(index));
  };
  return (
    <div class='relative'>
      {/* <img
        src={require("../../assets/img/landing.png")}
        alt='icon_track'
        className='iconButtonTrack'
      /> */}
      <div class='bg-landing-pastel h-4/5 bg-cover '>
        {/* <div class='w-full inrow px-10 py-8 justify-between'>
          <div class='inrow flex space-x-8'>
            <div class='header-text'>Mobile Case</div>
            <div class='header-text'>Street Style</div>
            <div class='header-text'>For Moman</div>
          </div>
          <div class='inrow flex space-x-8'>
            <div class='inrow justify-between h-6 w-35 bg-search rounded-md pr-2'>
              <input
                type='search'
                class='pl-3 bg-search text-xs rounded-md w-23 h-full inrow justify-between pr-1'
                placeholder='Items, loai,..'
              />
              <img
                src='img/find.png'
                class='mt-1 h-4 w-4 stroke-current text-black'
              />
            </div>
            <img src='img/burger-menu.png' class='h-5 w-9' />
          </div>
        </div> */}

        <div class='flex grid place-items-center w-full h-screen pr-11 justify-end '>
          {/* <img
            onClick={(e) => (window.location.href = "/items")}
            src='/img/brand.png'
            class='w-5/12 ml-11 mt-32 absolute'
          /> */}
          <Link  class='w-5/12 ml-11 mt-32 absolute' to="/items">
          <img
            // onClick={(e) => (window.location.href = "/items")}
            src='./img/brand.png'
            // class='w-5/12 ml-11 mt-32 absolute'
          />
            </Link>

          <ul class=''>
            <li class=''>
              <span
                onClick={() => {
                  handleClick(0);
                }}
                class='active:border-black block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75'
              >
                <img src={dot} class='mt-1.5 ml-1.5' />
              </span>
            </li>
            <li class=''>
              <span
                onClick={() => {
                  handleClick(1);
                }}
                class='block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75'
              >
                <img
                  src={dot}
                  class='mt-1.5 ml-1.5 stroke-current stroke-1  text-white hover:text-black'
                />
              </span>
            </li>
            <li class=''>
              <span
                onClick={() => {
                  handleClick(2);
                }}
                class='block h-7 w-7 border hover:border-white border-transparent rounded-full transition ease-in duration-300 border-opacity-75'
              >
                <img
                  src={dot}
                  class='mt-1.5 ml-1.5 stroke-current fill-current hover:text-black'
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirstView;
