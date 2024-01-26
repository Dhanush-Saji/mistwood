
import React from 'react'

// export const getSingleProduct = async(id) =>{
//     console.log(id)
//     try {
//         const res = await fetch(`http://localhost:3000/api/products/${id}`)
//         const data = await res.json()
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }


const Page = async({params}) => {
    // const res = await getSingleProduct(params.id)
    // console.log(data)
  return (
    <div>Page</div>
  )
}

export default Page
