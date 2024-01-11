'use client'
import { Html, useProgress } from '@react-three/drei'
import React from 'react'

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
    }}
  >
    <span className='canvas-loader'></span>
    <p
      style={{
        fontSize: 14,
        fontWeight: 800,
        marginTop: 40,
      }}
    >
      {progress.toFixed(2)}%
    </p>
  </Html>
  )
}

export default ThreeDLoader