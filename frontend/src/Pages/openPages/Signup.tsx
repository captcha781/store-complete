import React, { FormEvent, useState } from 'react'
import { FormGroup, InputAdornment, TextField } from "@mui/material"
import { Stack } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import { Key, EmailOutlined, AccountCircle, Visibility, VisibilityOff, PhoneOutlined } from "@mui/icons-material"
import axios from "axios"
import { message } from 'antd'
import { useAppDispatch } from '../../Redux/Hook'
import { initialize } from '../../Redux/Slices/userSlice'

const Signup = () => {
  document.title = "KeyStone | Sign Up"
  const [formdata, setFormdata] = useState<any>()
  const [showPass, setShowPass] = useState(false)
  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()

  const signupSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    axios.post("/user/signup", formdata)
      .then(response => {

        if (response.data.auth) {
          message.success(response.data.message)
          setTimeout(() => {
            localStorage.setItem("jwt-token", response.data.token)
            dispatch(initialize({ auth: response.data.auth, user: response.data.user }))
            setTimeout(() => {
              navigate("/")
            }, 20);
            // window.location.pathname = "/"
          }, 2000);
        } else {
          message.error(response.data.message)
        }
      })
      .catch(err => {
        message.error("failed")
      })
  }



  return (
    <div className='tw-w-full tw-min-h-screen tw-grid tw-place-items-center tw-bg-no-repeat tw-bg-cover tw-bg-center' style={{ backgroundImage: "url('https://unsplash.com/photos/wvUs06Rtu5E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTA1fHxiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NjU0NzAzNTY&force=true&w=1920')" }}>
      <div className='tw-w-10/12 md:tw-w-1/2 lg:tw-w-2/3 xl:tw-w-3/5 tw-bg-white tw-border tw-border-slate-300 tw-mx-auto tw-rounded-md tw-shadow-lg tw-shadow-gray-800 tw-flex tw-flex-col lg:tw-flex-row'>
        <div className='tw-w-1/2 tw-bg-contain tw-bg-no-repeat tw-bg-center tw-rounded-md' style={{ backgroundImage: "url('/assets/signup.jpg')" }} ></div>
        <div className='tw-p-4 tw-w-full lg:tw-w-1/2'>
          <h6 className='tw-text-2xl tw-mb-0' >Sign Up</h6>
          <form className='tw-my-4' onSubmit={signupSubmitHandler}>
            <FormGroup>
              <Stack direction={"column"}>
                <>
                  <label htmlFor='username'>Username</label>

                  <TextField name='username' id='username' type={"text"} variant={"outlined"} size={"small"} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }} onChange={(e) => setFormdata({ ...formdata, username: e.target.value })} />
                </>
                <div className='tw-flex tw-justify-between tw-items-center tw-w-full tw-flex-col md:tw-flex-row'>
                  <div className='tw-block tw-w-full md:tw-w-auto md:tw-mr-1'>
                    <label htmlFor='fname'>First Name</label>
                    <br />
                    <TextField name='fname' className='tw-w-full md:tw-w-auto' id='fname' type={"text"} variant={"outlined"} size={"small"} InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }} onChange={(e) => setFormdata({ ...formdata, fname: e.target.value })} />
                  </div>
                  <div className='tw-block tw-w-full md:tw-w-auto md:tw-ml-1'>
                    <label htmlFor='lname'>Last Name</label>
                    <br />
                    <TextField name='lname' className='tw-w-full md:tw-w-auto' id='lname' type={"text"} variant={"outlined"} size={"small"} InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }} onChange={(e) => setFormdata({ ...formdata, lname: e.target.value })} />
                  </div>
                </div>
                <>
                  <label htmlFor='email'>Email</label>
                  <TextField name='email' id='email' type={"email"} variant={"outlined"} size={"small"} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
                </>
                <>
                  <label htmlFor='password' className='tw-mt-3'>Password</label>
                  <TextField error={formdata?.password === formdata?.conpassword || !formdata?.conpassword ? false : true} name='password' id='password' type={showPass ? "text" : "password"} variant={"outlined"} size={"small"} InputProps={{
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
                  }} onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} />
                </>
                <>
                  <label htmlFor='conpassword' className='tw-mt-3'>Confirm Password</label>
                  <TextField error={formdata?.password === formdata?.conpassword || !formdata?.conpassword ? false : true} name='conpassword' id='conpassword' type={showPass ? "text" : "password"} variant={"outlined"} size={"small"} InputProps={{
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
                  }} onChange={(e) => setFormdata({ ...formdata, conpassword: e.target.value })} />
                </>
                <>
                  <label htmlFor='phonenumber'>Phone Number</label>

                  <TextField name='phonenumber' id='phonenumber' type={"tel"} variant={"outlined"} size={"small"} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlined />
                      </InputAdornment>
                    ),
                  }} onChange={(e) => setFormdata({ ...formdata, phonenumber: e.target.value })} />
                </>
              </Stack>
            </FormGroup>
            <div className='tw-flex tw-justify-end tw-items-center tw-text-sm'>

              <p className='tw-mb-0'>Already have an account <Link className='tw-text-blue-500 tw-font-medium tw-no-underline hover:tw-underline hover:tw-underline-offset-1 hover:tw-duration-200' to={"/signin"}>Sign In !!!</Link></p>
            </div>
            <div className='tw-w-full tw-flex tw-justify-end tw-items-center tw-mt-3' >
              <button className='tw-bg-blue-600 tw-px-3 tw-py-1 tw-rounded tw-text-white hover:tw-bg-blue-500' type='submit' >Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup