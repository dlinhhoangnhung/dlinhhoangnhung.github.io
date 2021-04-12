import logo from './logo.svg'
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./client.css"
import "./assets/temp/css/style.css"

import Loading from "./components/loading.component"
import Navbar from "./components/navbar.component"
import Register from './components/public/register/register.component';
import Login from './components/public/login/login.component'
import CreateProduct from './components/product/create-product.component'
import Admin from './components/admin/admin.component';


function Client() {
    return (
        <Router>
            <Navbar />
            <Route path="/admin" component={Admin} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/create-product" component={CreateProduct} />
            <ToastContainer />
        </Router>
    );
}

export default Client;
