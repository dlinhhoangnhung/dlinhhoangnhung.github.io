import React, { Component, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/user.service';
import Navbar from '../Navbar';
import { getProductDetails } from "../../redux/actions/productAction"
import { addToCart } from "../../redux/actions/cartActions"
import { getColors as listColors } from '../../redux/actions/colorAction';
import { getSizes as listSizes } from '../../redux/actions/sizeActions';
import { getProducts as listProducts } from "../../redux/actions/productAction";

import Loading from "../loading.component"
import { func } from 'prop-types';
import Footer from '../Footer';

const ItemScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty))
    }
    const increment = () => setQty(qty + 1);
    let decrement = () => setQty(qty - 1);
    if (qty <= 1) {
        decrement = () => setQty(1);
    }
    const [isEmptyColor, setIsEmptyColor] = useState(0)
    const [isEmptySize, setIsEmptySize] = useState(0)
    const addToCartHandler = async () => {
        if (textColor === '') {
            setIsEmptyColor(1)
        }
        if (textSize === '') {
            setIsEmptySize(1)
        }
        if (textColor && textSize) {
            dispatch(addToCart(product._id, qty, textColor, textSize))
            history.push("/user-view/cart")
        }
    }
    const sizeData = [
        {
            "_id": "618be236b1ee7f46b9c255c8",
            "name": "S",
            "sizecode": "S",
        },
        {
            "_id": "618be23cb1ee7f46b9c255cb",
            "name": "M",
            "sizecode": "M",
        },
        {
            "_id": "618be240b1ee7f46b9c255ce",
            "name": "L",
            "sizecode": "L",
        },
        {
            "_id": "618be24ab1ee7f46b9c255d1",
            "name": "XL",
            "sizecode": "XL",
        },
        {
            "_id": "618be24db1ee7f46b9c255d4",
            "name": "2XL",
            "sizecode": "2XL",
        },
        {
            "_id": "618be252b1ee7f46b9c255d7",
            "name": "3XL",
            "sizecode": "3XL",
        },
        {
            "_id": "6193670420edfb03f0f2b664",
            "name": "freesize",
            "sizecode": "freesize",
        }
    ]
    const colorData = [
        {
            "_id": "618a504d2650cff025590d76",
            "name": "đen",
            "colorcode": "bg-black",
        },
        {
            "_id": "618a50542650cff025590d79",
            "name": "trắng",
            "colorcode": "bg-white",
        },
        {
            "_id": "618a50672650cff025590d7c",
            "name": "đỏ",
            "colorcode": "bg-red-400",
        },
        {
            "_id": "618a50742650cff025590d7f",
            "name": "cam",
            "colorcode": "bg-yellow-500",
        },
        {
            "_id": "618a50892650cff025590d82",
            "name": "vàng",
            "colorcode": "bg-yellow-300",
        },
        {
            "_id": "618a509f2650cff025590d85",
            "name": "xanh lá",
            "colorcode": "bg-green-600",
        },
        {
            "_id": "618aa0ca2650cff025590d89",
            "name": "xanh biển",
            "colorcode": "bg-blue-400",
        },
        {
            "_id": "618aa0d92650cff025590d8c",
            "name": "xanh dương",
            "colorcode": "bg-blue-800",
        },
        {
            "_id": "618aa1072650cff025590d92",
            "name": "tím",
            "colorcode": "bg-purple-300",
        },
        {
            "_id": "618aa1332650cff025590d95",
            "name": "hồng",
            "colorcode": "bg-pink-300",
        },
        {
            "_id": "618aa1422650cff025590d98",
            "name": "hồng đậm",
            "colorcode": "bg-pink-900",
        },
        {
            "_id": "618aa15d2650cff025590d9e",
            "name": "be",
            "colorcode": "bg-yellow-100",
        },
    ]
    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.getProductDetails)
    const { loading, error, product } = productDetails
    const getSizes = useSelector((state) => state.getSizes)
    console.log(getSizes)
    const { sizes } = getSizes
    useEffect(() => {
        getProduct()
        if (product && match.params.id !== product._id) {
            dispatch(getProductDetails(match.params.id))
        }
        if (!loading && error !== 0) {
            console.log(product.colorslist)
            getProductColor(product.colorslist)
            getProductSize(product.sizeslist)
        }
    }, [dispatch, product, match])
    console.log(productDetails)
    console.log(product)
    console.log(qty)


    const [showColor, setShowColor] = useState([]);
    const [showSize, setShowSize] = useState([])

    const [colorChoose, setColorChoose] = useState('')
    const [textColor, setTextColor] = useState('')
    const [sizeChoose, setSizeChoosee] = useState('')
    const [textSize, setTextSize] = useState('')

    const getProductSize = async (data) => {
        var Obj1 = sizeData // object
        // console.log('Obj1 :  ' + Obj1);

        var Obj2 = data // id
        // console.log('Obj2 :  ' + Obj2);

        if (Obj1 && Obj2) {
            var Obj3 = await Obj1.filter(f => Obj2.includes(f._id));
            // console.log(Obj3)
            setShowSize(Obj3)
        }


    }

    const getProductColor = async (data) => {
        var Obj1 = colorData
        // console.log('Obj1 :  ' + Obj1);

        var Obj2 = data
        // console.log('Obj2 :  ' + Obj2);

        if (Obj1 && Obj2) {
            var Obj3 = await Obj1.filter(f => Obj2.includes(f._id));
            // console.log(Obj3)
            setShowColor(Obj3)
        }
    }
    const [isProduct, setIsProduct] = useState('')
    const getProduct = async () => {
        console.log('called')
        await userService.getSingleProduct(match.params.id)
            .then(response => {
                setIsProduct(response.data.images)
                console.log("isProduct", isProduct)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {loading ? (<Loading />) : error ? <h2>{error}</h2> : (

                <div class="relative space-y-20 incol bg-catalog h-contain w-screen">
                    <Navbar />

                    <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                            <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                                <img
                                    // onClick={() => this.handleTab(index)}
                                    // key={index}
                                    src={`./assets/imgs/products/${isProduct[0]}`}
                                    alt="Two each of gray, white, and black shirts laying flat."
                                    class="w-full h-full object-center object-cover" />
                            </div>
                            <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                    <img src={`./assets/imgs/products/${isProduct[1]}`} alt="Model wearing plain black basic tee." class="w-full h-full object-center object-cover" />
                                </div>
                                <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                    <img src={`./assets/imgs/products/${isProduct[2]}`} alt="Model wearing plain gray basic tee." class="w-full h-full object-center object-cover" />
                                </div>
                            </div>
                            <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                                <img src={`./assets/imgs/products/${isProduct[3]}`} alt="Model wearing plain white basic tee." class="w-full h-full object-center object-cover" />
                            </div>                            

                    </div>

                    <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                {product.name}
                            </h1>
                        </div>

                        <div class="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 class="sr-only">Product information</h2>
                            <p class="text-3xl text-gray-900">{product.price} đ</p>
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
                            <div class="mt-6">
                                <h3 class="sr-only">Reviews</h3>
                                <div class="flex items-center">
                                    <div class="flex items-center text-gray-200 focus:text-gray-900">
                                        {/* <!--
                                    Heroicon name: solid/star

                                    Active: "text-gray-900", Default: "text-gray-200"
                    --> */}
                                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                        <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <form class="mt-10">
                                <div>
                                    <h3 class="text-sm text-gray-900 font-medium" >Color</h3>
                                    <fieldset class="mt-4">
                                        <legend class="sr-only">
                                            Choose a color
                                        </legend>

                                        {/* <div style={{display: 'inline-block'}} class="" data-toggle="buttons">
                                    {
                                        this.state.showColor.map((c, i) =>

                                            <label style={{ display: 'inline-block' }} class={`${c.colorcode}`}>
                                                <input style={{display: 'inline-block'}}
                                                    key={i}
                                                    className="transform 
                                                    shadow-inner shadow-2xl h-10 w-10 rounded-md"
                                                    onClick={() => this.handleColor(i)}
                                                    type="radio" name="options" id="option2" autocomplete="off" />
                                                <span >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                            </label>
                                        )
                                    }
                                </div>




                                <input type='radio' name="gender" />
                                <input type='radio' name="gender" />


                                {
                                    this.state.showColor.map((c, i) =>
                                        <div key={i} onClick={() => console.log(i)} class={` inline-block radio`}>
                                            <input
                                                type="radio"
                                                name="options"
                                                className=""
                                            />
                                            <label
                                                for="B1"
                                                class={`${c.colorcode} px-2 py-1 rounded-md flex justify-center items-center text-3xl lg:text-5xl font-bold w-6 h-6 lg:w-14 lg:h-14`}
                                            >

                                            </label>
                                        </div>
                                    )//focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                } */}

                                        <div re class="flex items-center space-x-3">
                                            {
                                                showColor.map((c, i) =>
                                                    <div
                                                        key={i}
                                                        onClick={
                                                            () => {
                                                                setTextColor(c.name)
                                                                setColorChoose(c._id)
                                                            }
                                                        }
                                                        className={`transform 
                                                ${colorChoose === c._id
                                                                ? 'shadow-2xl -translate-y-1 outline-none ring-2 ring-offset-2 ring-indigo-350'
                                                                : ''
                                                            }
                                                shadow-inner h-10 w-10 rounded-md ${c.colorcode}`}>
                                                    </div>
                                                )//focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                            }
                                        </div>
                                        {
                                            isEmptyColor === 1 ? (textColor.length === 0 &&
                                                (<div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md" role="alert">
                                                    Bạn chưa chọn màu
                                                </div>)
                                            ) : null
                                        }
                                    </fieldset>
                                </div>

                                <div class="mt-10">
                                    <div class="flex items-center justify-between">
                                        <h3 class="text-sm text-gray-900 font-medium">Size</h3>
                                        <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                                    </div>

                                    <fieldset class="mt-4">
                                        <legend class="sr-only">
                                            Choose a size
                                        </legend>
                                        <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {/* Use of SIZE OUT OF STOCK */}

                                            {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                                            {/* <label class="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-gray-50 text-gray-200 cursor-not-allowed">
                                            <input type="radio" name="size-choice" value="XXS" disabled class="sr-only" aria-labelledby="size-choice-0-label" />
                                            <p id="size-choice-0-label">
                                                XXS
                                            </p>

                                            <div aria-hidden="true" class="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none">
                                                <svg class="absolute inset-0 w-full h-full text-gray-200 stroke-2" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                                    <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                                                </svg>
                                            </div>
                                            </label> */}

                                            {/* <!-- Active: "ring-2 ring-indigo-500" --> */}


                                            {
                                                showSize.map((c, i) => {
                                                    return <label key={i}
                                                        onClick={() => {
                                                            setSizeChoosee(c._id)
                                                            setTextSize(c.name)
                                                        }}
                                                        class={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase 
                                                focus:outline-none 
                                            sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer 
                                            ${sizeChoose === c._id ? 'bg-gray-200' : ''}
                                            `}>
                                                        <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label" />
                                                        <p id="size-choice-1-label">
                                                            {c.sizecode}
                                                        </p>
                                                        <div class="absolute -inset-px rounded-md pointer-events-none" aria-hidden="true"></div>
                                                    </label>
                                                })
                                            }


                                            {/* <!--
                                            Active: "border", Not Active: "border-2"
                                            Checked: "border-indigo-500", Not Checked: "border-transparent"
                                            --> */}

                                        </div>
                                        {
                                            isEmptySize ? (textSize.length === 0 && (
                                                <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md" role="alert">
                                                    Bạn chưa chọn size
                                                </div>)) : null
                                        }
                                    </fieldset>
                                </div>

                                <div onClick={addToCartHandler} class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add to bag</div>
                            </form>
                        </div>

                        <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <div>
                                <h3 class="sr-only">Description</h3>

                                <div class="space-y-6">
                                    <p class="text-base text-gray-900">
                                        {product.desc}</p>
                                </div>
                            </div>

                            <div class="mt-10">
                                <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

                                <div class="mt-4">
                                    <ul role="list" class="pl-4 list-disc text-sm space-y-2">
                                        <li class="text-gray-400"><span class="text-gray-600">Hand cut and sewn locally</span></li>

                                        <li class="text-gray-400"><span class="text-gray-600">Dyed with our proprietary colors</span></li>

                                        <li class="text-gray-400"><span class="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>

                                        <li class="text-gray-400"><span class="text-gray-600">Ultra-soft 100% cotton</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mt-10">
                                <h2 class="text-sm font-medium text-gray-900">Details</h2>

                                <div class="mt-4 space-y-6">
                                    <p class="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ItemScreen
