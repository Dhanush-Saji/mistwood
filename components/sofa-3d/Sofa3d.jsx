"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Model from './Model';

gsap.registerPlugin(ScrollTrigger)
const Sofa3d = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient?(
    <Canvas camera={{fov:10}}>
      <ambientLight />
    <Suspense fallback={null}>
    <Model />
    </Suspense>
  </Canvas>
  ):(<h1>Loading..</h1>)
};


export default Sofa3d;
