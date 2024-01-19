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
      <div className="w-[10vw] m-auto">
        {isClient && <Lottie animationData={noData} loop={true} height={30} width={30} />}
      <p className="opacity-[0.5] text-center">No items available</p>
      </div>
    </div>
  );
};

export default NoData;
