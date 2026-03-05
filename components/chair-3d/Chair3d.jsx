"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { UAParser } from 'ua-parser-js';
import ThreeDLoader from '../ThreeDLoader';
import Model from './Model';

const Chair3d = () => {
  const [isClient, setisClient] = useState(false);
  const [widthSize, setwidthSize] = useState(500);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setisClient(true);
    setwidthSize(windowSize);
  }, []);

  var parser = new UAParser();
  const os = (parser.getResult())?.os?.name;

  if (os === 'Android' || widthSize < 500) {
    return null;
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
