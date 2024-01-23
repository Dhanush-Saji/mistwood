import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { changeNumberFormat } from "@/services/Formatter";

const ProductSingle = ({ product }) => {
  return (
    <Link
      href={`/product-page/${product._id}`}
      className="product border border-[rgba(0,0,0,0.1)] rounded-xl transition-all hover:scale-105 cursor-pointer relative p-4"
    >
      <div className="wishIcon bg-white flex items-center justify-center rounded-full w-8 h-8">
        <AiFillHeart className="text-[#f22749] " />
      </div>
      {product?.product_image?.img1 && (
        <Image
          width="200"
          height="200"
          className="m-auto"
          objectFit="cover"
          src={product?.product_image?.img1?.url}
          alt="Dan Abramov"
        />
      )}
      <h1 className="text-md font-semibold">{product?.product_name}</h1>
      <h1 className="text-md opacity-60">{product?.category?.category_name}</h1>
      <div className='flex gap-2 items-center'>
      <h1 className="text-md font-bold">
        ₹{changeNumberFormat(product?.sellingprice)}
      </h1>
      <h1 className="text-xs line-through opacity-60">
        ₹{changeNumberFormat(product?.price)}
      </h1>
        
      </div>
    </Link>
  );
};

export default ProductSingle;
