import axios from 'axios';
import { toast } from 'react-toastify';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5001/users/api';
const user = JSON.parse(localStorage.getItem('userInfo'));

class UserService {

  getUserBoard() {
    return axios.get(API_URL + '/profile', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }

  getColors() {
    return axios.get(API_URL + '/products-colors/');
  }
  getColor(id) {
    return axios.get(API_URL + '/products-colors/' + id);
  }

  getSizes() {
    return axios.get(API_URL + '/products-sizes/');
  }
  getSize(id) {
    return axios.get(API_URL + '/products-sizes/ ' + id);
  }
  getProducts() {
    return axios.get(API_URL + '/products/');
  }

  getSingleProduct(id) {
    return axios.get(API_URL + '/products/' + id);
  }

  addProduct(data) {
    return axios({
      method: 'post',
      data,
      url: API_URL + '/products/',
      headers: { "Authorization": `${user.token}` }
    })
  }

  updateProduct(data, id) {
    return axios.post(API_URL + '/products/' + id, data, { headers: authHeader() });
  }

  deleteProduct(id) {
    return axios.delete(API_URL + '/products/' + id, { headers: authHeader() });
  }

  getCategories() {
    return axios.get(API_URL + '/categories/');
  }
  updateCategory() {
    return axios.post(API_URL + '/categories/', { headers: authHeader() });
  }

  deleteCategory(id) {
    return axios.delete(API_URL + '/categories/' + id, { headers: authHeader() })
  }

  addImage() {
    return axios.post(API_URL + '/products-image/add', { headers: authHeader() });
  }

  getUser(id) {
    return axios.get('http://localhost:5001/users/user/' + id, { headers: authHeader() })
  }

  updateUser(id, data) {
    return axios.patch('http://localhost:5001/users/user/update-info/' + id, data, { headers: authHeader() })
  }

  changeEmail(id, data) {
    return axios.post('http://localhost:5001/users/user/change-email/' + id, data, { headers: authHeader() })
  }
  getUsers() {
    return axios.get('http://localhost:5001/users/users', { headers: authHeader() });
  }

  getOneUserAdmin(id) {
    return axios.get('http://localhost:5001/users/user/admin/' + id, { headers: authHeader() })
  }
  getNewOrder(adminId) {
    return axios.get('http://localhost:5001/users/api/orders/new-orders/' + adminId, { headers: authHeader() })
  }

  checkedOrder(id){
    return axios.get('http://localhost:5001/users/api/orders/new-order-checked/' + id, { headers: authHeader() })
  }

  getOrders() {
    return axios.get('http://localhost:5001/users/api/orders/', { headers: authHeader() })
  }
  getOrder(id) {
    return axios.get(API_URL + '/orders/' + id, { headers: authHeader() })
  }

  getOrdersbyUserId(id) {
    console.log(id)
    return axios.get(API_URL + '/orders/user/' + id, { headers: authHeader() })
  }

  
  getOrderDetails(data) {
    try {
      let result = axios.get(API_URL + '/orders/:id', { headers: authHeader() })
      if (result.error) {
        toast.error(result.error);
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  addOrder() {
    return axios.post(API_URL + '/orders/', { headers: authHeader() });
  }
}

export default new UserService();