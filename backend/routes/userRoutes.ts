import { RouterModified } from "../types"
import express from "express"
import * as userController from "../controllers/userController"
import userMiddleware from "../middlewares/userAuthCheck"

const router: RouterModified = express.Router()

router.post("/signup", userMiddleware, userController.signUp)
router.post("/signin", userMiddleware, userController.signin)
router.get("/status", userMiddleware, userController.status)
router.post("/cartreplace",userMiddleware,userController.cartChanger)
router.post("/cartdelete",userMiddleware,userController.cartdeleter)
router.post("/checkouts",userMiddleware,userController.orderhandler)
router.get("/orders",userMiddleware,userController.fetchOrders)
router.post("/updateuser",userMiddleware,userController.updateUser)
router.post("/changepassword", userMiddleware, userController.changePassword)
router.post("/forgotpassword",userMiddleware,userController.forgotUrlGen)
router.get("/forgotpassword/:forgotURL",userMiddleware,userController.checkResetUrl)
router.post("/forgotpassword/:forgotURL",userMiddleware,userController.forgotRrlReset)

export default router