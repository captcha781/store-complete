import React, { Suspense, useEffect } from 'react'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import Orders from './MainPages/Orders'
import Profile from './MainPages/Profile'
import Error404 from './openPages/Error404'
import Error500 from './openPages/Error500'
import { CContainer, CSpinner } from '@coreui/react'
import Signout from './MainPages/Signout'
import { useAppState } from '../Redux/Hook'
import Checkout from './MainPages/Checkout'


const MainRoute = () => {
  const auth = useAppState(state => state.user.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(auth){
      let url = localStorage.getItem("entryurl")
      localStorage.removeItem("entryurl")
      navigate(url as string)
    }
  },[auth,navigate])
  return (
    <>
      {<CContainer lg>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            <Route path='/orders' element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signout' element={<Signout />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/internalservererror' element={<Error500 />} />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </Suspense>
      </CContainer> }
    </>
  )
}


export default React.memo(MainRoute)