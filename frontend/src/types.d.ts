export interface Address {
    buildingNo: string,
    street: string,
    locality: string,
    city: string,
    state: string
    country: string,
    pincode: string
}

export interface Product {
    _id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    brand: string
}

export interface CartItem {
    product: Product,
    quantity: number
}

export interface User {
    _id: string,
    fname: string,
    lname: string,
    username: string,
    password: string,
    email: string,
    phonenumber: number,
    address: Address[],
    cart: CartItem[]
}

export interface InitialState {
    user: User | null,
    auth: boolean
}

export interface OrderItem {
    _id ?: string,
    payableAmount: string,
    products: CartItem[],
    address: Address,
    paymentdetails: {
        cardname: string,
        cardnumber: string,
        cardexp: string,
        cardccv: string
    } | null,
    deliverIn: string,
    user: User
}