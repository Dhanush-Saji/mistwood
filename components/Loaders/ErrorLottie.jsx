"use client";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import error from "@/public/lottifiles/error";

const ErrorLottie = ({width='10vw'}) => {
    const [isClient, setisClient] = useState(false)
    useEffect(() => {
        setisClient(true);
      }, []);
  return (
    <div className="w-full items-center flex-col mt-[3rem]">
      <div className={`w-[${width}] m-auto`}>
        {isClient && <Lottie animationData={error} loop={true} height={50} width={50} />}
      </div>
    </div>
  );
};

export default ErrorLottie;
