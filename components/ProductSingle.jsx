import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { changeNumberFormat } from "@/services/Formatter";

const ProductSingle = ({ product }) => {
  return (
    <Link
      href={`/shop/${product._id}`} className={`overflow-hidden opacity-${product?.isActive?'100':'50'} bg-white p-2 rounded-[10px]`}
    >
      <div className="wishIcon bg-white flex items-center justify-center rounded-full w-8 h-8">
        <AiFillHeart className="text-[#f22749] " />
      </div>
      {product?.product_image?.img1 && (
        <div className="h-[200px] items-center justify-center bg-[rgba(0,0,0,.15)] rounded-[20px] flex mb-[10px] p-[25px] w-[100%]">
        <Image
        width={200}
        height={200}
        
          className="w-[250px] object-cover mix-blend-multiply transition ease-in duration-150 hover:scale-110"
          src={product?.product_image?.img1?.url}
          alt="Dan Abramov"
        />
        </div>
      )}
      <div className="prod-details m-auto overflow-hidden text-center w-[180px]">
      <h1 className="text-[16px] mb-[10px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis block name">{product?.product_name}</h1>
      <span className='desc'>{product?.description}</span>
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
