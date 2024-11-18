import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi=createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder) =>({
        getProducts: builder.query({
            query:()=> "/products"
        }),
        getProductsDetails:builder.query({
            query:(id)=> ` /products/${id}`,
        })
    })

})

export const {useGetProductsDetailsQuery,useGetProductsQuery} =productApi