'use client'
import { Html, useProgress } from '@react-three/drei'
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ThreeDLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
    as='div'
    center
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width:'100vw',
      height:'100vh',
      position:'absolute',
      zIndex:9999,
      backgroundColor:'white'
    }}
  >
    <div style={{ width: 50, height: 50 }} className='text-black'>
    <CircularProgressbar styles={buildStyles({textSize:'25px'})} value={Number(progress).toFixed(2)} maxValue={1} text={`${Number(progress).toFixed(0)}%`} />
    </div>
  </Html>
  )
}

export default ThreeDLoader