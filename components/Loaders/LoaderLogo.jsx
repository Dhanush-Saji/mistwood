"use client";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import Loader from "@/public/lottifiles/logo_loader";

const LoaderLogo = () => {
  const [isClient, setisClient] = useState(false)
  useEffect(() => {
    setisClient(true);
  }, []);
  return (
    <div className="w-[8vw] m-auto">
      {isClient && <Lottie animationData={Loader} loop={true} height={30} width={30} />}
    </div>
  );
};

export default LoaderLogo;
