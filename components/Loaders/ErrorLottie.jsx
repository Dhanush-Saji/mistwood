"use client";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import error from "@/public/lottifiles/error";

const ErrorLottie = () => {
    const [isClient, setisClient] = useState(false)
    useEffect(() => {
        setisClient(true);
      }, []);
  return (
    <div className={`w-[260px] m-auto mt-[-6rem]`}>
        {isClient && <Lottie animationData={error} loop={false} height={50} width={50} />}
      </div>
  );
};

export default ErrorLottie;
