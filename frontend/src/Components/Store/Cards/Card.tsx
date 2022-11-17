import { LoadingOutlined } from '@ant-design/icons'
import { Star } from '@mui/icons-material'
import { Rating } from '@mui/material'
import { Button, message, Statistic } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '../../../Redux/Hook'
import { replaceCartCSlice } from '../../../Redux/Slices/CartSlice'
import { replaceCart } from '../../../Redux/Slices/userSlice'
import { CartItem, Product } from '../../../types'

interface Props {
  product: Product
}

export const handleCartAdd = async (product: Product, auth: boolean, cart: CartItem[]) => {
  let check = cart?.filter(item => String(item.product._id) === String(product._id))

  console.log("check", check);
  if (check?.length > 0) {

    let index = cart.findIndex(item => item.product._id === product._id)
    let filtration = cart.filter(item => item.product._id === product._id)
    let nonfilter = cart.filter(item => item.product._id !== product._id)

    let newCart = [...nonfilter]
    newCart.splice(index, 0, { ...filtration[0], quantity: filtration[0].quantity + 1 })


    // console.log("runs here");
    if (auth) {
      localStorage.removeItem("cart")
      try {
        let promiser = await axios.post("/user/cartreplace", { cart: newCart })
        return promiser.data.cart
      } catch (error: any) {
        localStorage.setItem("cart", JSON.stringify(newCart))
        message.error(error.message)
      }
    } else {
      
        localStorage.setItem("cart", JSON.stringify(newCart))
        return newCart
      
    }
  } else {
    if (cart.length >= 1) {
      cart = [...cart, { product: product, quantity: 1 }]
    }
    else {
      cart = [{ product: product, quantity: 1 }]
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    // console.log("runner");
    if (auth) {
      localStorage.removeItem("cart")
      let promiser = await axios.post("/user/cartreplace", { cart: cart })
      try {
        return promiser.data.cart
      }
      catch (err: any) {
        localStorage.setItem("cart", JSON.stringify(cart))
        console.log(err);
        message.error(err.message)
      }
      
    }
    return cart

  }
}

const Card = ({ product }: Props): JSX.Element => {
  const auth = useAppState(state => state.user.auth)
  const cart = useAppState(state => state.cart.cart)
  const dispatch = useAppDispatch()
  const [disabler, setDisabler] = useState(false)
  return (
    <div className='tw-rounded-sm md:tw-rounded-md tw-flex tw-flex-col tw-shadow-xl tw-bg-white tw-shadow-gray-300 tw-cursor-pointer' >
      <Link to={"/details/" + product._id} className='tw-w-full tw-bg-center tw-bg-contain tw-bg-no-repeat tw-rounded-t-sm md:tw-rounded-t-md  [height:150px] md:[height:300px]' style={{  backgroundImage: `url(${product.thumbnail})` }}></Link>
      <div className='tw-p-2 md:tw-p-3 tw-bg-white tw-rounded-b-sm md:tw-rounded-b-md'>
        <p className='tw-mb-0 tw-text-xl tw-font-semibold tw-text-gray-700 tw-h-7 md:tw-h-14 tw-overflow-hidden'>{product.title}</p>
        <p className='tw-mb-0 tw-my-1.5 tw-text-gray-500 tw-h-10 tw-overflow-hidden tw-relative'>{product.description}<span className='tw-w-14 tw-h-4 tw-absolute tw-bottom-0 tw-right-0 tw-bg-gradient-to-r tw-from-transparent tw-to-white' /></p>
        <div className='tw-mb-0 tw-my-1 tw-text-xl tw-text-gray-700 tw-flex tw-items-center'>Price: <span className='tw-text-xl tw-font-semibold tw-text-pink-600 tw-flex tw-items-center'>$<Statistic value={product.price} /></span></div>
        <Rating readOnly emptyIcon={<Star />} value={product.rating} precision={0.5} />
        <br />
        <Button type='primary' icon={disabler ? <LoadingOutlined spin={true} /> : ""} className='tw-w-full' disabled={disabler ? true : false} onClick={async () => {
          setDisabler(true)
          setTimeout(() => {
            setDisabler(false)
          }, 1000);
          let resultCart = await handleCartAdd(product, auth, cart as CartItem[])
          // console.log(resultCart);

          dispatch(replaceCart(resultCart as unknown as CartItem[]))
          auth ? dispatch(replaceCartCSlice([])): dispatch(replaceCartCSlice(resultCart as unknown as CartItem[]))
        }}>Add to Cart</Button>
      </div>
    </div>
  )
}

export default Card