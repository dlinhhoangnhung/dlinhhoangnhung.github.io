import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import { cartReducer } from "./reducers/cartReducers"
import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducers'
import { getUserSigninReducer } from './reducers/userReducers'

const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    getUserSignin: getUserSigninReducer
})

const middleware = [thunk]
// localStorage.clear()

const cartItemsInLocalStorage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
const userInLocalStorage = localStorage.getItem("userInfo")
    && JSON.parse(localStorage.getItem("userInfo"))
// : [];
console.log("userInLocalStorage: " + userInLocalStorage)

const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage
    },
    userSignin: {
        userInfo: userInLocalStorage
    },
}

const store = createStore(
    // reducer,
    // INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware)),
)






// localStorage.clear()


export default store 