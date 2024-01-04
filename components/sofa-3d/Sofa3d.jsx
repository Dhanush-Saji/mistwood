"use client"
import React from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeWrapper from './ThreeWrapper';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)
const Sofa3d = () => {
  return (
    <Canvas camera={{fov:10}}>
      <ThreeWrapper />
  </Canvas>
  );
};


export default Sofa3d;
