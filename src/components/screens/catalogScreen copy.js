import React, { Component, useEffect, useState } from "react";
import G from '../../assets/G.png'
import user from '../../assets/figma-img/User.png'
import basket from '../../assets/figma-img/basket.svg'
import star from '../../assets/figma-img/Star.svg'
import mobilecase from '../../assets/figma-img/PhoneCase.svg'
import clutch from '../../assets/figma-img/ClutchBag.svg'
import jacket from '../../assets/figma-img/Tracksuit.svg'
import trouser from '../../assets/figma-img/Trousers.svg'
import tee from '../../assets/figma-img/Jersey.svg'
import dress from '../../assets/figma-img/SlipDress.svg'
import skrt from '../../assets/figma-img/Skirt.svg'
import set from '../../assets/figma-img/HeartPuzzle.svg'

import ReactDOM from 'react-dom';
import { getProducts as listProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from 'react-redux'
import CateCard from "../Card/CategoryCard";
import FilterByCate from "../FilterComponent";
import { Search } from "../Search";
import authService from "../services/auth.service";
import Cart from "../admin/users/cart.component";
import { removeFromCart, adjustQty, increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../redux/actions/cartActions"

const Catalog = () => {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProducts)
    const userInfo = authService.getCurrentUser()
    console.log(getProducts)
    const { products, loading, error } = getProducts

    const [searchCid, setSearchCid] = useState('');
    const [searchName, setSearchName] = useState('');
    const [option, setOption] = useState(0);
    const [isInput, setIsInput] = useState(0);
    const [onChoose, setOnChoose] = useState('');
    const [onUser, setOnUser] = useState(0);

    const [style, setStyle] = useState(0);
    const [showCart, setShowCart] = useState(0)

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const myRef = React.createRef()

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const test = 'alo'
    const data =
        [{ name: "All", src: star, id: '' },
        { name: "Case", src: mobilecase, id: '619ce41dc411335f352a5b97' },
        { name: "Bag", src: clutch, id: '60d0908a6e856b091fe5c2ad' },
        { name: "Trouses", src: trouser, id: '619ce42dc411335f352a5b9d' },
        { name: "Jacket", src: jacket, id: '6193efd4390a2f24b3a53565' },
        { name: "Top", src: tee, id: '619ce407c411335f352a5b8f' },
        { name: "Dress", src: dress, id: '6193eea0390a2f24b3a5355b' },
        { name: "Skirt", src: skrt, id: '6193eed6390a2f24b3a53561' },
        { name: "Set", src: set, id: '613a28b951ffc15eacb6138d' }
        ]

    const prevClick = () => {
        // const slide = myRef.current
        // slide.srollLeft -= slide.offsetWidth
        // if(slide.scollLeft <= 0){
        //     slide.scollLeft = slide.scrollWidth
        // }
        alert('nxt')
    }

    const nextClick = () => {
        alert('next')
    }

    const catchInputSearch = (event) => {
        setSearchName(event)
        setOption(1)

    }

    const catchIconSearch = (event) => {
        setSearchCid(event)
        setOption(2)
        setOnChoose(event)
    }

    const catchUserIcon = () => {
        setOnUser(!onUser)
    }

    const cartEvent = () => {  // switch the value of the showModal state
        setShowCart(!showCart)
    }

    return (
        <div>
            <div className="relative space-y-20 incol bg-catalog h-screen w-screen">
                <div className="absolute bg-white inrow w-full pl-10 pr-16 pt-3 h-14">
                    {/* Search */}
                    <div className="w-44">
                        <input
                            className={`${isInput === 1 ? '' : 'hidden'} w-full ml-6 mt-2 ring-1 rounded text-center ring-1 ring-black ring-opacity-40`}
                            type="text"
                            placeholder="nhập tên, loại.."
                            onChange={event => { catchInputSearch(event.target.value) }}
                        />
                        <svg onClick={() => setIsInput(1)} xmlns="http://www.w3.org/2000/svg" className={` h-7 w-7 stroke-current stroke-2 ${isInput === 1 ? 'hidden' : ''} `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div onClick={() => setIsInput(0)} className="w-full">
                        <div className="flex justify-center">
                            {/* Logo */}
                            <img className="mr-28 absolute w-6 h-8" src={G} />
                        </div>
                        <div className=" flex justify-end space-x-8">
                            {/* Right Side */}

                            {/* Cart */}
                            <div onClick={() => { cartEvent() }} >
                                <div className="inrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="text-bold text-blue-500">{getCartCount()}</span>
                                </div>
                                {showCart && (<Cart />)}
                            </div>

                            {/* <div className="group relative usericon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div class="usericon-menu top-0 absolute hidden  w-36 rounded-md shadow-lg top-7 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                                    <li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item</a></li>
                                    <li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item 2</a></li>
                                </ul>
                            </div>
                        </div> */}

                            <div onClick={() => { catchUserIcon() }} className="group relative z-10 ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className={` usericon-menu top-0 absolute ${onUser === true ? '' : 'hidden'}  w-44 rounded-md shadow-lg top-10 right-0 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}>
                                    <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                                        {
                                            userInfo ? (
                                                <div className="z-40"><li onClick={e => window.location.href = '/user-view/user-' + userInfo.id} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Xem thông tin</a></li>
                                                    <li onClick={() => { authService.logout() }} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng xuất</a></li></div>
                                            )
                                                : (
                                                    <div>
                                                        <li onClick={e => window.location.href = '/login'} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng Nhập</a></li>
                                                        <li onClick={e => window.location.href = '/register'} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng ký</a></li>
                                                    </div>
                                                )
                                        }
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
                <div onClick={() => setIsInput(0)} className="z-0 space-y-32 inset-0  bg-opacity-75 transition-opacity ">
                    <div className="pl-12 pr-16 pb-10 pt-14  h-42 w-full flex justify-center inrow ">
                        <div className="space-x-4 justify-center inrow">
                            {/* <div className="space-x-16 justify-center inrow" ref={myRef}> */}
                            {data.map((i) =>
                                <button
                                    className={`${onChoose === i.id ? 'bg-gray-200 -translate-y-3' : ''} transform rounded-md h-28 w-28 p-2 ring-1 ring-white shadow-2xl hover:-translate-y-2`}
                                    onClick={() => catchIconSearch(i.id)}>
                                    <img className="w-full items-center h-12 w-12 object-contain" src={i.src} />
                                    <div>
                                        <div className="text-center tex">
                                            {i.name}
                                        </div>
                                    </div>
                                </button>
                            )}
                            {/* <CateCard data={data} /> */}
                        </div>
                    </div>

                    {/* <ul class="">
                <li class="dropdown relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="dropdown-menu top-0 absolute hidden  w-36 rounded-md shadow-lg top-7 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                            <li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item</a></li>
                            <li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item 2</a></li>
                        </ul>
                    </div>
                </li>
               
                </ul> */}
                    <div className="flex justify-center absolute w-full">
                        <div className="grid grid-cols-3 gap-4 h-72">
                            {
                                option === 0 ? (
                                    products && products.map((i) =>
                                        // className={`w-72 h-64 ${style === i._id && 'flex-shrink-0 backdrop-filter backdrop-blur-lg'}`}
                                        <div className="">
                                            {/* hovere not work */}
                                            <img
                                                onClick={e => window.location.href = '/user-view/item-' + i._id}
                                                onMouseEnter={e => { setStyle(i._id); }}
                                                onMouseLeave={e => { setStyle(0) }}
                                                className={` w-72 h-72 rounded-lg bg-gray-500 ${style === i._id && 'shadow-xl transition duration-300 filter grayscale backdrop-filter backdrop-blur-lg'}`}
                                                src={`http://localhost:3000/assets/imgs/products/${i.thumbnail}`} alt=""
                                            />
                                            <figcaption class="absolute text-lg -mt-16 text-white px-4">
                                                <div>
                                                    <h1>{style === i._id && i.name}</h1>
                                                </div>
                                                <div>
                                                    <h1>{style === i._id && i.price}</h1>
                                                </div>
                                            </figcaption>
                                        </div>
                                    )
                                ) : products && products.filter((val) => {
                                    if (option === 2) {
                                        if (searchCid === '') {
                                            return val
                                        } else if (val.cateid.includes(searchCid)) { // compare by objectid not use toLowerCase
                                            return val
                                        }
                                    } else if (option === 1) {
                                        if (searchName === '') {
                                            return val
                                        } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
                                            return val
                                        }
                                    }
                                })
                                    .map((value) => {
                                        return <div className="">
                                            <img
                                                onClick={e => window.location.href = '/user-view/item-' + value._id}
                                                onMouseEnter={e => { setStyle(value._id); }}
                                                onMouseLeave={e => { setStyle(0) }}
                                                className={` w-72 h-64 rounded-sm bg-gray-500 ${style === value._id && 'shadow-xl transition duration-300 filter grayscale backdrop-filter backdrop-blur-lg'}`}
                                                src={`http://localhost:3000/assets/imgs/products/${value.thumbnail}`} />
                                            <figcaption class="absolute text-lg -mt-16 text-white px-4">
                                                <div>
                                                    <h1>{style === value._id && value.name}</h1>
                                                </div>
                                                <div>
                                                    <h1>{style === value._id && value.price}</h1>
                                                </div>
                                            </figcaption>
                                        </div>
                                    }
                                    )
                            }
                            {/* {
                            products && products.map((i) =>
                                <div className="">
                                    <img onClick={() => console.log(i.thumbnail[0])} className=" w-72 h-64 rounded-sm bg-gray-500" src={`http://localhost:3003/assets/imgs/products/${i.thumbnail[0]}`} />
                                    {i.name}
                                </div>
                            )
                        } */}
                        </div>
                    </div>
                </div>
            </div >
        </div>

    )
}

export default Catalog

