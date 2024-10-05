import catchAsyncErrors from "../middleware/catchAsyncErrors";

import user from "../model/User.js"

const registerUser=catchAsyncErrors(async(req,res,next)=>{

    const {name,email,password}=req.body()
    const user =await
}) 