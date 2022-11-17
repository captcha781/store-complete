import React, { useEffect } from 'react'
import { LoadingOutlined} from "@ant-design/icons"
import { message, Spin } from 'antd'
import { useAppDispatch } from '../../Redux/Hook'
import { initialize } from '../../Redux/Slices/userSlice'
import { useNavigate } from 'react-router-dom'
const Signout = () => {
  const dispatch =useAppDispatch()
  const navigate = useNavigate()

  document.title = "KeyStone | Signout"

  useEffect(() => {
    message.success("Signed out successfully")
    setTimeout(() => {
      dispatch(initialize({auth:false, user:null}))
      localStorage.removeItem("jwt-token")
      localStorage.removeItem("cart")
      window.location.pathname = "/"
    }, 2000);
  },[dispatch,navigate])

  return (
    <div className='tw-w-full tw-grid tw-justify-center'>
      <Spin className={"tw-relative tw-top-1/2 -tw-translate-y-1/2"} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin/>}  />
      
    </div>
  )
}

export default Signout