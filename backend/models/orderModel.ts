import mongoose from "mongoose";
import { productSchema, addressSchema, cartSchema, UserModel } from "./userModel"

const paymentSchema = new mongoose.Schema({
    cardname : {
        type:String,
        required:true
    },
    cardnumber: {
        type:String,
        required:true
    },
    cardexp: {
        type:String,
        required:true
    },
    cardccv:{
        type:String,
        required:true
    }
})

const orderSchema = new mongoose.Schema({
    payableAmount : {
        type: String,
        required: true
    },
    products: {
        type: [cartSchema],
        required:true
    },
    address: {
        type: addressSchema,
        required:true
    },
    paymentdetails: {
        type:paymentSchema,
        required: true
    },
    deliverIn: {
        type:String,
        required:true
    },
    user: {
        type: UserModel,
        required:true
    }
})

export default mongoose.model("order", orderSchema)