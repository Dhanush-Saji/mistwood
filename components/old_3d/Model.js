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

function Model() {
    const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco-gltf/");
  let modelLink = process.env.NEXT_PUBLIC_MODEL_LINK;
  const {nodes,materials} = useGLTF(modelLink,dracoLoader); // Adjust path as needed
  let {camera,scene} = useThree()
  const modelRef = useRef();
  const tl = gsap.timeline()
  // const { cameraPosition, scenePosition, sceneRotation } = useControls({
	// 	cameraPosition: {
	// 		value: {
	// 			x: 5,
	// 			y: 4,
	// 			z: 2.8,
	// 		},
	// 		step: 0.05,
	// 	},
	// 	scenePosition: {
	// 		value: { x: 3.01, y: 0.76, z: 3.7 },
	// 		step: 0.05,
	// 	},

	// 	sceneRotation: {
	// 		value: { x: -0.53, y: -3.48, z: -0.21 },
	// 		step: 0.01,
	// 	},
	// });

  // ---- used for debug ----

	// useFrame(() => {
	// 	camera.position.x = cameraPosition.x;
	// 	camera.position.y = cameraPosition.y;
	// 	camera.position.z = cameraPosition.z;
	// 	scene.position.x = scenePosition.x;
	// 	scene.position.y = scenePosition.y;
	// 	scene.position.z = scenePosition.z;
	// 	scene.rotation.x = sceneRotation.x;
	// 	scene.rotation.y = sceneRotation.y;
	// 	scene.rotation.z = sceneRotation.z;
	// });
  useLayoutEffect(()=>{
    new ScrollTrigger({})
tl
.to(camera.position,{x:6.2,y:4.65,z:1.95,
  scrollTrigger:{
    trigger:'.second-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
})
.to(scene.position,{x:3.11,y:2.16,z:2,
  scrollTrigger:{
    trigger:'.second-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
})
.to(scene.rotation,{x:-0.41,y:-2.76,z:-0.3,
  scrollTrigger:{
    trigger:'.second-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
})
.to(camera.position,{x:3.49,y:2.04,z:1.09,
  scrollTrigger:{
    trigger:'.third-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
})
.to(scene.position,{x:3.1,y:1.36,z:-4.25,
  scrollTrigger:{
    trigger:'.third-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
})
.to(scene.rotation,{x:0.97,y:2,z:-1.03,
  scrollTrigger:{
    trigger:'.third-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
})
  },[])
  return (
    <>
    <ambientLight intensity={4} />
        <pointLight intensity={7} position={[1, 0,0]} />
        <pointLight intensity={7} position={[1, 0,0]} />
        <directionalLight position={[0, 2, 0]} intensity={2} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
    {/* <Environment preset="warehouse" /> */}
    <OrbitControls  />
    <group ref={modelRef} dispose={null} scale={5} rotation-y={[-Math.PI * 0.8]} position={[4,-4,-1]}> 
      <mesh geometry={nodes.koltuk.geometry} material={materials.chair}  />
    </group>
    </>
  );
}

export default Model;