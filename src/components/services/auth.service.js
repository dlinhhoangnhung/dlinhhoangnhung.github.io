import axios from "axios";
import { Redirect } from 'react-router';
import { toast } from "react-toastify";
import history from '../../history';

const API_URL = process.env.REACT_APP_SERVER_HOST + "/users/";

console.log("API_URL ", API_URL)

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "sign-in", {
        username,
        password
      })
      .then(response => { //response check
        if (response.data.token) { // if have token
        console.log("ok")

          localStorage.setItem("userInfo", JSON.stringify(response.data)); //set data from API decode it and name it 'user'
        }
        
        return response.data; // if not return any other data
      });
  }

  logout() {
    localStorage.removeItem("userInfo");
    history.push("/items");

  }

  register(username, email, password) {
    return axios.post(API_URL + "sign-up", {
      username,
      email,
      password
    });
  }

  getCurrentUserId() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo.id
     return userId
  }
  getCurrentUser() {
     return JSON.parse(localStorage.getItem('userInfo'))
  }

}

export default new AuthService();