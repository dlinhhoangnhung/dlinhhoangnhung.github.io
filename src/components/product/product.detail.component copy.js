import React, { Component } from 'react'
import userService from '../services/user.service'

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            images: '',
            desc: '',
            cateid: '',
            colorid: '',
            sizeid: '',
            price: '',
            // thumbnail: '',
            index: 0,
            categories: [],
        }
    }

    handleTab = i => {
        // console.log(ind)
        this.setState({
            index: i
        })
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
                    sizeid: response.data.sizeid,
                    colorid: response.data.colorid,
                    thumbnail: response.data.thumbnail,
                })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { index, images, thumbnail, name, desc, price, colorid, sizeid, cateid } = this.state
        console.log(this.state.thumbnail)
        return (
            <div class="antialiased" >
                <div class="bg-white shadow-sm sticky top-0">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
                        <div class="flex items-center justify-between md:justify-start">
                            <button type="button" class="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center">
                                <svg class="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        <div class="relative md:hidden">
                            <input type="search" class="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search" />

                            <svg class="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                    </div>
                </div>

                <div class="py-6">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex items-center space-x-2 text-gray-400 text-sm">
                            <a href="/admin" class="hover:underline hover:text-gray-600">Dashboard</a>
                            <span>
                                <svg class="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            <a href="/admin-products" class="hover:underline hover:text-gray-600">Products</a>
                            <span>
                                <svg class="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            <span>Product Detail</span>
                        </div>
                    </div>

                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                        <div class="ml-22 flex flex-col md:flex-row -mx-4">
                            <div class="md:flex-1 px-4">
                                <div x-data="{ image: 1 }" x-cloak>
                                    <div x-show="image === 1" class="h-screen md:h-2/3 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                        <img src={`./assets/imgs/products/${images[index]}`} className="pt-10 mb-4" />
                                    </div>

                                    <div class="flex -mx-2 mb-4">
                                        <template x-for="i in 4">
                                            <div class="flex-1 px-2">
                                                <button>
                                                    {/* x-on: click="image = i" : class ="{ 'ring-2 ring-indigo-300 ring-inset': image === i }" class ="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"> */}
                                                    <span x-text="i" class="text-2xl"></span>
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="md:flex-1 px-4">
                                <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{name}</h2>
                                <div className="incol">
                                    <p class="text-gray-500 text-2xl mt-8">Color</p>
                                    <div className="inrow space-x-2">
                                        {
                                            colorid && colorid.map(function (c) {
                                                return <div className={`h-10 w-10 rounded-md ${c}`}></div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4 my-4">
                                    <div>
                                        <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                                            <span class="text-indigo-400 mr-1 mt-1">đ</span>
                                            <span class="font-bold text-indigo-600 text-3xl">{price}</span>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-green-500 text-xl font-semibold">Save 12%</p>
                                        <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                                    </div>
                                </div>

                                <p class="text-gray-500">{desc}</p>

                                <div class="flex py-4 space-x-4">
                                    <div class="relative">
                                        <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
                                        <select class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>

                                        <svg class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>

                                    <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
