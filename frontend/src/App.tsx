import { Route, Routes } from "react-router-dom"
import OpenRoute from "./Pages/OpenRoute";
import { useAppState } from "./Redux/Hook";
import Store from "./Pages/MainPages/Store";
import Details from "./Pages/MainPages/Details";
import MasterLayout from "./layout/MasterLayout";
import Cart from "./Pages/MainPages/Cart";
import React, { useEffect, useLayoutEffect } from "react";
import { useAppDispatch } from "./Redux/Hook";
import axios from "axios";
import { initialize, replaceCart } from "./Redux/Slices/userSlice";
import { initializeCart } from "./Redux/Slices/CartSlice";
import { message } from "antd";

// To fix the cart

const App = () => {
  const dispatch = useAppDispatch()
  useLayoutEffect(() => {

    axios.get("/user/status")
    .then(res => {
      dispatch(initialize({ auth: res.data.auth, user: res.data.user }))
    })
    .catch(err => {
      if (err.response.status === 403) {
        localStorage.removeItem("jwt-token")
        
      }
    })
  },[dispatch])
  const authStatus = useAppState(state => state.user.auth)
  // const userCart = useAppState(state => state.user.user?.cart)
  const cart = useAppState(state => state.cart.cart)
  localStorage.setItem("entryurl", window.location.pathname)
  // const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem("jwt-token")
    if (token) {
      axios.defaults.headers.common['jwt-token'] = token
    }
    let tempcart = localStorage.getItem("cart")

    dispatch(initializeCart(JSON.parse(tempcart as string) || []))


    // console.log("hello");


    if (authStatus) {
      axios.post("/user/cartreplace", { cart: cart })
        .then(response => {
          dispatch(replaceCart(response.data.cart))
          localStorage.removeItem("cart")
        })
        .catch(err => {
          console.log(err);
          message.error("Cannot update the cart correctly")
        })
      localStorage.removeItem("cart")
    }
    localStorage.removeItem("entryurl")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, authStatus])


  return (

    <Routes>
      <Route path="/u/*" element={<MasterLayout />} />
      <Route index element={<Store />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path='/cart' element={<Cart />} />
      <Route path="/*" element={<OpenRoute />} />
    </Routes>

  );
}

export default App
