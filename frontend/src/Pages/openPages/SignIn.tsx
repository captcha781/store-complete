import React, { FormEvent, useEffect, useState } from 'react'
import { FormGroup, InputAdornment, TextField } from "@mui/material"
import { Stack } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import { initialize } from '../../Redux/Slices/userSlice'
import { useAppDispatch, useAppState } from '../../Redux/Hook'
import { Key, Visibility, VisibilityOff } from '@mui/icons-material'

const SignIn = () => {
  document.title = "KeyStone | Sign In"
  const [formdata, setFormdata] = useState<any>()
  const [showPass, setShowPass] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppState(state => state.user.auth)
  const signinSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    axios.post("/user/signin", formdata)
      .then(response => {
        if (response.data.auth) {
          message.success(response.data.message)
        } else {
          message.error(response.data.message)
        }
        console.log(response);

        setTimeout(() => {
          localStorage.setItem("jwt-token", response.data.token)
          dispatch(initialize({ auth: response.data.auth, user: response.data.user }))
          // window.location.pathname = "/"
        }, 2000);
      })
      .catch(err => {
        message.error(err.message)
      })
  }

  let entryurl = localStorage.getItem("entryurl") as string
  useEffect(() => {
    if (auth) {
      
      localStorage.removeItem("entryurl")
      if(entryurl === "/signin"){
        console.log("runs");
        navigate("/")
        localStorage.setItem("entryurl","/")
        return
      }
      navigate(entryurl)
    }
  },[auth, entryurl, navigate])

  return (
    <div className='tw-w-full tw-min-h-screen tw-grid tw-place-items-center tw-bg-no-repeat [background-position:-200px] sm:[background-position:0px]' style={{ backgroundImage: "url('https://unsplash.com/photos/wvUs06Rtu5E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTA1fHxiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NjU0NzAzNTY&force=true&w=1920')" }}>
      <div className='tw-w-10/12 md:tw-w-1/2 lg:tw-w-2/3 xl:tw-w-2/5 tw-bg-white tw-border tw-border-slate-300 tw-mx-auto tw-rounded-md tw-shadow-xl tw-shadow-gray-800 tw-flex tw-flex-col lg:tw-flex-row'>
        <div className='tw-w-1/2 tw-bg-cover tw-bg-center tw-rounded-md' style={{ backgroundImage: "url('/assets/login.jpg')" }} ></div>
        <div className='tw-p-4 tw-w-full lg:tw-w-1/2'>
          <h6 className='tw-text-2xl tw-mb-0' >Sign In</h6>
          <form className='tw-my-4' onSubmit={signinSubmitHandler}>
            <FormGroup>
              <Stack direction={"column"} >
                <>
                  <label htmlFor='email'>Email</label>
                  <TextField name='email' id='email' type={"email"} variant={"outlined"} size={"small"} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
                </>
                <>
                  <label htmlFor='password' className='tw-mt-3'>Password</label>
                  <TextField name='password' id='password' type={showPass ? "text" : "password"} variant={"outlined"} size={"small"} onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" className='tw-cursor-pointer' onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    )
                  }} />
                </>
              </Stack>
            </FormGroup>
            <div className='tw-flex tw-justify-between tw-items-center tw-text-sm'>
              <Link className='tw-text-blue-500 tw-font-medium tw-no-underline hover:tw-underline hover:tw-underline-offset-1 hover:tw-duration-200' to={"/forgotpassword"}>Forgot Password</Link>
              <p className='tw-mb-0'>Don't have an account <Link className='tw-text-blue-500 tw-font-medium tw-no-underline hover:tw-underline hover:tw-underline-offset-1 hover:tw-duration-200' to={"/signup"}>Signup Here !</Link></p>
            </div>
            <div className='tw-w-full tw-flex tw-justify-end tw-items-center tw-mt-3' >
              <button className='tw-bg-blue-600 tw-px-3 tw-py-1 tw-rounded tw-text-white hover:tw-bg-blue-500' type='submit' >Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn