import React, { Suspense } from 'react';
import {
    Environment,
    OrbitControls,
    PresentationControls,
    useGLTF
  } from "@react-three/drei";
  
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function Model() {
    const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco-gltf/");
  const model = useGLTF('/scene.glb',dracoLoader); // Adjust path as needed

  return (
    <>
    <Environment preset="warehouse" />
    <OrbitControls  />
  <primitive object={model.scene} position-y={-1.2}></primitive>
    </>
  );
}

export default Model;