"use client"
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { UAParser } from 'ua-parser-js';
import ThreeDLoader from '../ThreeDLoader';
import Model from './Model';

const Chair3d = () => {
  var parser = new UAParser();
  let os = (parser.getResult())?.os?.name
  if(os == 'Android'){
    return null
  }
  return (
    <Canvas id='webgi-canvas' camera={{fov:75,position:[0.5945686745105496,-0.5980635952044877,5.4756049534505875]}}>
     <ambientLight />
    <Suspense fallback={<ThreeDLoader />}>
    <Model />
    </Suspense>
  </Canvas>
  );
};


export default Chair3d;
