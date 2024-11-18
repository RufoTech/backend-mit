// const express = require("lodash")
// default named import

import express  from "express"
// console.log(path.dirname)
import dotenv from "dotenv"
import {connectDatabase} from "./config/dbConnect.js"
// Router 
import productsRouter from "./routes/product.js"
import userRouter from "./routes/Auth.js"
import errorsMiddleware from "./middleware/errors.js"

import cookieParser from "cookie-parser"

dotenv.config({
    path:"config/config.env"
})

// Temporal Dead Zone (TDZ) //hoisting
// const ve let hoist olunur, amma birinci yaradilmadi, sonra cagrilmadi
// TDZ Temporal Dead Zone
const app = express()
// hoisting TDZ 




connectDatabase()

app.use(express.json())

// app.use(errorsMiddleware) //burada idi



// cookieParser() cagiririq, amma routedan once. Cunki evvelce girish eden adamin kimliyi mueyyenleshdirilib
// daha sonra girishe istek ata biler
app.use(cookieParser())
app.use("/api/v1", productsRouter)
app.use("/crud/v1", userRouter)


//JSON.stringify() vs JSON.parse()
// Tetbiq seviyyesine (Application levelde) istifade edirsiniz
app.use(errorsMiddleware) //bura yaz marshrutlardan kenara bir de productControllerde next parametrini yazmagi unutmayin


app.listen(process.env.PORT, ()=> console.log("Server " + process.env.PORT +"-ci portda calisisdfdsf"))