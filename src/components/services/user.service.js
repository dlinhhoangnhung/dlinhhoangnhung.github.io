import axios from 'axios';
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
    return axios.get(API_URL + '/products', { headers: authHeader() });
  }

}

export default new UserService();