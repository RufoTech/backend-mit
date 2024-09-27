import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbConnect.js"
import productsRouter from "./routes/product.js"
import errors from "./middleware/errors.js"
dotenv.config({
    path:"config/config.env"
})

const app=express()
app.use(errors)

app.use(express.json())

connectDatabase()
app.use("/api/v1",productsRouter) 
app.listen(process.env.PORT, ()=>console.log("server" +  process.env.PORT + "ci portda calisir"))

