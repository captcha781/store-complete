import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../types"


interface InitialStateProduct {
    products: Product[] | null,
    count: number
}

const initialState: InitialStateProduct = {
    products: null,
    count: 0
}

export const productSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        initialize: (state: InitialStateProduct, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        },
        setCount: (state: InitialStateProduct, action: PayloadAction<number>) => {
            state.count = action.payload
        }
    }
})


export const { initialize, setCount } = productSlice.actions
export default productSlice.reducer