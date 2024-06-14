import axios from "axios"

let url = process.env.NEXT_PUBLIC_FRONTEND_URL
export const getProduct = async(query) =>{
    try {
        const res = await fetch(`/api/products?category=${query}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getCategoryCount = async() =>{
    try {
        const res = await fetch(`/api/countCategory`,{ next: { revalidate: 3600 } })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getSingleProduct = async(id) =>{
    try {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
export const getRelatedProduct = async(id) =>{
    try {
        const res = await axios.post(`/api/relatedProduct`,{id})
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const registerFn = async(formData) =>{
    try {
        const res = await axios.post(`/api/register`,formData)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const forgotPasswordFn = async(formData) =>{
    try {
        const res = await axios.post(`/api/forgot-password`,formData)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const resetPasswordFn = async(formData) =>{
    try {
        const res = await axios.post(`/api/reset-password`,formData)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const verifyTokenFn = async(payload) =>{
    try {
        const res = await axios.post(`/api/verify-token`,payload)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const addProductToCartFn = async(payload) =>{
    try {
        const res = await axios.post(`/api/addToCart`,payload)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
