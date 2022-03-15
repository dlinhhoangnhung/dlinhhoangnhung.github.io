// onChoosing chua work de lam css active

import React, { Component } from 'react'
import userService from '../services/user.service'

var _ = require('lodash');

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.getProductColor = this.getProductColor.bind(this)
        this.getProductSize = this.getProductSize.bind(this)

        this.state = {
            name: '',
            images: '',
            desc: '',
            cateid: '',
            colorslist: [],
            sizeslist: [],

            colors: [],
            colorid: '',
            colorname: '',
            colorcode: '',

            chooseColor: '',
            chooseSize: '',

            sizes: [],
            sizeid: '',
            sizename: '',
            sizecode: '',

            price: '',
            // thumbnail: '',
            select: 0,

            categories: [],


            colororder: '', //color that user choose 
            sizeorder: '',

            showColor: [],
            showSize: [],
        }
    }

    handleTab = i => {
        console.log(i)
        // this.setState({
        //     index: i
        // })
    }

    componentDidMount() {
        userService.getSingleProduct(this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    images: response.data.images,
                    desc: response.data.desc,
                    cateid: response.data.cateid,
                    price: response.data.price,
                    sizeslist: response.data.sizeslist,
                    colorslist: response.data.colorslist,
                    thumbnail: response.data.thumbnail,
                })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })

        userService.getColors()
            .then(response => {
                this.setState({
                    colors: response.data,
                    colorid: response.data._id,
                    colorname: response.data.name,
                    colorcode: response.data.colorcode,
                })
                console.log(response.data)
                window.onload = this.getProductColor() //auto runfuction after load
                console.log('color')

            })
            .catch(err => {
                console.log(err);
            })

        userService.getSizes()
            .then(response => {
                this.setState({
                    sizes: response.data,
                    sizeid: response.data._id,
                    sizename: response.data.name,
                    sizecode: response.data.sizecode,

                    isShow: 1
                })
                console.log(response.data)
                window.onload = this.getProductSize() //auto runfuction after load
                console.log('size')

            })
            .catch(err => {
                console.log(err);
            })

    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            //make an API call here and update the state
            console.log('have data')
            this.getProductColor()
            this.getProductSize()
        }
    }

    async getProductSize() {
        var Obj1 = this.state.sizes // object
        console.log('Obj1 :  ' + Obj1);

        var Obj2 = this.state.sizeslist // id
        console.log('Obj2 :  ' + Obj2);

        // var Obj3 = _.differenceWith(Obj1, Obj2, function (o1, o2) {
        //     return o1['id'] === o2['_id']
        // });
        // var Obj3 = await _.intersectionWith(Obj1, Obj2, function (o1, o2) {
        //     return o1['id'] === o2['_id']
        // });


        var Obj3 = Obj1.filter(f => Obj2.includes(f._id));

        console.log(Obj3);
        this.setState({
            showSize: Obj3
        })


    }

    async getProductColor() {
        var Obj1 = this.state.colors
        console.log('Obj1 :  ' + Obj1);

        var Obj2 = this.state.colorslist
        console.log('Obj2 :  ' + Obj2);

        // var Obj3 = _.differenceWith(Obj1, Obj2, function (o1, o2) {
        //     return o1['id'] === o2['_id']
        // });
        // var Obj3 = await _.intersectionWith(Obj1, Obj2, function (o1, o2) {
        //     return o1['id'] === o2['_id']
        // });

        var Obj3 = Obj1.filter(f => Obj2.includes(f._id));

        console.log(Obj3);
        this.setState({
            showColor: Obj3
        })
        //  {id:1, name:'Sandra'}
    }

    // handleAddColor(option) {
    //     // create a clone of your array of players; don't modify objects on the state directly
    //     // const colors = this.state.showColor.slice(0);

    //     const colors = []

    //     colors.push(option);

    //     console.log("option.name  " + option.name)

    //     this.setState({
    //         colorsorder: colors,
    //     });
    // };
    render() {
        const { onChoosing, index, images, name, desc, price, colorid, sizeid, cateid, select } = this.state

        return (
            <div class="bg-gray-100">
                <div class="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" class="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div class="flex items-center">
                                    <a href="/admin" class="mr-2 text-sm font-medium text-gray-900">
                                        Dashboard
                                    </a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li>
                                <div class="flex items-center">
                                    <a href="/admin-products" class="mr-2 text-sm font-medium text-gray-900">
                                        Products List
                                    </a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li class="text-sm">
                                <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">
                                    {name}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                            <img
                                // onClick={() => this.handleTab(index)}
                                key={index}
                                src={`./assets/imgs/products/${images[0]}`}
                                alt="Two each of gray, white, and black shirts laying flat."
                                class="w-full h-full object-center object-cover" />
                        </div>
                        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                <img src={`./assets/imgs/products/${images[1]}`} alt="Model wearing plain black basic tee." class="w-full h-full object-center object-cover" />
                            </div>
                            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                <img src={`./assets/imgs/products/${images[2]}`} alt="Model wearing plain gray basic tee." class="w-full h-full object-center object-cover" />
                            </div>
                        </div>
                        <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                            <img src={`./assets/imgs/products/${images[3]}`} alt="Model wearing plain white basic tee." class="w-full h-full object-center object-cover" />
                        </div>
                    </div>

                    <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                {name}
                            </h1>
                        </div>

                        <div class="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 class="sr-only">Product information</h2>
                            <p class="text-3xl text-gray-900">{price} đ</p>

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
                                    <p class="sr-only">4 out of 5 stars</p>
                                    <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
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

                                        <div class="flex items-center space-x-3">
                                            {
                                                this.state.showColor.map((c, i) =>
                                                    <div key={i}
                                                        onClick={() => this.setState({
                                                            chooseColor: c._id,
                                                            colororder: c
                                                        })}
                                                        className={`transform 
                                                        ${this.state.chooseColor === c._id
                                                                ? 'shadow-2xl -translate-y-1 outline-none ring-2 ring-offset-2 ring-indigo-350'
                                                                : ''
                                                            }
                                                        shadow-inner h-10 w-10 rounded-md ${c.colorcode}`}>
                                                    </div>
                                                )//focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                            }
                                        </div>
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
                                                this.state.showSize.map((c, i) => {
                                                    return <label key={i}
                                                        onClick={() => this.setState({
                                                            chooseSize: c._id,
                                                            sizeorder: c
                                                        })}
                                                        class={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase 
                                                        focus:outline-none 
                                                    sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer 
                                                    ${this.state.chooseSize === c._id ? 'bg-gray-200' : ''}
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
                                    </fieldset>
                                </div>

                                <button class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add to bag</button>
                            </form>
                        </div>

                        <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <div>
                                <h3 class="sr-only">Description</h3>

                                <div class="space-y-6">
                                    <p class="text-base text-gray-900">
                                        {desc}</p>
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
            </div>

        )
    }
}
