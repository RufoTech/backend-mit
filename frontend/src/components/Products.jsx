import React, { useEffect } from 'react'
import ProductCard from './Productcard'
import { useGetProductsQuery } from '../redux/api/productsApi'
const Products = () => {
  const {data,isLoading,error,isError} =useGetProductsQuery()
   useEffect(()=>{
    if(isError){
      toast.error(error?.data?.message)
    }
   },[isError])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 my-[20px] container mx-auto'>
        <ProductCard />
        
    </div>
  )
}

export default Products