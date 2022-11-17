import mongoose from "mongoose";

//     buildingNo: string,
//     street: string,
//     locality: string,
//     city: string,
//     state: string
//     country: string

export const addressSchema = new mongoose.Schema({
    buildingNo: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        default:""
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
})

export const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

export const cartSchema = new mongoose.Schema({
    product: productSchema,
    quantity: {
        type: Number,
        required: true
    }
})

export const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: [cartSchema],
        default: []
    },
    addressList: {
        type: [addressSchema],
        default: []
    },
    phonenumber: {
        type: Number,
        required: true
    }
})

export default mongoose.model("user", UserModel)