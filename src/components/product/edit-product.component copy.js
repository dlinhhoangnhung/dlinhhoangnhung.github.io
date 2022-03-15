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

        this.state = {
            name: '',
            desc: 'a',
            cateid: '',
            price: 'A1',
            thumbnail: 'ads',
            isDeleted: 0,
            index: 0,
            categories: [],

            selectedFiles: undefined,
            previewImages: [],
            progressInfos: [],
            message: [],

            imageInfos: [],

            isRedirect: 0
        }
    }


    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    products: response.data,
                    name: response.data.name,
                    desc: response.data.desc,
                    cateid: response.data.cateid,
                    price: response.data.price,
                    thumbnail: response.data.thumbnail,
                    imageInfos: response.data.images,
                    isDeleted: response.data.isDeleted
                })
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(process.env.REACT_APP_SERVER_HOST + '/users/api/categories')
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
        let images = [];

        for (let i = 0; i < e.target.files.length; i++) {
            images.push(URL.createObjectURL(e.target.files[i]))
        }

        this.setState({
            progressInfos: [],
            message: [],
            selectedFiles: e.target.files,
            previewImages: images
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

    submitUploadImages(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
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

        return axios.post(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, formData, {
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

    // onSubmit = async (p) => {
    //     const user = JSON.parse(localStorage.getItem('userInfo'));

    //     p.preventDefault();
    //     const formData = new FormData()

    //     for (const key of Object.keys(this.state.images)) {
    //         formData.append("images", this.state.images[key])
    //     }
    //     formData.append("thumbnail", this.state.thumbnail)

    //     console.log(formData + "  formData in: ")
    //     const product = {
    //         name: this.state.name,
    //         desc: this.state.desc,
    //         cateid: this.state.cateid,
    //         price: this.state.price,
    //         thumbnail: this.state.thumbnail,
    //         images: this.state.images,
    //     }

    //     await axios.patch(process.env.REACT_APP_SERVER_HOST + '/users/api/products/' + this.props.match.params.id, product,
    //         { headers: { "Content-type": "multipart/form-data" } })
    //         .then(res => {
    //             console.log("res.data: " + res.data)
    //             toast("Edit successfully !", {
    //                 type: "warning"
    //             })
    //             this.setState({
    //                 isRedirect: 1
    //             })
    //         },
    //             error => {
    //                 console.log(error);
    //             })
    // }

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

    render() {
        const { index, selectedFiles, previewImages, progressInfos, message, imageInfos } = this.state
        if (this.state.isRedirect) return <Redirect to='/products' />
        return (
            <form onSubmit={this.onSubmit} action="/multiple-upload" method="PATCH" encType="multipart/form-data">
                <div class="antialiased">
                    <div class="py-6">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                            <div class="flex flex-col md:flex-row -mx-4">
                                <div class="md:flex-1 px-4">
                                    <div x-data="{ image: 1 }" x-cloak>
                                        <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                            <div x-show="image === 1" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                                {/* <span class="text-5xl">1</span> */}
                                                <img src={`./assets/imgs/products/${this.state.imageInfos[index]}`} />
                                                {/* <img src={this.state.previewImages[index]} /> */}
                                            </div>

                                            <div className="images-gall">
                                                {
                                                    imageInfos.map((i, index) =>
                                                        <img
                                                            key={index}
                                                            class="small-image-gallery"
                                                            src={`./assets/imgs/products/${i}`}
                                                            onClick={() => this.handleTab(index)}
                                                        />
                                                    )
                                                }
                                            </div>

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
                                <div class="md:flex-1 px-4">
                                    <input
                                        class="mb-2 capitalize leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl"
                                        type="text"
                                        required
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        placeholder={this.state.name} />
                                    <p class="text-gray-500 text-sm"><select
                                        required
                                        className="capitalize text-grey-600 hover:underline ml-4 text-base"
                                        value={this.state.cateid}
                                        onChange={this.onChangeCateId}>
                                        {
                                            this.state.categories.map(function (category) {
                                                return <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            })
                                        }
                                    </select></p>

                                    <div class="flex items-center space-x-4 my-4">
                                        <div>
                                            <div class="rounded-lg  flex py-2 px-3 w-3/5">
                                                <input
                                                    class="text-center font-bold text-indigo-600 text-2xl w-full"
                                                    type="text"
                                                    required
                                                    className
                                                    ="form-control"
                                                    value={this.state.price}
                                                    onChange={this.onChangePrice}
                                                    placeholder={this.state.price}
                                                />
                                                <span class="text-indigo-400 mr-1 mt-1">đ</span>


                                            </div>
                                        </div>

                                    </div>

                                    <p class="text-gray-500">
                                        <input type="text"
                                            required
                                            value={this.state.desc}
                                            onChange={this.onChangeDesc}
                                            placeholder={this.state.desc}
                                        />

                                    </p>

                                    <div class="flex py-4 space-x-4">
                                        <div class="relative">
                                            {/* file upload */}

                                            <div class="flex items-center justify-center w-50 h-40">
                                                <label
                                                    class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                    <div class="flex flex-col items-center justify-center pt-7">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                            Thumbnail</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        name="thumbnail"
                                                        onChange={this.onChangethumbnail}
                                                    />
                                                </label>
                                                <div>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        disabled={!selectedFiles}
                                                        onClick={this.uploadImages}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="flex items-center justify-center w-30 h-20">
                                                <label
                                                    class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                    <div class="flex flex-col items-center justify-center pt-7">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                            Images</p>
                                                    </div>
                                                    <input
                                                        className="items-center"
                                                        type="file"
                                                        name="images"
                                                        onChange={this.selectFiles}
                                                        multiple accept="image/*" />


                                                </label>
                                                <div>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        disabled={!selectedFiles}
                                                        onClick={this.uploadImages}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                    <input
                                        type="submit"
                                        value="Edit"
                                        class="w-3/5 px-6 py-2 mt-10 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </form>


        )
    }
}