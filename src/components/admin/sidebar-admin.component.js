import React, { Component, useEffect, useState } from "react";
import SideBar from '../../SideBar'
import CarouseBar from '../CarouseBar'
import Navbar from '../navbar.component'
import { getProducts as listProducts } from "../../redux/actions/productAction"
import { useDispatch, useSelector } from 'react-redux'
import SlideView from '../SlideView'
import SearchBar from '../SearchBar';
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { toast } from "react-toastify";
import Error from "../screens/errorScreen";

const PrivateSidebar = () => {
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProducts)
    const { products, loading, error } = getProducts

    const [searchValue, setSearchValue] = useState("");
    const [isError, setIsError] = useState(0);
    const filterNames = ({ name }) => {
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    };
    const [notify, setNotify] = useState(0)

    useEffect(() => {
        // dispatch(listProducts());
        const user = authService.getCurrentUser();
        if (user) {
            userService.getNewOrder(user.id)
                .then(
                    response => {
                        if (response.data.length > 0) {
                            setNotify(response.data.length)
                        }
                        console.log(response.data)
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
        else {
            toast("You are not login !", {
                type: "danger",
            });
            setIsError(1)
        }

    }, [dispatch]);

    return (
        isError ? <Error /> :
            (
                <div className="sidebar">
                    <div className="text-2xl">
                        Guccdesis
                    </div>
                    <div className="mt-11 h-26">
                        <ul>
                            {products && products.filter(filterNames).map((user) => {
                                return <li key={products.id}>
                                    {products.name}
                                </li>
                            })}
                        </ul>
                        <a href="/admin">
                            <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800">
                                <div><img src="img/Home.png" className="w-6 h-6 ml-1" /></div>
                                <div className="text-lg ml-2 mb-10">Home</div>
                            </div>
                        </a>
                        <a href="/admin-notifications">
                            <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                                <div><img src="img/Notification.png" className="w-6 h-6 ml-1" /></div>
                                <div className="inrow">
                                    <div className="text-lg ml-2 mb-10">Notifications</div>
                                    <div className="ml-3 mb-6 text-sm text-white text-center pt-1.5 h-8 w-8 rounded-full bg-red-600">{notify && notify}</div>
                                </div>
                            </div>

                        </a>
                    </div>
                    <div className="text-xs ml-4 mt-8 mb-2 text-gray-400 uppercase">Organization</div>
                    <div className="mt-4">

                        {/* onclick product ==1 */}
                        <a href="/admin-products">
                            <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                                <div><img src="img/FlyingStar.png" className="w-6 h-6 ml-1" /></div>
                                <div className="text-lg ml-2 mb-10">Items</div>
                            </div>
                        </a>
                        <a href="/admin-categories">
                            <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                                <div><img src="img/Coderwall.png" className="w-6 h-6 ml-1" /></div>
                                <div className="text-lg ml-2 mb-10">Categories</div>
                            </div>
                        </a>
                        <a href="/admin-orders">
                            <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                                <div><img src="img/Notepad.png" className="w-6 h-6 ml-1" /></div>
                                <div className="text-lg ml-2 mb-10">Orders</div>
                            </div>
                        </a>
                        <a href="/admin-users">
                            <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                                <div><img src="img/TallPerson.png" className="w-6 h-6 ml-1" /></div>
                                <div className="text-lg ml-2 mb-10">Users</div>
                            </div>
                        </a>
                    </div>
                </div>
            )
    )
}

export default PrivateSidebar
