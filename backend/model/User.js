import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"; 

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Adinizi daxil edin"],
        maxLength:[50, "Adiniz maksimum 50 simvoldan ibaret olmalidir"]
    },
    email: {
        type:String,
        required:[true, "Emailinizi daxil edin"],
        unique:true
    },

    password: {
        type:String,
        required:[true, "Shifrenizi daxil edin"],
        select:false,
        minLength:[8, "Shifrenin minimum uzunlugu 8 simvol olmalidir"]
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type:String,
        default: "user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
}, {
    timestamps:true
}
)




userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

    
} )

userSchema.methods.jwtTokeniEldeEt = function () {
    return jwt.sign({
        id: this._id,   
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: String(process.env.JWT_EXPIRES_TIME)
    })
}

userSchema.methods.shifreleriMuqayiseEt = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetPasswordToken= function (){

    const resetToken=crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire=Date.now()+30*60*1000
    return resetToken
}




export default mongoose.model("User", userSchema)