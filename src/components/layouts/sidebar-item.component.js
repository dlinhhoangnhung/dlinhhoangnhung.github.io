import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BorderColorIcon from '@material-ui/icons/BorderColor';

export const SidebarItem = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/"
    },
    {
        title: "Products",
        icon: <StoreIcon/>,
        link: "/products"
    },
    {
        title: "Orders",
        icon: <ReceiptIcon/>,
        link: "/orders"
    },
    {
        title: "Categories",
        icon: <LineWeightIcon/>,
        link: "/categories"
    },
    {
        title: "Customers",
        icon: <SupervisorAccountIcon/>,
        link: "/customers"
    },
    {
        title: "Orders Detail",
        icon: <BorderColorIcon/>,
        link: "/orders-detail"
    },
    {
        title: "Users",
        icon: <BorderColorIcon/>,
        link: "/users"
    },
]

