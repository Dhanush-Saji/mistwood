import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { changeNumberFormat } from "@/services/Formatter";

const ProductSingle = ({ product }) => {
  return (
    <Link
      href={`/shop/${product._id}`} className={`overflow-hidden opacity-${product?.isActive?'100':'50'} bg-white dark:bg-white/20 p-2 rounded-xl`}
    >
      {/* <div className="wishIcon bg-white flex items-center justify-center rounded-full w-8 h-8">
        <AiFillHeart className="text-[#f22749] " />
      </div> */}
      {product?.product_image?.img1 && (
        <div className="h-[200px] items-center justify-center bg-[rgba(0,0,0,.15)] dark:bg-neutral-300 rounded-xl flex mb-[10px] p-[25px] w-[100%]">
        <Image
        width={200}
        height={200}
        
          className="w-[250px] object-cover mix-blend-multiply transition ease-in duration-150 hover:scale-110"
          src={product?.product_image?.img1?.url}
          alt="Dan Abramov"
        />
        </div>
      )}
      <div className="prod-details m-auto overflow-hidden text-center px-[0.5rem] md:px-[1rem]">
      <h1 className="text-sm md:text-[16px] max-w-[90%] mb-[5px] text-left font-semibold whitespace-nowrap overflow-hidden text-ellipsis block name">{product?.product_name}</h1>
      <span className='desc dark:text-white/30 max-w-[90%] text-left whitespace-nowrap overflow-hidden text-ellipsis mb-2'>{product?.description}</span>
      {
        product?.discounts?
      <div className='flex gap-2 items-center mt-auto justify-center'>
      <h1 className="text-md font-bold m-0">
        ₹{changeNumberFormat((product?.sellingprice * (100 - product?.discounts?.percentage)) / 100)}
      </h1>
      <h1 className="text-xs line-through opacity-60 m-0">
        ₹{changeNumberFormat(product?.sellingprice)}
      </h1>
      </div>:
      <div className='flex gap-2 items-center mt-auto justify-center'>
      <h1 className="text-md font-bold m-0">
        ₹{changeNumberFormat(product?.sellingprice)}
      </h1>
      </div>
      }
        
      </div>
    </Link>
  );
};

export default ProductSingle;
