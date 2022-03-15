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
import { addToCart } from "../../redux/actions/cartActions";
import Spinner from "../spinner";
import userService from "../services/user.service";
import SlideView from "../SlideView";
import '../../Navbar.css'
import '../../Nav'
import Nav from "../../Nav";
import Modal from 'react-modal'
import '../../itemCarousel.css'
import Footer from "../Footer";

const Catalog = ({ match, history }, props) => {
    const dispatch = useDispatch();

    const index = useSelector(state => state.getIndex.index)


    const [textOn, setTextOn] = useState(0)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }
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
    const [showModal, setShowModal] = useState(0);
    const [showCart, setShowCart] = useState(0)

    const [notis, setNotis] = useState([])
    const [old, setOld] = useState(0)
    useEffect(() => {
        if (userInfo) {
            userService.getNotiOfUser()
                .then((response) => {
                    if (response.data.length > 0) {
                        setNotis(response.data)
                        // const a1 = 0
                        // let a = response.data.map((e) => {
                        //     if (e.isRead) {
                        //         a1 = a1 + 1
                        //     }
                        // })
                        // setOld(a1)
                        // const a2 = length - old
                        // setLength(a2)
                        // console.log(response.data);
                        // console.log(old);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            userService.getNotiUnreadOfUser()
                .then((response) => {
                    if (response.data.length > 0) {
                        setLength(response.data.length)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            // countNew()
        }
        dispatch(listProducts());
    }, [dispatch]);

    const [read, setRead] = useState([])

    const checkedStatus = async (id) => {
        console.log('object');
        await userService.notiIsRead(id)
        const l = length - 1
        setLength(l)
        console.log(length);
        setRead(read.concat(id))
        console.log(read);
    }

    const getOrder = (id) => {
        console.log('get');
        userService.checkedOrderStatus(userInfo._id, id)
            .then((response, i) => {
            })
            .catch(err => {
                console.log(err);
            })
        history.push("/user-view/order-${id}")
    }

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

    const catchSearchByIcon = (event) => {
        setSearchCid(event)
        setOption(2)
        setOnChoose(event)
    }

    const catchUserIcon = () => {
        setOnUser(!onUser)
    }

    // const catchNotifyIcon = () => {
    //     console.log('object');
    //     setOnNotify(!onNotify)
    // }

    const cartEvent = () => {  // switch the value of the showModal state
        setShowCart(!showCart)
    }
    const [mark, setMark] = useState(0)
    const checkIsRead = (value) => {
        if (read.includes(value) || value) {
            setMark(1)
        }
    }

    const [length, setLength] = useState(0)
    const countNew = () => {
        console.log('count');
        const l = 0

        let neww = notis.map((n) => {
            if (n.isRead === false) {
                console.log('new');
                l += 1
            }
        })
        setLength(l)
    }

    let [showDetailModal, setShowDetailModal] = useState(false)
    const [itemModal, setItemModal] = useState('')
    const activeModal = (id) => {
        console.log(id);
        return products.find((item) => {
            return item._id === id;
            setItemModal(item)
            console.log('alooo');
        })
        setShowDetailModal(true)


    }

    let [searchModal, setSearchModal] = useState(false)

    const [qty, setQty] = useState(1)
    const increment = () => setQty(qty + 1);
    let decrement = () => setQty(qty - 1);
    if (qty <= 1) {
        decrement = () => setQty(1);
    }
    const [colorChoose, setColorChoose] = useState('')
    const [textColor, setTextColor] = useState('')
    const [sizeChoose, setSizeChoosee] = useState('')
    const [textSize, setTextSize] = useState('')
    return (
        <div className="incol space-y-96">


            <div className="relative incol space-y-16 bg-catalog  min-h-screen   w-contain">
                {/* Navbar */}
                <Nav amountCart={getCartCount} user={userInfo} notify={notis} amountNoti={length}></Nav>

                <div className="incol space-y-40">

                    <div className=" ">


                        <SlideView class="overscroll-none top-0" index={index} />


                        <div onClick={() => setIsInput(0)} className=" z-0 space-y-32 inset-0  bg-opacity-75 transition-opacity ">
                            {/* Menu Category */}
                            <div className="pl-12 pr-16 pb-10 pt-14  h-42 w-full flex justify-center inrow ">
                                <div className="space-x-4 justify-center inrow">
                                    {/* <div className="space-x-16 justify-center inrow" ref={myRef}> */}
                                    {data.map((i) =>
                                        <button
                                            className={`${onChoose === i.id ? 'bg-gray-200 -translate-y-3' : ''} transform rounded-md h-28 w-28 p-2 ring-1 ring-white shadow-2xl `}
                                            onClick={() => catchSearchByIcon(i.id)}>
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


                        </div>

                        {/* Blur */}
                        {/* <div class="mx-16 mt-8 h-96 relative">
<div class="absolute w-full h-full py-8">
<img class="h-80 w-full object-cover rounded-2xl" src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&h=1000&q=80" alt="" />
</div>
<div class="relative h-full flex overflow-x-auto space-x-80">
<div class="flex-shrink-0 rounded-2xl w-full"></div>
<div class="flex-shrink-0 rounded-2xl w-1/3 border-4 border-black backdrop-filter backdrop-hue-rotate-180"></div>
<div class="flex-shrink-0 rounded-2xl w-1/3 border-4 border-black backdrop-filter backdrop-saturate-200"></div>
<div class="flex-shrink-0 rounded-2xl w-1/3 border-4 border-black backdrop-filter backdrop-invert"></div>
<div class="flex-shrink-0 rounded-2xl w-1/3 border-4 border-black backdrop-filter backdrop-sepia"></div>
<div class="flex-shrink-0 rounded-2xl w-1/3 border-4 border-black backdrop-filter backdrop-blur-lg"></div>
<div class="flex-shrink-0 rounded-2xl w-full"></div>
</div>
</div> */}

                        <div className="flex flex-col bg-catalog h-screen">
                            <div className="bg-catalog  flex justify-center absolute w-full">
                                <div className="h-full grid grid-cols-3 gap-7">
                                    {
                                        textOn === 1 && console.log(textOn)
                                        // non work
                                        // <div className="text-xl text-">Không có sản phẩm cần tìm.</div>
                                    }

                                    {
                                        option === 0 ? (
                                            loading ? (
                                                <Spinner></Spinner>
                                            ) :
                                                products ? products.map((i) =>
                                                    // className={`w-72 h-64 ${style === i._id && 'flex-shrink-0 backdrop-filter backdrop-blur-lg'}`}
                                                    <div className={`rounded-md h-96 w-80 bg-gray-250 shadow-2xl px-5 pt-3 bg-opacity-95 ${style === i._id ? 'grayscale flex-shrink-0 rounded-2xl backdrop-filter blur-lg' : null}`}>
                                                        <div class={`relative flex justify-center`}>
                                                            <img
                                                                onClick={e => window.location.href = '/user-view/item-' + i._id}
                                                                // onClick={e => window.location.href = '/user-view/item-' + i._id}
                                                                onMouseEnter={e => { setStyle(i._id); }}
                                                                onMouseLeave={e => { setStyle(0) }}
                                                                src={`./assets/imgs/products/${i.thumbnail}`} alt=""
                                                                class={` w-72 h-72 rounded-sm bg-gray-500 scale-100`} />
                                                            {/* ${style === i._id && 'shadow-xl transition  filter  backdrop-filter backdrop-blur-sm'} */}
                                                            {/* {
                        style === i._id ? null : (
                            <div class="inrow bg-black/10 absolute  -mt-16 w-full flex justify-between  rounded-md   px-4 bottom-0  backdrop-opacity-15   backdrop-filter backdrop-blur-md">
                                <span className="text-xl  w-36 truncate capitalize font-sans ">
                                    <div className="capitalize font-sans text-black">{i.name}</div>
                                </span>
                                <span className="font-sans text-gray-500">{i.price}</span>
                            </div>
                            // chu den shadow trang
                        )
                    } */}
                                                        </div>
                                                        {
                                                            style === i._id ? null : (
                                                                <div className="mt-3 inrow flex justify-between">
                                                                    <div className="incol">
                                                                        <div className="">
                                                                            {i.name}
                                                                        </div>
                                                                        <div className="text-gray-500">
                                                                            {i.price}
                                                                        </div>
                                                                    </div>
                                                                    <div className="">
                                                                        {
                                                                            showDetailModal &&
                                                                            (
                                                                                <div class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full" id="extralarge-modal">
                                                                                    <div class="relative px-4 w-full max-w-7xl h-full md:h-auto">
                                                                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                                            <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                                                                                                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                                                                                    {itemModal.name}
                                                                                                </h3>
                                                                                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal">
                                                                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="inrow">


                                                                                                <div className="w-1/3">
                                                                                                    <div class="p-6 space-y-6">
                                                                                                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                                                            {itemModal.price}
                                                                                                        </p>
                                                                                                        <div className="inrow space-x-2 mt-3">
                                                                                                            <button
                                                                                                                className="h-10 w-10 rounded-md ring-1 ring-gray-400"
                                                                                                                size="small"
                                                                                                                disableElevation
                                                                                                                variant="contained"
                                                                                                                value={qty}
                                                                                                                onClick={decrement}
                                                                                                            >
                                                                                                                -
                                                                                                            </button>
                                                                                                            {/* <input className="text-center h-10 w-12 rounded-md" min="1" type="number" placeholder={qty} value={qty} onChange={(i) => setQty(i.target.value)} /> */}
                                                                                                            <div onChange={(i) => setQty(i.target.value)} className=" text-center text-xl mt-2 h-10 w-10 rounded-md">{qty}</div>
                                                                                                            <button
                                                                                                                className="h-10 w-10 rounded-md ring-1 ring-gray-400"
                                                                                                                size="small"
                                                                                                                disableElevation
                                                                                                                variant="contained"
                                                                                                                value={qty}
                                                                                                                onClick={increment}
                                                                                                            >
                                                                                                                +
                                                                                                            </button>
                                                                                                        </div>
                                                                                                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                                                            {i.desc}
                                                                                                        </p>
                                                                                                        <legend class="sr-only">
                                                                                                            Choose a color
                                                                                                        </legend>
                                                                                                        <div class="flex items-center space-x-3">
                                                                                                            {
                                                                                                                itemModal.color && console.log(itemModal.color)
                                                                                                                //     // <div
                                                                                                                //     //     key={i}
                                                                                                                //     //     onClick={
                                                                                                                //     //         () => {
                                                                                                                //     //             setTextColor(c.name)
                                                                                                                //     //             setColorChoose(c._id)
                                                                                                                //     //         }
                                                                                                                //     //     }
                                                                                                                //     //     className={`transform 
                                                                                                                //     //                 ${colorChoose === c._id
                                                                                                                //     //             ? 'shadow-2xl -translate-y-1 outline-none ring-2 ring-offset-2 ring-indigo-350'
                                                                                                                //     //             : ''
                                                                                                                //     //         }
                                                                                                                //     //         shadow-inner h-10 w-10 rounded-md ${c.colorcode}`}>
                                                                                                                //     // </div>
                                                                                                                // )//focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                                                                                            }
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                                                                                        <button data-modal-toggle="extralarge-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                                                                                        <button data-modal-toggle="extralarge-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Decline</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>


                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            )

                                                                        }
                                                                        <svg onClick={() => { activeModal(i._id) }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                                        </svg>
                                                                        {/* <svg  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                                </svg> */}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>


                                                ) : <Spinner></Spinner>
                                        ) : (products && (products.filter((val) => {
                                            if (option === 2) { // search by icons
                                                if (searchCid === '') {
                                                    return val
                                                }

                                                if (val.cateid.includes(searchCid)) { // compare by objectid not use toLowerCase

                                                    return val
                                                }


                                            }
                                            else if (option === 1) {  // search by input bar
                                                if (searchName === '') {
                                                    return val
                                                }

                                                if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
                                                    return val
                                                }

                                            }
                                        }))
                                            .map((value) => {
                                                return <div class="relative">
                                                    <img
                                                        onClick={e => window.location.href = '/user-view/item-' + value._id}
                                                        onMouseEnter={e => { setStyle(value._id); }}
                                                        onMouseLeave={e => { setStyle(0) }}
                                                        src={`./assets/imgs/products/${value.thumbnail}`} alt=""
                                                        class={` w-72 h-64 rounded-sm bg-gray-500`} />
                                                    {/* ${style === i._id && 'shadow-xl transition  filter  backdrop-filter backdrop-blur-sm'} */}
                                                    {
                                                        style === value._id ? null : (
                                                            <div class="inrow absolute  -mt-16 w-full flex justify-between rounded-md text-gray-450 text-opacity-80 px-4 bottom-0  backdrop-opacity-15  bg-black/30 backdrop-filter backdrop-blur-md">
                                                                <span className="text-xl">{value.name}</span>
                                                                <span className="">{value.price}</span>
                                                            </div>
                                                            // chu den shadow trang
                                                        )
                                                    }
                                                </div>
                                            }
                                            ))
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
                    </div>

                    <div className="h-62">

                    </div>


                    <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />



                </div>


            </div >

            <div>
                <section class="pt-20 lg:pt-[120px]  lg:pb-20 bg-[#F3F4F6]">
                    <div class="container">
                        {/* <div class="flex flex-wrap -mx-4">
                            <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                                <div class="bg-white rounded-lg overflow-hidden mb-10">
                                    <img src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg" alt="image" class="w-full" />
                                    <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                        <h3>
                                            <a href="javascript:void(0)" class="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary">
                                                50+ Best creative website themes & templates
                                            </a>
                                        </h3>
                                        <p class="text-base text-body-color leading-relaxed mb-7">
                                            Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.
                                        </p>
                                        <a href="javascript:void(0)" class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                                <div class="bg-white rounded-lg overflow-hidden mb-10">
                                    <img src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg" alt="image" class="w-full" />
                                    <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                        <h3>
                                            <a href="javascript:void(0)" class="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary">
                                                The ultimate UX and UI guide to card design
                                            </a>
                                        </h3>
                                        <p class="text-base text-body-color leading-relaxed mb-7">
                                            Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.
                                        </p>
                                        <a href="javascript:void(0)" class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                                <div class="bg-white rounded-lg overflow-hidden mb-10">
                                    <img src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-03.jpg" alt="image" class="w-full" />
                                    <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                        <h3>
                                            <a href="javascript:void(0)" class="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary">
                                                Creative Card Component designs graphic elements
                                            </a>
                                        </h3>
                                        <p class="text-base text-body-color leading-relaxed mb-7">
                                            Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.
                                        </p>
                                        <a href="javascript:void(0)" class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </div>
        </div >

    )
}

export default Catalog

