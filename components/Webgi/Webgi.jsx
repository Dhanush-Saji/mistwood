"use client"
import React, { useEffect } from 'react'
import { disposeViewer, setupViewer } from './webgiVal';

const Webgi = () => {
    useEffect(() => {
        setupViewer();
        return () => {
          disposeViewer();
        };
      }, []);
  return (
    // <div id="webgi-canvas-container">
      <canvas id="webgi-canvas"></canvas>
    // </div>
  )
}

export default Webgi