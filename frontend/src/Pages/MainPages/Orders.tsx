import { message } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import OrderCard from '../../Components/Orders/OrderCard'
import { useAppDispatch, useAppState } from '../../Redux/Hook'
import { setupOrders } from '../../Redux/Slices/CommonSlice'
import { OrderItem } from '../../types'

const Orders = () => {

  const orders: OrderItem[] = useAppState(state => state.common.orders)
  const auth = useAppState(state => state.user.auth)
  const dispatch = useAppDispatch()

  document.title = "KeyStone | Orders"

  useEffect(() => {
    setTimeout(() => {
      
      axios.get("/user/orders")
      .then(response => {
        dispatch(setupOrders(response.data.orders))
        console.log(response);
        
      })
      .catch(err => {
        message.error(err.message)
      })
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!auth) {
    return (
      <div className="container wow fadeIn">
        <Link to={"/signin"}><h2>Sign in to view Orders</h2></Link>
      </div>
    )
  }

  localStorage.removeItem("entryurl")
  return (
    <div>
      {orders?.length > 0 ?
        <>{orders?.map(order => <OrderCard key={order._id} order={order} />)}</>
        :
        <><h1>No Orders Found</h1></>
      }
    </div>
  )
}

export default Orders