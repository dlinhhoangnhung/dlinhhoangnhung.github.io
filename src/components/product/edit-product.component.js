import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'
import UserService from "../services/user.service";
import authHeader from '../services/auth-header';
import { stringify } from "postcss";
import FormData from 'form-data'
import UploadService from '../services/file-upload.service'
import Select from 'react-select';
import { includes } from "lodash";
import { objectOf } from "prop-types";
var _ = require('lodash');

export default class EditProduct extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeCateId = this.onChangeCateId.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangethumbnail = this.onChangethumbnail.bind(this)
        // this.onChangeImages = this.onChangeImages.bind(this)
        this.selectFiles = this.selectFiles.bind(this)
        this.uploadImages = this.uploadImages.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
        this.handleMultiChangeColor = this.handleMultiChangeColor.bind(this);
        this.handleMultiChangeSize = this.handleMultiChangeSize.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileChange1 = this.onFileChange1.bind(this);


        this.state = {
            name: '',
            desc: 'a',
            cateid: '',
            price: 'A1',
            isDeleted: 0,
            index: 0,
            categories: [],

            selectedFiles: undefined,
            previewImages: [],
            progressInfos: [],
            message: [],

            imageInfos: [],

            imagesPre: [],
            images: [],
            thumbnail: '',

            colors: [], // full table color
            colorid: '',  // from table
            colorname: '', // from table 
            colorcode: '', // from table
            colorslist: [], // specific color

            sizes: [], // full table color
            sizeid: '', // from table
            sizename: '', // from table
            sizecode: '', // from table
            sizeslist: [],// specific size

            showColor: [],
            showSize: [],




            isRedirect: 0
        }
    }


    componentDidMount() {
        UserService.getCategories()
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        categories: response.data,
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        UserService.getSingleProduct(this.props.match.params.id)
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
            })
            .catch(err => {
                console.log(err);
            })

        UserService.getColors()
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

        UserService.getSizes()
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

    // async handleMultiChangeColor(option) {
    //     var tableColor = this.state.colors // chuoi color object
    //     console.log('tablecolor:  ' + tableColor[0]._id)
    //     var onSelectColor = option.value  // id cua color dc chon 
    //     console.log('onSelectColor:  ' + onSelectColor)



    //     // duyet lay object color tu mang colors

    //     // for (const key of Object.keys(tableColor)) {
    //     //     console.log('1')
    //     //     if (tableColor[key].includes(option.value)) {
    //     //         console.log('tim`:  ' + tableColor[key])
    //     //         return a = tableColor[key]
    //     //     }
    //     //     else {
    //     //         console.log('null`')
    //     //         return null
    //     //     }
    //     // }

    //     const b = tableColor.map((function (tab) {
    //         if (tab._id === onSelectColor) {
    //             console.log(tab)
    //             return tab
    //         }
    //         else return null
    //     }))

    //     // const a = tableColor.filter(obj =>
    //     //     Object.keys(obj)
    //     //         .some(key => console.log(obj[key]._id === onSelectColor))
    //     // );

    //     // console.log("a" + a)

    //     // neu object do trung mau voi 1 trong object trong showColor => loc'

    //     // const filterColor = this.state.showColor.map((function (f) {
    //     //     if (f._id !== b._id) {
    //     //         console.log('alo b:  '+b)
    //     //         return b
    //     //     } else {
    //     //         return null
    //     //     }
    //     // }))

    //     if (!this.state.showColor.includes(b)) {
    //         this.setState(prevState => ({
    //             showColor: [...prevState.showColor, b]
    //         }))
    //     }



    //     // // from id color get whole object color

    //     // if (option.value !== -1) {
    //     //     var filterSelectObject = await _.intersectionWith(tableColor, onSelectColor, function (o1, o2) {
    //     //         console.log('have value')

    //     //         return o1['id'] === o2['_id']
    //     //     });
    //     // }


    //     // console.log('filterAeclect: ' + filterSelectObject)

    //     // //filter color same value and push to showColor
    //     // var finalFilterObject = await _.intersectionWith(this.state.showColor, filterSelectObject, function (o1, o2) {
    //     //     return o1['id'] === o2['_id']
    //     // });
    //     // console.log("final filter:  " + finalFilterObject)



    //     // var joined = await this.state.colorslist.push(option.value);

    //     // // if (!this.state.colorslist.includes(option.value)) {
    //     //     this.setState({ colorslist: joined })
    //     // // }

    //     if (this.state.colorslist.length > 0) {
    //         this.setState({
    //             isShow1: 1
    //         })
    //     }
    //     console.log(option.label)
    //     console.log(this.state.showColor)
    // }

    async handleMultiChangeColor(option) {
        if (this.state.colorslist.includes(option.value) === false) {
            await this.setState(prevState =>
            ({
                colorslist: [...prevState.colorslist, option.value],
            }))
            await this.getProductColor()
        }

        console.log(option.label)
        console.log("colorslist: ")
        console.log(this.state.colorslist)
    }

    async getProductColor() {
        var Obj1 = this.state.colors
        console.log('Obj1 :  ' + Obj1);

        var Obj2 = this.state.colorslist
        console.log('Obj2 :  ' + Obj2);

        var Obj3 = Obj1.filter(f => Obj2.includes(f._id));
        console.log('Obj3:  ' + Obj3);


        await this.setState(prevState =>
        ({
            showColor: Obj3,
        })
        )

        //  {id:1, name:'Sandra'}
    }
    async handleMultiChangeSize(option) {
        if (this.state.sizeslist.includes(option.value) === false) {
            await this.setState(prevState =>
            ({
                sizeslist: [...prevState.sizeslist, option.value],
            }))
            await this.getProductSize()
        }

        console.log(option.label)
        console.log("sizeslist: ")
        console.log(this.state.sizeslist)

    }

    async getProductSize() {
        var Obj1 = this.state.sizes
        console.log('Obj1 :  ' + Obj1);

        var Obj2 = this.state.sizeslist
        console.log('Obj2 :  ' + Obj2);

        var Obj3 = Obj1.filter(f => Obj2.includes(f._id));
        console.log('Obj3:  ' + Obj3);

        await this.setState(prevState =>
        ({
            showSize: Obj3,
        })
        )
        console.log('size:  ' + Obj3);

    }

    // Get specific color &  size of item



    /* -------------------------------------------------------------------------- */


    isChangColor() {
        console.log('work')

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
        this.setState({
            price: p.target.value
        })
    }

    onChangethumbnail(p) {
        this.setState({
            thumbnail: p.target.files[0]
        })
    }

    // onChangeImages(p) {
    //     this.setState({
    //         images: p.target.files
    //     })
    // }


    selectFiles(e) {
        let imgs = [];

        for (let i = 0; i < e.length; i++) {
            imgs.push(URL.createObjectURL(e[i]))
        }

        this.setState({
            progressInfos: [],
            message: [],
            selectedFiles: e,
            previewImages: imgs
        });
    }

    uploadImages() {
        const selectedFiles = this.state.selectedFiles;

        let _progressInfos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }

        this.setState(
            {
                progressInfos: _progressInfos,
                message: [],
            },
            () => {
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.upload(i, selectedFiles[i]);
                }
            }
        );
    }

    onFileChange(e) {
        this.selectFiles(e.target.files)
        this.setState({
            imagesPre: e.target.files,
        });
    }

    onFileChange1(e) {


        this.setState({
            thumbnail: e.target.files[0],
        });

        // this.setState({ images: e.target.files })
        // this.setState({ images: e.target.files })
    }
    upload(idx, file) {
        let _progressInfos = [...this.state.progressInfos];

        // UploadService.upload(file, (event) => {
        //     _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
        //     this.setState({
        //         progressInfos: _progressInfos,
        //     });
        // })
        let formData = new FormData();

        formData.append("images", file);

        return axios.patch(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Uploaded the image successfully: " + file.name];
                    return {
                        message: nextMessage
                    };
                });

                return UploadService.getFiles();
            })
            .then((files) => {
                this.setState({
                    imageInfos: files.data,
                });
            })
            .catch(() => {
                _progressInfos[idx].percentage = 0;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Could not upload the image: " + file.name];
                    return {
                        progressInfos: _progressInfos,
                        message: nextMessage
                    };
                });
            });
    }
    changeHandler = (e) => {
        const el = e.target
        this.setState({
            images: el.type === "file" ? el.files[0] : el.value
        })
    }

    onTest = async (p) => {
        const formData = new FormData()

        for (const key of Object.keys(this.state.images)) {
            formData.append("images", this.state.images[key])
        }

        await axios.patch(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id,
            { headers: { "Content-type": "multipart/form-data" } })
            .then(res => {
                console.log("res.data: " + res.data)
                toast("Edit successfully !", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            },
                error => {
                    console.log(error);
                })
    }

    onSubmit = async (p) => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        p.preventDefault();
        const formData = new FormData()

        for (const key of Object.keys(this.state.imagesPre)) {
            formData.append('images', this.state.imagesPre[key])
        }
        console.log("colorslist:  " + this.state.colorslist.length)
        for (const key of Object.keys(this.state.colorslist)) {
            await formData.append('colorslist', this.state.colorslist[key])
        }

        console.log("sizeslist:  " + this.state.sizeslist.length)
        for (const key of Object.keys(this.state.sizeslist)) {
            await formData.append('sizeslist', this.state.sizeslist[key])
        }

        formData.append('thumbnail', this.state.thumbnail)
        formData.append('name', this.state.name)
        formData.append('desc', this.state.desc)
        formData.append('cateid', this.state.cateid)
        formData.append('price', this.state.price)

        // formData.append("thumbnail", this.state.thumbnail)

        console.log(formData + "  formData in: ")

        // await axios.patch(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, formData, authHeader(),
        // await UserService.updateProduct(formData, this.props.match.params.id)
        // { headers: { "Content-type": "multipart/form-data" } })



        await axios.patch(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': user.token
            }
        })
            .then(res => {
                console.log("res.data: " + res.data)
                toast("Edit successfully !", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            },
                error => {
                    console.log(error);
                })
    }

    // imageGallery() { //vcl
    //     return this.state.images && this.state.images.map((img, index) => {
    //         return
    //         <div class="small-image-gallery" key={index}>
    //             <img src={`./assets/imgs/products/${this.state.images}`} />
    //         </div>
    //     })
    // }


    handleTab = i => {
        // console.log(ind)
        this.setState({
            index: i
        })
    }

    async removeColor(e) {
        console.log("select:  " + e)

        var filterColor = await this.state.showColor.filter(p => p._id !== e)  // filter ham` show
        console.log('con lai :  ' + filterColor)

        var Obj1 = this.state.colorslist
        console.log('Obj1 :  ' + Obj1);

        console.log('loc voi :  ' + filterColor)

        var Obj3 = filterColor.filter(f => Obj1.includes(f._id));  // filter ham` id luu

        var getId = Obj3.map(e => {  //get id from object
            return e._id
        })
        console.log(getId)

        console.log('Obj3:  ' + Obj3)

        this.setState({
            showColor: filterColor,
            colorslist: getId
        })
        // var arr = [1, 2, 3, 4],
        //     brr = [2, 4],
        //     res = arr.filter(f => brr.includes(f));
        // console.log(res);

    }

    async removeSize(e) {
        console.log('select: ' + e)

        const filterSize = await this.state.showSize.filter(p => p._id !== e)
        console.log('remvove: ' + filterSize)

        var Obj1 = this.state.sizeslist
        console.log('Obj1 :  ' + Obj1);

        var Obj3 = filterSize.filter(f => Obj1.includes(f._id));  // filter ham` id luu

        var getId = Obj3.map(e => {  //get id from object
            return e._id
        })
        console.log(getId)

        console.log('Obj3:  ' + Obj3)

        this.setState({
            showSize: filterSize,
            sizeslist: getId
        })
    }

    render() {
        let options = this.state.colors.map(function (c) {
            return { value: c._id, label: c.name };
        })

        let options2 = this.state.sizes.map(function (c) {
            return { value: c._id, label: c.name };
        })
        console.log('render');

        console.log(this.state.images);

        console.log(this.state.previewImages);

        const { index, selectedFiles, previewImages, progressInfos, message, imageInfos, images } = this.state
        return (
            <form onSubmit={this.onSubmit}>
                <div className="h-screen">
                    <div className="pt6">
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
                                        Edit Product
                                    </a>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div class="antialiased pt-10">
                        <div class="py-6">
                            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                                <div class="flex flex-col md:flex-row -mx-4">
                                    <div class="md:flex-1 px-4">
                                        <div x-data="{ image: 1 }" x-cloak>
                                            <div class="h-48 md:h-80 rounded-lg bg-gray-100 mb-4">
                                                <div x-show="image === 1" class="h-48 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                                    {/* <span class="text-5xl">1</span> */}
                                                    <img src={`./assets/imgs/products/${images[index]}`} />

                                                    {/* <img src={this.state.previewImages[index]} /> */}
                                                </div>

                                                <div className="images-gall">
                                                    {
                                                        images.length > 0 ? (images.map((i, index) =>
                                                            <img
                                                                key={index}
                                                                class="small-image-gallery"
                                                                src={`./assets/imgs/products/${i}`}
                                                                onClick={() => this.handleTab(index)}
                                                            />
                                                        )) : 'null'
                                                    }
                                                </div>
                                                <div className="inrow">
                                                    <div className="incol">
                                                        <label class="leading-loose">Choose Images: </label>
                                                        <label
                                                            class=" flex flex-col w-2/3 h-18 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                            <div class="flex flex-col items-center  justify-center ">
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

                                                    <div className="incol">
                                                        <label class="leading-loose">Choose Thumbnail: </label>
                                                        <label
                                                            class=" flex flex-col w-2/3 h-18 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                            <div class="flex flex-col items-center  justify-center ">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                </svg>
                                                                <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                    Choose Thumbnail here</p>
                                                            </div>
                                                            <input type="file" name="thumbnail" onChange={this.onFileChange1} />
                                                        </label>
                                                    </div>
                                                </div>

                                                {
                                                    previewImages.length > 0 && <p class="mb-3 text-orange-300 pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Preview Images</p>
                                                }
                                                <div className="images-gall">
                                                    {previewImages && previewImages.map((img, i) => {
                                                        return <img
                                                            className="small-image-gallery"
                                                            src={img}
                                                            alt={"image-" + i}
                                                            key={i}
                                                            onClick={() => this.handleTab(i)} />
                                                    })}
                                                </div>
                                                {progressInfos &&
                                                    progressInfos.map((progressInfo, index) => (
                                                        <div className="mb-2" key={index}>
                                                            <span>{progressInfo.fileName}</span>
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar progress-bar-info"
                                                                    role="progressbar"
                                                                    aria-valuenow={progressInfo.percentage}
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"
                                                                    style={{ width: progressInfo.percentage + "%" }}
                                                                >
                                                                    {progressInfo.percentage}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}


                                                {message.length > 0 && (
                                                    <div className="alert alert-secondary" role="alert">
                                                        <ul>
                                                            {message.map((item, i) => {
                                                                return <li key={i}>{item}</li>;
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}


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
                                    <div class="mb-32 md:flex-1 px-4">
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

                                        <div className="inrow space-x-32">
                                            <div class="flex items-center space-x-4 my-4">
                                                <div>
                                                    <div class="flex flex-col">
                                                        <label class="leading-loose">Choose Category: </label>
                                                        <select
                                                            required
                                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                            value={this.state.cateid}
                                                            onChange={this.onChangeCateId}>
                                                            {
                                                                this.state.categories.map(function (category) {
                                                                    return <option className="" key={category._id} value={category._id}>
                                                                        {category.name}
                                                                    </option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="flex items-center space-x-4 my-4">
                                                <div>
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
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="leading-loose">Color: </label>
                                            <div className="incol space-y-3">
                                                <Select
                                                    // styles={styles}
                                                    name="form-field-name"
                                                    value={this.state.colorslist}
                                                    onChange={this.handleMultiChangeColor}
                                                    labelKey='name'
                                                    valueKey='_id'
                                                    // closeMenuOnSelect={false}
                                                    // components={animatedComponents}
                                                    options={options}
                                                />
                                            </div>
                                            <div
                                                className="pt-2 inrow space-x-2 ">
                                                {
                                                    this.state.showColor.map((c, i) =>
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
                                            <div class="flex flex-col ">
                                                <label class="leading-loose">Size: </label>
                                                <Select
                                                    // styles={styles}
                                                    name="form-field-name"
                                                    value={this.state.sizeslist}
                                                    onChange={this.handleMultiChangeSize}
                                                    labelKey='name'
                                                    valueKey='_id'
                                                    // closeMenuOnSelect={false}
                                                    // components={animatedComponents}
                                                    options={options2}
                                                />

                                                <div className="pt-2 space-x-2 incol">
                                                    {
                                                        this.state.showSize.map((c, i) =>
                                                            <label
                                                                onClick={() => this.removeSize(c._id)}
                                                                key={i}
                                                                class="w-1/2 group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase 
                                                                    sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer ring-1 ring-black">
                                                                {/* <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label" /> */}
                                                                <p id="size-choice-1-label">
                                                                    {c.sizecode}
                                                                </p>
                                                                <div class="absolute -inset-px rounded-md pointer-events-none" aria-hidden="true"></div>
                                                            </label>
                                                        )
                                                    }
                                                </div>

                                            </div>


                                        </div>


                                        <div class="flex flex-col">
                                            <label class="leading-loose">Description: </label>
                                            <input
                                                required
                                                value={this.state.desc}
                                                onChange={this.onChangeDesc}
                                                type="text"
                                                class="h-22 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Optional" />
                                        </div>
                                        <div>

                                            <input
                                                type="submit"
                                                value="Edit"
                                                class=" w-3/5 px-6 py-2 mt-10 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                            />
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div >
                    </div >
                </div>
            </form >


        )
    }
}



// <div class="flex py-4 space-x-4">
// <div class="relative">
//     {/* file upload */}

//     <div class="flex items-center justify-center w-50 h-40">
//         <label
//             class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
//             <div class="flex flex-col items-center justify-center pt-7">
//                 <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
//                     Thumbnail</p>
//             </div>
//             <input
//                 type="file"
//                 name="thumbnail"
//                 onChange={this.onChangethumbnail}
//             />
//         </label>
//         <div>
//             <button
//                 className="btn btn-success btn-sm"
//                 disabled={!selectedFiles}
//                 onClick={this.uploadImages}
//             >
//                 Upload
//             </button>
//         </div>
//     </div>

//     <div class="flex items-center justify-center w-30 h-20">
//         <label
//             class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
//             <div class="flex flex-col items-center justify-center pt-7">
//                 <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
//                     Images</p>
//             </div>
//             <input
//                 className="items-center"
//                 type="file"
//                 name="images"
//                 onChange={this.selectFiles}
//                 multiple accept="image/*" />
//         </label>
//         <div>
//             <button
//                 className="btn btn-success btn-sm"
//                 disabled={!selectedFiles}
//                 onClick={this.uploadImages}
//             >
//                 Upload
//             </button>
//         </div>
//     </div>
// </div>
// </div>