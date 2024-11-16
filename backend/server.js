
import express  from "express"

import dotenv from "dotenv"
import {connectDatabase} from "./config/dbConnect.js"
import productsRouter from "./routes/product.js"
import userRouter from "./routes/auth.js"
import errorsMiddleware from "./middleware/errors.js"

import cookieParser from "cookie-parser"

dotenv.config({
    path:"config/config.env"
})


const app = express()


connectDatabase()

app.use(express.json())





app.use(cookieParser())
app.use("/api/v1", productsRouter)
app.use("/crud/v1", userRouter)



app.use(errorsMiddleware) 


app.listen(process.env.PORT, ()=> console.log("Server " + process.env.PORT +"-ci portda calisisdfdsf"))



