"use client"
import React from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeWrapper from './ThreeWrapper';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)
const Three = () => {
  return (
    <Canvas id='webgi-canvas' camera={{fov:75,position:[0.5945686745105496,-0.5980635952044877,5.4756049534505875]}}>
      <ThreeWrapper />
  </Canvas>
  );
};


export default Three;
