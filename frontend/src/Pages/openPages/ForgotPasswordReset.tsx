import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormGroup, InputAdornment, Stack, TextField } from '@mui/material'
import { message } from 'antd'
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../../Redux/Hook'

const ForgotPasswordReset = () => {

    // To check url validity and update password

    const auth = useAppState(state => state.user.auth)
    const navigate = useNavigate()
    const entryurl = localStorage.getItem("entryurl") as string
    const params = useParams()
    const [newPassword, setNewPassword] = useState<any>()

    const [showPass, setShowPass] = useState(false)


    useEffect(() => {
        if (auth) {

            localStorage.removeItem("entryurl")
            if (entryurl === "/forgotpassword") {
                console.log("runs");
                navigate("/")
                localStorage.setItem("entryurl", "/signin")
                return
            }
            navigate(entryurl)
        }

        axios.get("/user/forgotpassword/" + params.url)
            .then(() => {
                message.info("Enter the new passwords.")
            })
            .catch(err => {
                message.error(err.response.data.message)
                setTimeout(() => {
                    navigate("/signin")
                }, 1000);
            })


    }, [auth, entryurl, navigate, params.url])


    const forgotPassUpdateHandler = (e: FormEvent) => {
        e.preventDefault()
        axios.post("/user/forgotpassword/" + params.url, newPassword)
            .then(resetResponse => {
                message.success(resetResponse.data.message)
                if (resetResponse.status === 200) {
                    setTimeout(() => {
                        navigate("/signin")
                    }, 2000);
                }
            })
    }

    return (
        <div className='tw-w-full tw-min-h-screen tw-grid tw-place-items-center' style={{ backgroundImage: "url('https://unsplash.com/photos/wvUs06Rtu5E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTA1fHxiYWNrZ3JvdW5kfGVufDB8MHx8fDE2NjU0NzAzNTY&force=true&w=1920')" }}>
            <div className='tw-w-10/12 md:tw-w-1/2 lg:tw-w-2/3 xl:tw-w-2/5 tw-bg-white tw-border tw-border-slate-300 tw-mx-auto tw-rounded-md tw-shadow-xl tw-shadow-gray-800 tw-flex tw-flex-col lg:tw-flex-row'>
                <div className='tw-w-1/2 tw-bg-cover tw-bg-center tw-rounded-md' style={{ backgroundImage: "url('/assets/login.jpg')" }} ></div>
                <div className='tw-p-4 tw-w-full lg:tw-w-1/2'>
                    <h6 className='tw-text-2xl tw-mb-0' >Forgot Password Reset</h6>
                    <form className='tw-my-4' onSubmit={forgotPassUpdateHandler}>
                        <FormGroup>
                            <Stack direction={"column"} >
                                <>
                                    <label htmlFor='email'>Enter Password</label>
                                    <TextField error={newPassword?.password === newPassword?.confPassword || !newPassword?.confPassword ? false : true} name='password' id='password-new' type={showPass ? "text" : "password"} variant={"outlined"} size={"small"} InputProps={{
                                        className: "tw-bg-white tw-rounded-full ",
                                        endAdornment: (
                                            <InputAdornment position="end" className='tw-cursor-pointer' onClick={() => setShowPass(!showPass)}>
                                                {showPass ? <VisibilityOff /> : <Visibility />}
                                            </InputAdornment>
                                        )
                                    }} onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })} />
                                </>
                                <>
                                    <label htmlFor='email'>Confirm New Password</label>
                                    <TextField error={newPassword?.password === newPassword?.confPassword || !newPassword?.confPassword ? false : true} name='password' id='password-newCOnf' type={showPass ? "text" : "password"} variant={"outlined"} size={"small"} InputProps={{
                                        className: "tw-bg-white tw-rounded-full ",
                                        endAdornment: (
                                            <InputAdornment position="end" className='tw-cursor-pointer' onClick={() => setShowPass(!showPass)}>
                                                {showPass ? <VisibilityOff /> : <Visibility />}
                                            </InputAdornment>
                                        )
                                    }} onChange={(e) => setNewPassword({ ...newPassword, confPassword: e.target.value })} />
                                </>
                            </Stack>
                        </FormGroup>
                        <div className='tw-w-full tw-flex tw-justify-end tw-items-center tw-mt-3' >
                            <button className='tw-bg-blue-600 tw-px-3 tw-py-1 tw-rounded tw-text-white hover:tw-bg-blue-500' type='submit' >Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordReset