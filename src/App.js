import logo from './logo.svg'
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "./components/navbar.component"
import ProductsList from "./components/product/products-list.component"
import OrdersList from "./components/order/orders-list.component"
import EditProduct from "./components/product/edit-product.component"
import EditOrder from "./components/order/edit-order.component"

import CreateProduct from "./components/product/create-product.component"
import CreateCategory from "./components/category/create-category.component"
import CreateOrder from "./components/order/create-order.component"
import Sidebar from "./components/layouts/sidebar.component"

function App() {
  return (
    <Router>
      <Navbar />
        <Sidebar />
      <Route path="/products" component={ProductsList} />
      <Route path="/orders" component={OrdersList} />
      <Route path="/edit/product/:id" component={EditProduct} />
      <Route path="/edit/order/:id" component={EditOrder} />

      <Route path="/create-product" component={CreateProduct} />
      <Route path="/create-category" component={CreateCategory} />
      <Route path="/create-order" component={CreateOrder} />
      <ToastContainer />
    </Router>
  );
}

export default App;
