import mongoose from "mongoose";
import products from "./data.js"
import Product from "../model/Product.js";

const seedProducts = async  () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/backend-mit")
        await Product.deleteMany()
        console.log("mehsullar silindi")
        await Product.insertMany(products)
        console.log("mehsullar elave edildi")
        process.exit()
    }

    catch(err){
        process.exit()
    }
}

seedProducts()