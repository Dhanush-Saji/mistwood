"use client"
import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import {
  AdaptiveDpr,
    AdaptiveEvents,
    Environment,
    OrbitControls,
    PresentationControls,
    useGLTF
  } from "@react-three/drei";
  import * as THREE from 'three'
  
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {gsap} from 'gsap';
import { useFrame, useThree } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MeshStandardMaterial } from 'three';
import { useControls } from "leva";

const dracoLoader = new DRACOLoader();
let modelLink = process.env.NEXT_PUBLIC_SOFA_LINK;
// Preload the model outside of any component
useGLTF.preload('/sofa1.glb', dracoLoader);

function Model({switchLight,currentColor}) {
  dracoLoader.setDecoderPath("/draco-gltf/");
  const {nodes,materials} = useGLTF('/sofa1.glb',dracoLoader); // Adjust path as needed
  console.log(materials.wire_000000000)
  let {camera,scene} = useThree()
  const modelRef = useRef();
  // const ambientRef = useRef()
  // const directionalRef = useRef()
  // const pointRef = useRef()
  // const spotRef = useRef()
  // useControls('Ambient Light', {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       ambientRef.current.visible = v
  //     },
  //   },
  //   color: {
  //     value: 'white',
  //     onChange: (v) => {
  //       ambientRef.current.color = new THREE.Color(v)
  //     },
  //   },
  // })

  // useControls('Directional Light', {
  //   visible: {
  //     value: true,
  //     onChange: (v) => {
  //       directionalRef.current.visible = v
  //     },
  //   },
  //   position: {
  //     x: 1,
  //     y: 1,
  //     z: 1,
  //     onChange: (v) => {
  //       directionalRef.current.position.copy(v)
  //     },
  //   },
  //   color: {
  //     value: 'white',
  //     onChange: (v) => {
  //       directionalRef.current.color = new THREE.Color(v)
  //     },
  //   },
  // })

  // useControls('Point Light', {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       pointRef.current.visible = v
  //     },
  //   },
  //   position: {
  //     x: 2,
  //     y: 0,
  //     z: 0,
  //     onChange: (v) => {
  //       pointRef.current.position.copy(v)
  //     },
  //   },
  //   color: {
  //     value: 'white',
  //     onChange: (v) => {
  //       pointRef.current.color = new THREE.Color(v)
  //     },
  //   },
  // })

  // useControls('Spot Light', {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       spotRef.current.visible = v
  //     },
  //   },
  //   position: {
  //     x: 3,
  //     y: 2.5,
  //     z: 1,
  //     onChange: (v) => {
  //       spotRef.current.position.copy(v)
  //     },
  //   },
  //   color: {
  //     value: 'white',
  //     onChange: (v) => {
  //       spotRef.current.color = new THREE.Color(v)
  //     },
  //   },
  // })
  const tl = gsap.timeline()
  // const { sceneRotation } = useControls({

	// 	sceneRotation: {
	// 		value: {x:1.5,y:0,z:0},
	// 		step: 0.01,

	// 	},
	// });
	// useFrame(() => {
	// 	modelRef.current.rotation.x = sceneRotation.x;
	// 	modelRef.current.rotation.y = sceneRotation.y;
	// 	modelRef.current.rotation.z = sceneRotation.z;
	// });

  useEffect(()=>{
    materials.wire_000000000.color.set(currentColor)
  },[currentColor])

  useLayoutEffect(()=>{
    new ScrollTrigger({})
    tl
    .to(modelRef.current.rotation, {
      x: 0.11,
      scrollTrigger: {
        trigger: '.fifth-section',
        start: "top bottom-=300",
        end: "top top",
        scrub: 0.5,
        immediateRender: false,
      }
    })
    .to(modelRef.current.position, {
      z: -2,
      scrollTrigger: {
        trigger: '.fifth-section',
        start: "top bottom-=300",
        end: "top top",
        scrub: 0.5,
        immediateRender: false,
      }
    })
  },[])

  return (
    <>
    {/* <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} /> */}
        {/* <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow /> */}
        {/* <directionalLight position={[0, 2, 0]} intensity={2} /> */}
        {switchLight.second && <pointLight intensity={1} position={[1.1, 0.4,-1.6]} />}
        {switchLight.first && <pointLight intensity={1} position={[-1.1, 0.4,-1.6]} />}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
         <Environment files='/gem_2.hdr' />
    {/* 
    <ambientLight intensity={4} />
         */}
    <OrbitControls  />
    <group ref={modelRef} dispose={null} scale={0.8} rotation={[1.5,0,0]} position={[0,0,0]}> 
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