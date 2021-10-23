import axios from 'axios';
import { toast } from 'react-toastify';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5001/users/api';

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + '/grant');
  // }

  getUserBoard() {
    return axios.get(API_URL + '/profile', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }

  getProduct() {
    return axios.get(API_URL + '/products/');
  }

  addProduct() {
    return axios.get(API_URL + '/products/', { headers: authHeader() });
  }

  updateProduct() {
    return axios.post(API_URL + '/products/', { headers: authHeader() });
  }

  getCategory() {
    return axios.get(API_URL + '/categories/');
  }
  updateCategory() {
    return axios.post(API_URL + '/categories/', { headers: authHeader() });
  }


  addImage() {
    return axios.post(API_URL + '/products-image/add', { headers: authHeader() });
  }

  getUser() {
    return axios.get('http://localhost:5001/users/users', { headers: authHeader() });
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