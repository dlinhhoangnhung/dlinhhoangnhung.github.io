import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import { cartReducer } from "./reducers/cartReducers"
import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducers'
import { getCategoriesReducer } from './reducers/categoryReducers'
import { getUserSigninReducer } from './reducers/userReducers'
import { getOrderCreateReducer } from './reducers/orderReducers'
import { getColorsReducer } from './reducers/colorReducers'
import { getSizesReducer } from './reducers/sizeReducers'
import { getOrdersReducer } from './reducers/orderReducers'
import { getOrderReducer } from './reducers/orderReducers'
import { getSlideReducer } from './reducers/slideReducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import throttle from 'lodash/throttle';

// const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) {
//             return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (e) {
//         return undefined;
//     }
// };

// const saveState = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         // Ignore write errors;
//     }
// };

// const persistedState = loadState();

const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductsReducer,
    getCategories: getCategoriesReducer,
    getColors: getColorsReducer,
    getSizes: getSizesReducer,
    getProductDetails: getProductDetailsReducer,
    getUserSignin: getUserSigninReducer,
    getOrderCreate: getOrderCreateReducer,
    getOrders: getOrdersReducer,
    getOrder: getOrderReducer,
    getIndex: getSlideReducer
})

const middleware = [thunk]
// localStorage.clear()

const cartItemsInLocalStorage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
const userInLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [];
console.log("userInLocalStorage: " + userInLocalStorage)
const shippingInfoInLocalStorage = localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : [];
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}


const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage,
        shippingInfo: shippingInfoInLocalStorage
    },
    userSignin: {
        userInfoo: userInLocalStorage,
    },

    // paymentMethod: 'Momo'
}


// const persistConfig = {
//     key: 'root',
//     INITIAL_STATE,
// }
// const persistedReducer = persistReducer(persistConfig, reducer)


const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware)),
    // persistedState
    // persistedReducer
)

// store.subscribe(() => {
//     // save a copy to localStorage
//     localStorage.setItem('reduxState', JSON.stringify(store.getState().cart.getUserSignin ))
// })


// let persistor = persistStore(store)

// store.subscribe(throttle(() => {
//     saveState(store.getState());
// }, 1000));




// localStorage.clear()


// export default { store, persistor }
export default store
