import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import userRouter from "./routes/userRoutes"
import productRouter from "./routes/productRoutes"
import timeout from "connect-timeout"

const app:express.Application = express()
app.set('trust proxy', true)
app.use(cors({
    origin:["http://localhost:3000","https://ecom-captcha781.netlify.app", "https://keystore.ml", "http://keystore.ml", "http://ecom-captcha781.netlify.app", "https://www.keystore.ml"],
    credentials: true,
    methods: ['GET','POST','PUT','DELETE']
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(timeout("60000"))

app.use("/user", userRouter)
app.use("/product", productRouter)
app.get("/check/internal",(req,res) => {
    res.json({header: req.headers})
})

mongoose.connect(process.env.MONGO_URI as string, () => {
    app.listen( process.env.PORT || "5000", () => {
        console.log("Server runs on port "+process.env.PORT+"...")
    })
})