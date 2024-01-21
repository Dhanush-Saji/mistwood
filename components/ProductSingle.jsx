import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { changeNumberFormat } from "@/services/Formatter";

const ProductSingle = ({ product }) => {
  return (
    <Link
      href={`/product-page/${product._id}`}
      className="product border-2 border-slate-100 rounded-xl transition-all hover:scale-105 cursor-pointer relative p-7"
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
      <h1 className="text-lg font-bold">
        ₹{changeNumberFormat(product?.sellingprice)}
      </h1>
    </Link>
  );
};

export default ProductSingle;
