import React, { useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import {FreeMode,Pagination} from 'swiper/modules'
import Image from "next/image";

const SliderComponent = ({ imageArray:slides }) => {
  return (
    <div className='flex sm:hidden'>
        <Swiper pagination={true} modules={[Pagination]} className="max-w-[90%]">
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