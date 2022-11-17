import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderItem } from "../../types"


interface InitialStateCommon {

    sidebarShow: boolean,
    sidebarUnfoldable: boolean,
    modifiers: {
        sortby: string,
        rangestart: number,
        rangeend: number,
        category: string[],
        page: number,
        search: string
    },
    orders: OrderItem[]

}

let search = window.location.search ? window.location.search.split("?")[1].split("=")[1] : 1
let pageurl:number
if (search) {
    pageurl = Number(search)
  } else {
    pageurl = 1
  }

const initialState: InitialStateCommon = {
    sidebarShow: false,
    sidebarUnfoldable: false,
    modifiers: {
        sortby: "relevance",
        rangestart: 10,
        rangeend: 50000,
        category: [] as string[],
        page:pageurl,
        search: ""
    },
    orders: []
}

const CommonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        sidebarToggle: (state) => {
            state.sidebarShow = !state.sidebarShow
        },
        sidebarUnfoldableToggle: (state) => {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        },
        changeModifiers: (state, action: PayloadAction<any>) => {
            state.modifiers = { ...state.modifiers, ...action.payload }
        },
        setupOrders: (state, action) => {
            state.orders = action.payload
        }
    }
})

export const { sidebarToggle, sidebarUnfoldableToggle, changeModifiers, setupOrders } = CommonSlice.actions
export default CommonSlice.reducer