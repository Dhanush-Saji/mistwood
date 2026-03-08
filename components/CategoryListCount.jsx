import Link from 'next/link'
import React from 'react'
import { getCommonApi } from '@/utils/APICalls'
const url = process.env.BACKEND_URL

const CategoryListCount = async() => {
  const countList = await getCommonApi('/api/countCategory')
  return (
    <>
      </>
  )
}

export default CategoryListCount