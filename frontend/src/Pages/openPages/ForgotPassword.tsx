import { FormGroup, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { message } from 'antd'
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../Redux/Hook'

const ForgotPassword = () => {

  document.title = "KeyStone | Forget Password"

  const [formdata, setFormdata] = useState<any>()


  const auth = useAppState(state => state.user.auth)
  const navigate = useNavigate()
  const entryurl = localStorage.getItem("entryurl") as string
  useEffect(() => {
    if (auth) {

      localStorage.removeItem("entryurl")
      if (entryurl === "/forgotpassword") {
        console.log("runs");
        navigate("/")
        localStorage.setItem("entryurl", "/")
        return
      }
      navigate(entryurl)
    }
  }, [auth, entryurl, navigate])


  const forgotSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    axios.post("/user/forgotpassword", formdata)
      .then(response => {
        message.success(response.data.message)
      })
      .catch(err => {
        message.success(err.response.data.message)
      })
  }


  return (
    <div className='tw-w-full tw-min-h-screen tw-grid tw-place-items-center' style={{ backgroundImage: "url('https://unsplash.com/photos/wvUs06Rtu5E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTA1fHxiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NjU0NzAzNTY&force=true&w=1920')" }}>
      <div className='tw-w-10/12 md:tw-w-1/2 lg:tw-w-2/3 xl:tw-w-2/5 tw-bg-white tw-border tw-border-slate-300 tw-mx-auto tw-rounded-md tw-shadow-xl tw-shadow-gray-800 tw-flex tw-flex-col lg:tw-flex-row'>
        <div className='tw-w-1/2 tw-bg-cover tw-bg-center tw-rounded-md' style={{ backgroundImage: "url('/assets/login.jpg')" }} ></div>
        <div className='tw-p-4 tw-w-full lg:tw-w-1/2'>
          <h6 className='tw-text-2xl tw-mb-0' >Forgot Password</h6>
          <form className='tw-my-4' onSubmit={forgotSubmitHandler}>
            <FormGroup>
              <Stack direction={"column"} >
                <>
                  <label htmlFor='email'>Email</label>
                  <TextField name='email' id='email' type={"email"} variant={"outlined"} size={"small"} onChange={(e) => setFormdata({ email: e.target.value })} />
                </>
              </Stack>
            </FormGroup>
            <div className='tw-w-full tw-flex tw-justify-end tw-items-center tw-mt-3' >
              <button className='tw-bg-blue-600 tw-px-3 tw-py-1 tw-rounded tw-text-white hover:tw-bg-blue-500' type='submit' >Get Password Reset Link</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword