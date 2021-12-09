import logo from './logo.svg'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "./components/navbar.component"
import Sidebar from "./components/layouts/sidebar.component"

import ProductsList from "./components/product/products-list.component"
import OrdersList from "./components/order/orders-list.component"
import CategoriesList from "./components/category/categories-list.component"
import CustomersList from "./components/customer/customers-list.component"
import OrdersDetailList from "./components/orderdetail/ordersdetail-list.component"

import EditProduct from "./components/product/edit-product.component"
import EditOrder from "./components/order/edit-order.component"
import EditCategory from "./components/category/edit-category.component"
import EditCustomer from "./components/customer/edit-customer.component"
import EditOrderDetail from "./components/orderdetail/edit-orderdetail.component"

import CreateProduct from "./components/product/create-product.component"
import CreateCategory from "./components/category/create-category.component"
import CreateOrder from "./components/order/create-order.component"
import CreateCustomer from "./components/customer/create-customer.component"
import CreateOrderDetail from "./components/orderdetail/create-orderdetail.component"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="row">
        <div className="col-sm-2">
          <Sidebar />
        </div>

        <div className="col-sm-10"> 
          <Route path="/products" component={ProductsList} />
          <Route path="/orders" component={OrdersList} />
          <Route path="/categories" component={CategoriesList} /> 
          <Route path="/customers" component={CustomersList} /> 
          <Route path="/orders-detail" component={OrdersDetailList} /> 

          <Route path="/edit/product/:id" component={EditProduct} />
          <Route path="/edit/order/:id" component={EditOrder} />
          <Route path="/edit/category/:id" component={EditCategory} />
          <Route path="/edit/customer/:id" component={EditCustomer} />
          <Route path="/edit/order-detail/:id" component={EditOrderDetail} />

          <Route path="/create-product" component={CreateProduct} />
          <Route path="/create-category" component={CreateCategory} />
          <Route path="/create-order" component={CreateOrder} />
          <Route path="/create-customer" component={CreateCustomer} />
          <Route path="/create-orderdetail" component={CreateOrderDetail} />
          <ToastContainer />          
        </div>
      </div>
    </Router>
  );
}

export default App;
