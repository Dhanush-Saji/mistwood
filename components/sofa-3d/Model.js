import React, { Suspense, useLayoutEffect, useRef } from 'react';
import {
  AdaptiveDpr,
    AdaptiveEvents,
    Environment,
    OrbitControls,
    PresentationControls,
    useGLTF
  } from "@react-three/drei";
  
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {gsap} from 'gsap';
import { useFrame, useThree } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useControls } from "leva";
import { MeshStandardMaterial } from 'three';

const dracoLoader = new DRACOLoader();
let modelLink = process.env.NEXT_PUBLIC_SOFA_LINK;

function Model() {
  dracoLoader.setDecoderPath("/draco-gltf/");
  const {nodes,materials} = useGLTF('/sofa1.glb',dracoLoader); // Adjust path as needed
  let {camera,scene} = useThree()
  const modelRef = useRef();
  const tl = gsap.timeline()
  // const { cameraPosition, scenePosition, sceneRotation } = useControls({
	// 	// cameraPosition: {
	// 	// 	value: {x:0,y:0,z:0
  // 	// 		},
	// 	// 	step: 0.05,
	// 	// },
	// 	scenePosition: {
	// 		value: {x:0,y:0,z:0},
	// 		step: 0.05,
	// 	},

	// 	sceneRotation: {
	// 		value: {x:0,y:0,z:0},
	// 		step: 0.01,

	// 	},
	// });
	// useFrame(() => {
	// 	// camera.position.x = cameraPosition.x;
	// 	// camera.position.y = cameraPosition.y;
	// 	// camera.position.z = cameraPosition.z;
	// 	scene.position.x = scenePosition.x;
	// 	scene.position.y = scenePosition.y;
	// 	scene.position.z = scenePosition.z;
	// 	scene.rotation.x = sceneRotation.x;
	// 	scene.rotation.y = sceneRotation.y;
	// 	scene.rotation.z = sceneRotation.z;
	// });



  // useLayoutEffect(()=>{
  //   new ScrollTrigger({})
  // },[])

  return (
    <>
        {/* <pointLight intensity={2} position={[0, 0,3]} /> */}
        {/* <directionalLight position={[0, 2, 0]} intensity={2} /> */}
        {/* <pointLight intensity={7} position={[1, 0,0]} /> */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
         <Environment files='/gem_2.hdr' />
    {/* 
    <ambientLight intensity={4} />
         */}
    <OrbitControls  />
    <group ref={modelRef} dispose={null} scale={0.4}> 
    <group position={[0, -0.658, 0]} scale={0.039}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object001.geometry}
          material={materials.wire_000000000}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object002.geometry}
          material={materials.wire_000000000}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object004.geometry}
          material={materials.wire_000000000}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object003.geometry}
          material={materials.wire_000000000}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={materials.wire_086086086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object008.geometry}
          material={materials.wire_086086086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object007.geometry}
          material={materials.wire_086086086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object005.geometry}
          material={materials.wire_086086086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object006.geometry}
          material={materials.wire_086086086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object009.geometry}
          material={materials.wire_086086086}
        />
      </group>


    </group>
    </>
  );
}
useGLTF.preload('/sofa1.glb',dracoLoader);

export default Model;