import { configureStore } from "@reduxjs/toolkit"
import CartReducer from "./Slices/CartSlice"
import CommonReducer from "./Slices/CommonSlice"
import ProductReducer from "./Slices/ProductSlice"
import userReducer from "./Slices/userSlice"

const Store = configureStore({
    reducer: {
        user: userReducer,
        common: CommonReducer,
        product: ProductReducer,
        cart: CartReducer
    }
})


export default Store
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch