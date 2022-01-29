import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'
import UserService from "../services/user.service";
import authHeader from "../services/auth-header";
import { func } from "prop-types";
import ChooseColor from "./select-color.component";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Styler } from "./styler.component";
import userService from "../services/user.service";

const animatedComponents = makeAnimated();

const styles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
}
export default class CreateProduct extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeCateId = this.onChangeCateId.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)

        this.onFileChange = this.onFileChange.bind(this)
        this.onThumbnailChange = this.onThumbnailChange.bind(this)
        this.handleTab = this.handleTab.bind(this)


        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.handleMultiChangeColor = this.handleMultiChangeColor.bind(this);
        this.handleMultiChangeSize = this.handleMultiChangeSize.bind(this);



        this.state = {
            name: '',
            desc: 'update..',
            cateid: '',
            price: '',
            images: [],
            thumbnail: '',
            index: 0,
            previewImages: [],

            isShow1: undefined,
            colorslist: [],
            colors: [],

            sizelistdata: [],
            isShow2: undefined,
            sizeslist: [],
            sizes: [],

            categories: [],

            selected: [],
            createImage: 0,
            isRedirect: 0,
            isDeleted: 0,

            colorsSelect: [],
            colorsid: [],

            sizesSelect: [],
            sizesid: []
        }
    }

    componentDidMount() {
        UserService.getCategories().then(
            response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        categories: response.data,
                        cateid: response.data[0]._id
                    })
                }
            },
            error => {
                console.log(error);
            }
        );

        UserService.getColors()
            .then(
                response => {
                    this.setState({
                        isLoading: 0
                    })
                    if (response.data.length > 0) {
                        console.log(response.data)
                        this.setState({
                            colors: response.data,
                        })
                    }
                    console.log(this.state.colors)

                },
                error => {
                    console.log(error);
                }
            );

        UserService.getSizes()
            .then(
                response => {
                    this.setState({
                        isLoading: 0
                    })
                    if (response.data.length > 0) {
                        console.log(response.data)
                        this.setState({
                            sizes: response.data,
                        })
                    }
                    console.log(this.state.sizes)

                },
                error => {
                    console.log(error);
                }
            );
    }

    async handleMultiChangeColor(option) {
        // var joined = await this.state.colorslist.push(option.value);

        // joined.filter((item, index) => joined.indexOf(item) === index);
        await this.setState(prevState => ({
            colorslist: [...prevState.colorslist, option.value],
        }))

        // var joined = await this.state.colorslist.push(option.value);

        // // if (!this.state.colorslist.includes(option.value)) {
        //     this.setState({ colorslist: joined })
        // // }

        if (this.state.colorslist.length > 0) {
            this.setState({
                isShow1: 1
            })
        }
        console.log(option.label)
        console.log(this.state.isShow1)
        console.log(this.state.colorslist)
    }

    async handleMultiChangeSize(option) {
        // const newValuesArr = option ? option.map(item => item.value) : [];
        // this.setState({ sizeid: newValuesArr }, () => {
        //     console.log(this.state.sizeid);
        // });

        await this.setState(prevState => ({
            sizeslist: [...prevState.sizeslist, option.value],
            sizelistdata: [...prevState.sizelistdata, option]
        }))


        if (this.state.sizeslist.length > 0) {
            this.setState({
                isShow2: 1
            })
        }
        console.log(option.label)
        console.log(this.state.isShow1)
        console.log(this.state.sizelistdata)

    }

    handleClick(filterValue) {
        var index = this.state.selected.indexOf(filterValue);
        if (index === -1) {
            this.state.selected.push(filterValue);
        } else {
            this.state.selected.splice(index, filterValue);
        }
        // this.setState(function (s) {
        //     var colors = index === -1 ? (
        //         s.colors.concat([filterValue])
        //     ) : (
        //         s.colors.filter(function (filter, i) { return index !== i })
        //     );
        //     console.log("color: "+colors)

        //     return {
        //         colors: colors
        //     }
        // });
    }




    onChangeName(p) {
        this.setState({
            name: p.target.value
        })
    }

    onChangeDesc(p) {
        this.setState({
            desc: p.target.value
        })
    }

    onChangeCateId(p) {
        this.setState({
            cateid: p.target.value
        })
    }

    onChangePrice(p) {
            var x = p.target.value;
            x =  x.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            console.log(x);

        this.setState({
            price: x
        })
    }


    onFileChange(e) {


        this.setState({
            images: e.target.files,
        });

        // this.setState({ images: e.target.files })
        // this.setState({ images: e.target.files })
    }

    onThumbnailChange(e) {


        this.setState({
            thumbnail: e.target.files[0],
        });

        // this.setState({ images: e.target.files })
        // this.setState({ images: e.target.files })
    }

    onChangeIsDeleted(p) {
        this.setState({
            isDeleted: p.target.value
        })
    }

    onUpload = async (p) => {
        p.preventDefault()
        const formData = new FormData()
        const user = JSON.parse(localStorage.getItem('userInfo'));

        // [
        //     "618a504d2650cff025590d76,618a50542650cff025590d79,618a50742650cff025590d7f"
        // ], => give key and push each on to array 
        for (const key of Object.keys(this.state.images)) {
            formData.append('images', this.state.images[key])
        }

        // const filterColor = this.state.colorsSelect.filter((item, index) => this.state.colorsSelect.indexOf(item) === index);
        for (const key of Object.keys(this.state.colorsid)) {
            formData.append('colorslist', this.state.colorsid[key])
        }


        // const filterSize = this.state.sizesSelect.filter((item, index) => this.state.sizesSelect.indexOf(item) === index);
        for (const key of Object.keys(this.state.sizesid)) {
            formData.append('sizeslist', this.state.sizesid[key])
        }

        // var oldString = 'this, is my, string';
        // var mynewarray = oldString.split(',')
        formData.append('thumbnail', this.state.thumbnail)
        formData.append('name', this.state.name)
        formData.append('desc', this.state.desc)
        formData.append('cateid', this.state.cateid)
        formData.append('price', this.state.price)
        // formData.append('sizeslist', this.state.sizeslist)
        // formData.append('colorslist', this.state.colorslist)


        await axios.post('http://localhost:5001/users/api/products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': user.token
            }
        })
            .then(res => {
                console.log("res.data: " + res.data);
                <div>
                    <div
                        class="
                                my-3
                                block
                                text-sm text-left text-white
                                bg-green-500
                                h-12
                                flex
                                items-center
                                p-4
                                rounded-md
                            "
                        role="alert"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="w-6 h-6 mx-2 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        This is a default alert—check it out!
                    </div>
                </div>
                this.setState({
                    isRedirect: 1
                })
            },
                error => {
                    console.log(error);
                })
    }


    handleTab = i => {
        // console.log(ind)
        this.setState({
            index: i
        })
    }

    MyOptions = () => (
        <Select options={this.options}
            defaultValue={this.options[0]}
        />
    )


    async removeSize(e) {
        console.log("select:  " + e)

        const a = await this.state.sizesSelect.filter(p => p._id !== e)
        console.log('con lai :  ' + a)

        const id = await this.state.sizesid.filter(p => p !== e)
        console.log('con lai  id:  ' + id)

        await this.setState(prevState =>
        ({
            sizesSelect: a,
            sizesid: id
        }))

        console.log("after remove " + this.state.sizesSelect)
    }

    async removeColor(e) {
        console.log("select:  " + e)

        const a = await this.state.colorsSelect.filter(p => p._id !== e)
        console.log('con lai:  ' + a)

        const id = await this.state.colorsid.filter(p => p !== e)
        console.log('con lai id:  ' + id)

        this.setState(prevState =>
        ({
            colorsSelect: a,
            colorsid: id
        }))

        console.log("after remove " + this.state.colorsSelect)
    }

    render() {
        let options = this.state.colors.map(function (c) {
            return { value: c._id, label: c.name };
        })

        let options2 = this.state.sizes.map(function (c) {
            return { value: c._id, label: c.name };
        })

        // if (this.state.isRedirect) return <Redirect to='/admin-products' />
        const { index, previewImages } = this.state
        return (
            <form className="bg-gray-100 w-screen h-screen px-20 py-8" onSubmit={this.onUpload} >
                {/* <FilterContainer /> */}
                <div>
                    <div class="mb-5 w-1/2">
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
                            <span>Create Product</span>
                        </div>
                    </div>
                    <div className="inrow">
                        <div className=" rounded-md w-full  bg-white items-center h-full p-10 pl-16">
                            <div className="inrow space-x-2">
                                <div className="p-3 pr-4 incol w-1/2">
                                    <h2 class="flex flex-col ">
                                        <label class="leading-loose">Product's Name: </label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.onChangeName}
                                            value={this.state.name}
                                            class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Input here..." />
                                    </h2>
                                    <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div class="flex flex-col">
                                            <label class="leading-loose">Price: </label>
                                            <input
                                                type="text"
                                                required
                                                value={this.state.price}
                                                onChange={this.onChangePrice}
                                                class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Ex: 100000" />
                                        </div>

                                        <div class="flex flex-col">
                                            <label class="leading-loose">Description: </label>
                                            <input
                                                required
                                                value={this.state.desc}
                                                onChange={this.onChangeDesc}
                                                type="text"
                                                class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Optional" />
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="leading-loose">Choose Category: </label>
                                            <select
                                                required
                                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-60"
                                                value={this.state.cateid}
                                                onChange={this.onChangeCateId}>
                                                {
                                                    this.state.categories.map(function (category) {
                                                        return <option key={category._id} value={category._id}>
                                                            {category.name}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div className="mt-6">
                                            <label class="leading-loose">Choose Thumbnail: </label>
                                            <label
                                                class=" flex flex-col w-2/3 h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                <div class="flex flex-col items-center  justify-center pt-7">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Choose Thumbnail here</p>
                                                </div>
                                                <input type="file" name="images" onChange={this.onThumbnailChange} multiple />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 w-1/2">
                                    <div class="flex flex-col">
                                        <label class="leading-loose">Color: </label>
                                        <div className="incol space-y-3">
                                            {/* <Select
                                                // styles={styles}
                                                name="form-field-name"
                                                value={this.state.colorslist}
                                                onChange={this.handleMultiChangeColor}
                                                labelKey='name'
                                                valueKey='_id'
                                                // closeMenuOnSelect={false}
                                                // components={animatedComponents}
                                                options={options}
                                            /> */}
                                            <div className="pt-2 inrow space-x-2 ">
                                                {
                                                    this.state.colors.map((c, i) =>
                                                        c !== this.state.colorsSelect ?
                                                            (<div key={i}
                                                                onClick={async () => {
                                                                    if (this.state.colorsSelect.includes(c) === false) {
                                                                        await this.setState(prevState =>
                                                                        ({
                                                                            colorsSelect: [...prevState.colorsSelect, c],
                                                                            colorsid: [...prevState.colorsid, c._id]
                                                                        }))
                                                                        console.log(c.name)
                                                                    }
                                                                }}
                                                                className={`transform 
                                                            hover:-translate-y-1 
                                                            active:bg-gray-400
                                                            shadow-inner shadow-2xl h-10 w-10 rounded-md ${c.colorcode}`}>
                                                            </div>) : null
                                                    )
                                                }
                                            </div>
                                            {
                                                this.state.colorsSelect.length > 0 && <label class="leading-loose">Choosing: </label>
                                            }
                                            <div className="pt-2 inrow space-x-2 ">
                                                {
                                                    this.state.colorsSelect.length > 0 && this.state.colorsSelect.map((c, i) =>
                                                        <div key={i}
                                                            onClick={() => this.removeColor(c._id)}
                                                            className={`transform 
                                                                hover:-translate-y-1 
                                                                active:bg-gray-400
                                                                shadow-inner shadow-2xl h-10 w-10 rounded-md ${c.colorcode}`}>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mt-8 flex items-center space-x-4">
                                        <div class="flex flex-col ">
                                            <label class="leading-loose">Size: </label>
                                            {/* <Select
                                                value={this.state.sizeslist}
                                                onChange={this.handleMultiChangeSize}
                                                labelKey='name'
                                                valueKey='_id'
                                                options={options2} /> */}
                                            <div className="pt-2 inrow space-x-2 ">
                                                {
                                                    this.state.sizes.map((c, i) =>
                                                    // c !== this.state.sizesSelect ?
                                                    (<div key={i}
                                                        onClick={async () => {
                                                            if (this.state.sizesSelect.includes(c) === false) {
                                                                await this.setState(prevState =>
                                                                ({
                                                                    sizesSelect: [...prevState.sizesSelect, c],
                                                                    sizesid: [...prevState.sizesid, c._id]
                                                                }))
                                                                console.log(c.name)
                                                            }
                                                        }}
                                                        className="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase 
                                                                focus:outline-none 
                                                            sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer ">
                                                        <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label" />
                                                        <p id="size-choice-1-label">
                                                            {c.sizecode}
                                                        </p>
                                                    </div>)
                                                        // : null
                                                    )
                                                }
                                            </div>
                                            {
                                                this.state.sizesSelect.length > 0 && <label class="leading-loose">Choosing: </label>
                                            }
                                            <div div className="pt-2 inrow space-x-2 ">
                                                {
                                                    this.state.sizesSelect.length > 0 && this.state.sizesSelect.map((c, i) =>
                                                        <div key={i}
                                                            onClick={() => this.removeSize(c._id)}

                                                            className="group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase 
                                                            focus:outline-none 
                                                        sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer ">
                                                            <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label" />
                                                            <p id="size-choice-1-label">
                                                                {c.sizecode}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {/* <div class="relative focus-within:text-gray-600 text-gray-400">
                                        <input
                                            required
                                            value={this.state.sizes}
                                            onChange={this.onChangeSize}
                                            type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="S-M-L ,.." />

                                    </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="inrow">Preview Image</div>
                                    <div >
                                        {this.state.images && [...this.state.images].map((file) => (
                                            <div class="h-32 w-28 md:h-80 inrow rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                                <img src={URL.createObjectURL(file)} />
                                            </div>
                                        )
                                        )}
                                    </div>
                                    <div className="images-gall">
                                        {this.state.images.map((img, i) => {
                                            return <img
                                                className="small-image-gallery"
                                                src={URL.createObjectURL(img)}
                                                alt={"image-" + i}
                                                key={i}
                                                onClick={() => this.handleTab(i)} />
                                        })}
                                    </div> */}

                                    <div className="mt-12">
                                        <label class="leading-loose">Choose Images: </label>
                                        <label
                                            class=" flex flex-col w-2/3 h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                            <div class="flex flex-col items-center  justify-center pt-7">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                    Choose Images here</p>
                                            </div>
                                            <input type="file" name="images" onChange={this.onFileChange} multiple />
                                        </label>
                                    </div>

                                </div>


                            </div>
                            <button type="submit" value="Create" class="bg-blue-500  flex justify-center items-center w-full px-22 text-white px-4 py-3 rounded-md focus:outline-none">Create</button>

                        </div>


                    </div>
                </div>
            </form >)
    }
}