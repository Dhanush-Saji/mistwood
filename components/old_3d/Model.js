import React, { Suspense } from 'react';
import {
  AdaptiveDpr,
    AdaptiveEvents,
    Environment,
    OrbitControls,
    PresentationControls,
    useGLTF
  } from "@react-three/drei";
  
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function Model() {
    const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco-gltf/");
  const model = useGLTF('https://cdn.jsdelivr.net/gh/Dhanush-Saji/cdn-char-3d@main/scene.glb',dracoLoader); // Adjust path as needed

  return (
    <>
    <ambientLight intensity={5} />
        <pointLight intensity={1} />
        <directionalLight position={[0, 2, 0]} intensity={2} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
    {/* <Environment preset="warehouse" /> */}
    <OrbitControls  />
  <primitive object={model.scene} position-y={-1.2}></primitive>
    </>
  );
}

export default Model;