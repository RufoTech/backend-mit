import express from "express"
import { forgotPassword, login, logout, registerUser } from "../controller/authController.js"
const router=express.Router()

router.post("/register",registerUser)
router.post("/login", login)
router.get("/logout",logout)
router.get("/password/forget",forgotPassword)


export default router