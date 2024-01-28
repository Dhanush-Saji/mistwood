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
        const res = await fetch(`/api/countCategory`)
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
