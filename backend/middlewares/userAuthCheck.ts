import dotenv from "dotenv"
dotenv.config()
import express from "express"
import jwt, { Secret } from "jsonwebtoken"
import mongoose from "mongoose"
import UserModel from "../models/userModel"
import { RequestModified } from "../types"
let envSecret = process.env.JWT_SECRET as Secret
const userMiddleware = (req: RequestModified, res: express.Response, next: express.NextFunction) => {

    const token = req.headers['jwt-token'] as string
    if (token && envSecret) {
        try {
            let verify = jwt.verify(token, envSecret)
            let decoder: any = jwt.decode(token)

            if(req.path !== "/signin" && req.path !== "/signup" && req.path !== "/forgotpassword" && req.path !== "/forgotpassword/:reseturl"){
                UserModel.findOne({_id: new mongoose.Types.ObjectId(decoder.id)})
                
                .then((response) => {
                        // console.log(response);
                        if(response?.password){
                            response.password = ""
                        }
                        req.user = response
                        next()
                    })
            } else {
                return res.status(401).json({message: "Hey Buddy, you're already logged in", auth: true})
            }
        } catch (error) {
            if(req.path === "/signin" || req.path === "/signup" || req.path === "/forgotpassword" || req.path.startsWith("/forgotpassword")){
                return next()
            }
            return res.status(403).json({ auth: false, message: "Authorization token is invalid or expired" })
        }
    } else {
        if(req.path === "/signin" || req.path === "/signup" || req.path === "/forgotpassword" || req.path.startsWith("/forgotpassword")){
            next()
        } else {
            res.json({auth: false, user: null})
        }
    }
    
}

export default userMiddleware