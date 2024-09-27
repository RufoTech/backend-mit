import errorHandler from "../utils/errorHandler.js";

export default (err,req,res,next) =>{
    let error={
        statusCode:err?.statusCode ||500,
        message:err?.message  || "Internal service error"
    }
}