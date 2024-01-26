
export const getProduct = async(query) =>{
    try {
        const res = await fetch(`/api/products?category=${query}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
