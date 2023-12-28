"use client"
import React from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeWrapper from './ThreeWrapper';
const Three = () => {
  return (
    <Canvas id='webgi-canvas'>
      <ThreeWrapper />
  </Canvas>
  );
};


export default Three;
