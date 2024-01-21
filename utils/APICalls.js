
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