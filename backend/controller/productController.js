import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import Product from "../model/Product.js"
import ErrorHandler from "../utils/errorHandler.js"

export const getProducts = catchAsyncErrors(async (req,res, next) => {

    const products = await Product.find()

    if(!products) {
    
        return next(new ErrorHandler("Mehsullar yoxdur", 404))
    }
    res.status(200).json({
        products,
    })
})

export const getProductsDetails = catchAsyncErrors(async(req,res, next) => {
    const product = await Product.findById(req?.params?.id) 

    if(!product) {
     
        return next(new ErrorHandler("Mehsul tapilmadi", 404))
    }

    res.status(200).json({
        product
    })
}
)

export const uptadeProducts = catchAsyncErrors( async(req,res) => {
    let product = await Product.findById(req?.params?.id)

    if(!product) {
        return res.status(404).json({
            error: "Mehsul tapilmadi"
        })
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new:true
    })

    res.status(200).json({
        product
    })



})

export const deleteProducts = catchAsyncErrors(async(req,res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product) {
        res.status(404).json({
            error: "Mehsul tapilmadi"
        })

      
    }

    await Product.deleteOne()

    res.status(200).json({
        message:"Mehsul ugurla silindi"
    })
}
)


export const newProduct = catchAsyncErrors(async(req,res,next)=> {
    
    const product = await Product.create(req.body)

    res.status(201).json({
        product
    })

})

