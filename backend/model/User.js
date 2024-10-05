import mongoose from "mongoose";
const userSchema = newSchema({
    name:{
        type:String,
        required:[true,"adinizi daxil edi"],
        maxLength:[50,"adiniz maksimum 50 simvoldan ibaret olmalidir"]
    },
    email:{
        type:String,
        required:[true,"mailinizi daxil edin"],
        unique:true
    },
    password:{
        type:String ,
        required:[true,"sifrenizi daxil edin"],
        select:false,
        minLength:[8,"sifrenin minumum uzunluqu 8 simvol olmalidir"]
    },
    avatar:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        default:"user"

    },
    
    resetPasswordToken:String,
    resetPasswordExpired:Date,
 
} ,{
    timestamps:true,

}
)

export default moongose.model("User",userSchema)