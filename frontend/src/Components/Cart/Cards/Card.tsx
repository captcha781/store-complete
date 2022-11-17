import { Star } from '@mui/icons-material'
import { Rating } from '@mui/material'
import { Button, message, Statistic } from 'antd'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '../../../Redux/Hook'
import { replaceCartCSlice } from '../../../Redux/Slices/CartSlice'
import { replaceCart } from '../../../Redux/Slices/userSlice'
import { CartItem, Product } from '../../../types'

interface Props {
  product: Product,
  quantity: number
}

export const handleCartAdd = async (product: Product, auth: boolean, cart: CartItem[]) => {
  let check = cart?.filter(item => String(item.product._id) === String(product._id))

  if (check?.length > 0) {
    let index = cart.findIndex(item => item.product._id === product._id)
    let filtration = cart.filter(item => item.product._id === product._id)
    let nonfilter = cart.filter(item => item.product._id !== product._id)
    // console.log(index);
    let newCart = [...nonfilter]
    newCart.splice(index, 0, { ...filtration[0], quantity: filtration[0].quantity + 1 })
    localStorage.setItem("cart", JSON.stringify(newCart))

    if (auth) {
      let promiser = await axios.post("/user/cartreplace", { cart: newCart,decline:true })
      try {
        localStorage.removeItem("cart")
        return promiser.data.cart
      } catch (error: any) {
        console.log(error);
        message.error(error.message)
      }

      localStorage.removeItem("cart")
    }
    return newCart
  } else {
    if (cart?.length >= 1) {
      cart = [...cart, { product: product, quantity: 1 }]
    }
    else {
      cart = [{ product: product, quantity: 1 }]
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    // console.log("runner");
    if (auth) {
      try {
        let promiser = await axios.post("/user/cartreplace", { cart: cart ,decline:true})
        localStorage.removeItem("cart")
        return promiser.data.cart
      } catch (error: any) {
        console.log(error);
        message.error(error.message)
      }
      localStorage.removeItem("cart")
    }
    return cart

  }
}

export const handleCartRemove = async (product: Product, auth: boolean, cart: CartItem[]) => {
  let check = cart?.filter(item => String(item.product._id) === String(product._id))
  if (check?.length > 0) {
    let index = cart.findIndex(item => item.product._id === product._id)
    let filtration = cart.filter(item => item.product._id === product._id)
    let nonfilter = cart.filter(item => item.product._id !== product._id)
    // console.log(index);
    let newCart = [...nonfilter]
    newCart.splice(index, 0, { ...filtration[0], quantity: filtration[0].quantity - 1 })

    if (auth) {
      localStorage.removeItem("cart")
      let promiser = await axios.post("/user/cartreplace", { cart: newCart, decline:true })
      try {
        return promiser.data.cart
      } catch (error: any) {
        console.log(error);
        localStorage.setItem("cart", JSON.stringify(newCart))
        message.error(error.message)
      }


    } else {
      localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    }
  } else {
    if (cart.length >= 1) {
      cart = [...cart, { product: product, quantity: -1 }]
    }
    else {
      cart = [{ product: product, quantity: -1 }]
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    // console.log("runner");
    if (auth) {
      try {
        let filcheck = cart.filter(item => item.quantity <= 0)
        if (filcheck.length >= 1) {
          return await handleCartDelete(filcheck[0].product, auth, cart)
        }

        let promiser = await axios.post("/user/cartreplace", { cart: cart,decline:true })
        localStorage.removeItem("cart")
        return promiser.data.cart
      } catch (error: any) {
        console.log(error);
        message.error(error.message)
      }
    }
    return cart

  }
}



export const handleCartDelete = async (product: Product, auth: boolean, cart: CartItem[]) => {


  let nonfilter = cart.filter(item => item.product._id !== product._id)
  let newCart = nonfilter
  localStorage.setItem("cart", JSON.stringify(newCart))
  if (auth) {
    try {
      let promiser = await axios.post("/user/cartdelete", { product: product,decline:true })
      localStorage.removeItem("cart")
      return promiser.data.cart
    } catch (error: any) {
      console.log(error);
      message.error(error.message)
    }
  }
  return newCart

}

const Card = ({ product, quantity }: Props): JSX.Element => {
  const auth = useAppState(state => state.user.auth)
  const cart = useAppState(state => (auth ? state.user.user?.cart : state.cart.cart))
  const dispatch = useAppDispatch()


  return (
    <div className='tw-rounded-sm md:tw-rounded-md tw-flex tw-flex-col tw-shadow-xl tw-bg-white tw-shadow-gray-300 tw-cursor-pointer' >
      <Link to={"/details/" + product._id} className='tw-w-full tw-bg-center tw-bg-contain tw-bg-no-repeat tw-rounded-t-sm md:tw-rounded-t-md' style={{ height: "300px", backgroundImage: `url(${product.thumbnail})` }}></Link>
      <div className='tw-p-3 tw-bg-white tw-rounded-b-sm md:tw-rounded-b-md'>
        <p className='tw-mb-0 tw-text-xl tw-font-semibold tw-text-gray-700 tw-h-14 tw-overflow-hidden'>{product.title}</p>
        <div className='tw-mb-0 tw-my-1 tw-text-xl tw-text-gray-700 tw-flex tw-items-center'>Price: <span className='tw-text-xl tw-font-semibold tw-text-pink-600 tw-flex tw-items-center'>$<Statistic value={product.price} /></span></div>
        <Rating readOnly emptyIcon={<Star />} value={product.rating} precision={0.5} />
        <br />
        <div className='tw-flex tw-gap-x-3 tw-items-center tw-text-lg'><span>Quantity:</span><div className='tw-flex tw-items-center'>{quantity}</div> </div>


        <Button type='primary' className='tw-w-full' onClick={async () => {
          let resultCart = await handleCartAdd(product, auth, cart as CartItem[])
          dispatch(replaceCart(resultCart as unknown as CartItem[]))
          dispatch(replaceCartCSlice(auth ? [] : resultCart as unknown as CartItem[]))
        }}>Increase Quantity</Button>


        <Button type='primary' className='tw-w-full tw-bg-amber-400 tw-border-amber-400 tw-mt-2' onClick={async () => {
          let resultCart = await handleCartRemove(product, auth, cart as CartItem[])
          dispatch(replaceCart(resultCart as unknown as CartItem[]))
          dispatch(replaceCartCSlice(auth ? [] : resultCart as unknown as CartItem[]))
        }}>Decrease Quantity</Button>


        <Button type='primary' className='tw-w-full tw-bg-rose-500 tw-border-rose-500 tw-mt-2' onClick={async () => {
          let resultCart = await handleCartDelete(product, auth, cart as CartItem[])
          dispatch(replaceCart(resultCart as unknown as CartItem[]))
          dispatch(replaceCartCSlice(auth ? [] : resultCart as unknown as CartItem[]))
        }}>Remove Product</Button>


      </div>
    </div>
  )
}

export default Card