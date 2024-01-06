"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Model from './Model';
import SofaModelLights from '../SofaModelLights';
import ModalColorChangeBtns from '../ModalColorChangeBtns';


gsap.registerPlugin(ScrollTrigger)
const Sofa3d = () => {
  const [switchLight, setswitchLight] = useState({first:false,second:false})
  const [currentColor, setCurrentColor] = useState('');
  return(
    <>
    <SofaModelLights switchLight={switchLight} setswitchLight={setswitchLight} />
    <ModalColorChangeBtns setCurrentColor={setCurrentColor} />
    <Canvas id='sofa-canvas' camera={{fov:15}}>
      <ambientLight />
    <Suspense fallback={null}>
    <Model switchLight={switchLight} currentColor={currentColor} />
    </Suspense>
  </Canvas>
    </>
  )
};


export default Sofa3d;
