"use client";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import noData from "@/public/lottifiles/no_data";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const NoData = () => {
    const [isClient, setisClient] = useState(false)
    useEffect(() => {
        setisClient(true);
      }, []);
  return (
    <div className="w-full items-center flex-col mt-[3rem]">
      <div className="w-[11vw] m-auto">
        {isClient && <Lottie animationData={noData} loop={true} height={30} width={30} />}
      </div>
      <p className="opacity-[0.5] text-center ml-7 text-[1rem]">No items available</p>
    </div>
  );
};

export default NoData;
