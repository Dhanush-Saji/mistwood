import React, { useRef, useState } from "react";
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import {FreeMode,Pagination} from 'swiper/modules'
import Image from "next/image";

const SliderComponent = ({ imageArray:slides }) => {
  return (
    <div className='flex sm:hidden w-full'>
        <Swiper pagination={true} modules={[Pagination]} className="w-full">
{
    slides?.map((slide,index)=>(
        <SwiperSlide key={index}>
            <Image src={slide} alt="image" width={500}
            height={500} />
        </SwiperSlide>
    ))
}
        </Swiper>
    </div>
  );
};

export default SliderComponent;
