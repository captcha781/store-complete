import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types";

interface InitialstateCart {
    cart: CartItem[]
}

const initialState: InitialstateCart = {
    cart: []
}

const CartSlice = createSlice({
    initialState,
    name: "Cart",
    reducers: {
        initializeCart: (state, action) => {
            state.cart = action.payload
        },
        replaceCartCSlice: (state, action) => {
            state.cart = action.payload
        },
        refreshCart: (state, action) => {
            state.cart = action.payload
        }
    }
})

export const { initializeCart, replaceCartCSlice, refreshCart } = CartSlice.actions
export default CartSlice.reducer