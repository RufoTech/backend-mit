import Product from "../model/Product.js"
import errorHandler from "../utils/errorHandler.js"
export const getProducts = async (req,res,next )=>{
    const products= await Product.find()
    if(!products){
     return new errorHandler("mehsullar yoxdur",404)
    }
    res.status(200).json({
      products,
    })
}

export const getProductsDetails= async(req,res)=> {

const product= await Product.findById(req?.params?.id)

if(!product){
    return res.status(404).json({
        error:"mehsul tapilmadi" 
} )

}
res.status(200).json({
    product
})
}

export const uptadeProducts= async(req,res)=>{

    let product= await Product.findById(req?.params?.id)
   
    if(!product){
        return res.status(404).json({
            error:"mehsul tapilmadi"
        })
        
    }

   product= await Product.findByIdAndUpdate(req?.params?.id, req.body, {new:true})
   console.log(product)

   res.status(200).json({
    product
   })
}


export const deleteProducts=async(req,res)=>{

    const product=Product.findById(req?.params?.id)

    if(!product){
        res.status(404).json({
            error:"mehsul tapilmadi"
        })
    }

    await Product.deleteOne()

    res.status(200).json({
        message:"mehsul ugurla silindj"
    })
}