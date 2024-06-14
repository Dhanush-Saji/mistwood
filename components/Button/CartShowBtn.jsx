'use client'
import { useUserStore } from '@/lib/zustandStore'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartShowBtn = () => {
    const cartArray = useUserStore(state => state.cart)
    const cartQnty = cartArray.reduce((accumulator, item) => accumulator + item?.quantity, 0);
    return (
        <Link href={'/cart'} prefetch={false}>
            <div className='rounded-full text-[#27282a] p-1.5 relative flex items-center justify-center'><ShoppingCart />
                <span className='w-5 h-5 flex items-center justify-center bg-[#ffde3c] absolute right-[-5px] top-[-5px] text-xs font-bold rounded-full'>{cartQnty}</span>
            </div>
        </Link>
    )
}

export default CartShowBtn