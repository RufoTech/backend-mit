import errorHandler from "../utils/errorHandler.js";

export default (err,req,res,next) =>{
    let error={
        statusCode:err?.statusCode ||500,
        message:err?.message  || "Internal service error"
    }

    if(err.name==="CastError"){
        const message= Object.values(`Resurs Tapilmadi ${err?.path}`)
        error=new errorHandler(message,400)
    } 
    if(err.name==="ValidationError"){
    const message =Object.values(err.errors).map((value)=> value.message)
    error= new errorHandler(message,400)
    }

    if(process.env.NODE_ENV==="DEVOLOPMET"){
        res.status(err.statusCode).json({
            message:error.message,
            error:err,
            stack:err?.stack

        })
    }

    if(process.env.NODE_ENV==="PRODUCTION"){
        res.status(err.statusCode).json({
            message:err,
         
        })
    }
}