import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbConnect.js"
import productsRouter from "./routes/product.js"
import userRouter from "./routes/Auth.js"
import errors from "./middleware/errors.js"
import { isAuthenticatedUser } from "./middleware/auth.js"
import cookieParser from "cookie-parser"

dotenv.config({
    path:"config/config.env"
})

const app=express()
app.use(errors)

app.use(express.json())

connectDatabase()
app.use("/api/v1",isAuthenticatedUser,productsRouter) 
app.use("/crud/v1",userRouter)
app.use(cookieParser())
app.listen(process.env.PORT, ()=>console.log("server" +  process.env.PORT + "ci portda calisir"))

