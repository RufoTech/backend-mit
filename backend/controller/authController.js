import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../model/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import {sendEmail} from "../utils/sendEmail.js"
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
export const registerUser = catchAsyncErrors(async(req,res,next) => {

    const {name, email, password } = req.body

    const user = await User.create({name, email, password})
  
    sendToken(user,201,res)
})

export const login = catchAsyncErrors(async(req,res,next)=> {
    const {email, password} = req.body

    if(!email || !password) {
        return next(new ErrorHandler("Zehmet olmasa emaili ve yaxud shifreni daxil edin", 400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user) {
        return next(new ErrorHandler("Bele bir emaili olan istifadeci tapilmadi", 401))
    }
    const isPasswordMatched = await user.shifreleriMuqayiseEt(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Shifren yanlishdir", 401))
    }

   
sendToken(user, 200, res)
   
})

export const logout = catchAsyncErrors(async(req,res,next)=> {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        message: "Uğurla çıxış edildi"
    })
})

export const forgotPassword = catchAsyncErrors(async(req,res,next)=> {
    const user = await User.findOne({email:req.body.email})

    if(!user) {
        return next(new ErrorHandler("Istifadeci tapilmadi", 404))
    }

    const resetToken = user.getResetPasswordToken()
    // save bir metoddan istifade edirik - bazaya yazan metod
    //ARASHDIRILMALI- ne ucun istifade olunur
    await user.save()

    // linkin yaradilmasi merhelesi
    const resetUrl = `${process.env.FRONTEND_URL}/crud/v1/password/reset/token/${resetToken}` 
    const message = getResetPasswordTemplate(user?.name,resetUrl)

    // promise chaining .then

    try {
        await sendEmail({
            email: user?.email,
            subject: "SHIFRENIN SIFIRLANMASI MERHELESI",
            message

        })

        res.status(200).json({
            message: "Emailinizi check edin"
        })
    }

    catch(err) {
        // IMPORTANT!!!
        user.resetPasswordExpire = undefined
        user.resetPasswordToken = undefined

        await user.save()
        return next(new ErrorHandler("Serverde gozlenilmeyen bir xeta bash verdi", 500))
    }



})