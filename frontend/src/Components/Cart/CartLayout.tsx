import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '../../Redux/Hook'
import { refreshCart } from '../../Redux/Slices/CartSlice'
import { CartItem } from '../../types'
import Card from './Cards/Card'

const CartLayout = () => {

    let cart:CartItem[];
    
    // const cart = useAppState(state => state.cart.cart)
    const auth = useAppState(state => state.user.auth)
    const authcart = useAppState(state => state.user.user?.cart)
    const nonauthcart = useAppState(state => state.cart.cart)
    if(auth){
        cart = authcart as CartItem[]
    } else {
        cart = nonauthcart
    }
    const user = useAppState(state => state.user.user)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(auth && user?.cart){
            dispatch(refreshCart([]))
        }
    },[auth, dispatch, user?.cart])
    localStorage.removeItem("entryurl")
    

    return (
        <div className='tw-w-full'>
            <div className='tw-px-3 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-2 md:tw-gap-3 lg:tw-gap-4'>
                {cart?.length as number > 0 ? <>
                    {cart?.map(cartItem => <Card key={cartItem.product._id} product={cartItem.product} quantity={cartItem.quantity} />)}
                </> : <h1>No Products Found</h1>}
            </div>
            <div className='tw-w-full tw-mt-5'>
                {cart?.length > 0 && auth ? 
                <Link to={"/u/checkout"}><Button type='ghost' className='tw-bg-teal-500 tw-w-10/12 tw-mx-auto tw-flex tw-flex-col tw-items-stretch tw-rounded-md'>Proceed to Check-out</Button></Link>:
                <Link to={"/signin"}><Button type='ghost' className='tw-bg-amber-500 tw-w-10/12 tw-mx-auto tw-flex tw-flex-col tw-items-stretch tw-rounded-md' >SignIn to Check-out</Button></Link>}
            </div>
        </div>
    )
}

export default CartLayout