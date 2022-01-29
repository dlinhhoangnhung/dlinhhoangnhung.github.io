import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class ProductRow extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            checked: 0
        };
    }

    handleChange() {
        this.setState({
            checked: !this.state.checked
        })
        console.log(this.state.checked)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }

    render() {
        return (
            <tr className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        {/* {
                            check ? ( */}
                        <span
                            onClick={() => { this.props.deleteProduct(this.props.product._id) }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current stroke-1 text-red-400 hover:text-red-800 " viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        {/* ) :null
                        } */}
                        {/* CheckBox */}
                        {/* <label className="mt-3">
                            <input type="checkbox" className="form-checkbox text-red-600" checked={this.state.checked} onClick={this.handleChange} />
                        </label> */}

                        <div onClick={e => window.location.href = '/admin-view/product/' + this.props.product._id} className="flex-shrink-0 h-10 w-3/5 flex ">
                            <img className="h-10 w-10 ml-6 mb-2 rounded-md"
                                src={`http://localhost:3000/assets/imgs/products/${this.props.product.thumbnail}`}
                                alt="" />
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {this.props.product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {this.props.product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 ml-10 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{this.props.product.createdAt}</div>
                    {/* <div className="text-sm text-gray-500">IT</div> */}
                </td>
                <td className="px-6 py-4 space-x-4 ">
                    <Link to={"/edit/product/" + this.props.product._id}>
                        <span
                            className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full  bg-purple-100 text-purple-800 hover:bg-purple-400 w-20 h-7">
                            Edit
                        </span>
                    </Link>

                    <span
                        className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-500 hover:bg-blue-400 w-24 h-7">
                        Details
                    </span>
                </td>
            </tr>
        )
    }
}