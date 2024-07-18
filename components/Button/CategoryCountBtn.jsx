'use client'
import ChairImage from '@/public/images/chair.svg'
import BedImage from '@/public/images/bed.svg'
import TableImage from '@/public/images/table.svg'
import SofaImage from '@/public/images/sofa.svg'
import AllImage from '@/public/images/allfurniture.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CategoryCountBtn = ({ category, index }) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('category')
    const ImageArray = [AllImage,ChairImage,BedImage,TableImage,SofaImage]
    return (
        <>
            <Link scroll={false} href={`/shop?category=${category.name}`} className={`${((search == category.name) || (category.name == 'All' && search == null)) ? 'bg-[#ffde3c] border-[#e6ca43]' : 'border-[rgba(0,0,0,0.2)] hover:border-slate-400'} border  flex rounded-[8px] p-2 gap-3 ease-in transition-all duration-200 hover:scale-105  hover:shadow-md`} key={index}>
                <div className={`${((search == category.name) || (category.name == 'All' && search == null)) ? 'bg-[#cfc532]' : 'bg-[#ECECED]'} border border-[rgba(0,0,0,0.2)] rounded-[4px] flex items-center justify-center p-2 `}>
                    <Image width='50' height='50' className=" object-contain aspect-square w-[2rem]" src={ImageArray[index]} alt="chair-image" />
                </div>
                <div className="flex flex-col">
                    <p className="font-medium">{category?.name}</p>
                    <p className="opacity-50">({category?.count})</p>
                </div>
            </Link>
        </>
        // <Link scroll={false} href={`/shop?category=${category.name}`} className={`${((search == category.name) || (category.name == 'All' && search == null))?'bg-[#ffde3c] border-[#e6ca43]':'border-[rgba(0,0,0,0.2)] hover:border-slate-400'} border  flex rounded-full px-[0.5rem] py-[0.2rem]  md:p-2 gap-3 ease-in transition-all duration-200 hover:scale-105  hover:shadow-md justify-center items-center`} key={index}>
        // <p className="font-medium">{category?.name}</p>
        // </Link>
    )
}

export default CategoryCountBtn