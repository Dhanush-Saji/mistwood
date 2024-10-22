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

const dracoLoader = new DRACOLoader();
let modelLink = process.env.NEXT_PUBLIC_MODEL_LINK;
// Preload the model outside of any component
useGLTF.preload('/scene.glb', dracoLoader);

gsap.registerPlugin(ScrollTrigger)

function Model() {
  dracoLoader.setDecoderPath("/draco-gltf/");
  const {nodes,materials} = useGLTF('/scene.glb',dracoLoader); // Adjust path as needed
  let {camera,scene} = useThree()
  const modelRef = useRef();
  const tl = gsap.timeline()
  // const { cameraPosition, scenePosition, sceneRotation } = useControls({
	// 	cameraPosition: {
	// 		value: {x:1.39,y:-2,z:5.48
	// 		},
	// 		step: 0.05,
	// 	},
	// 	scenePosition: {
	// 		value: {x:-0.25,y:1.2,z:3.05},
	// 		step: 0.05,
	// 	},

	// 	sceneRotation: {
	// 		value: {x:0.25,y:-3.86,z:0.03},
	// 		step: 0.01,
	// 	},
	// });
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
.to(camera.position,{x:1.39,y:-1.9,z:5.48,
  scrollTrigger:{
    trigger:'.second-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false,
  }
},'key1')
.to(scene.position,{x:3.25,y:2,z:2.5,
  scrollTrigger:{
    trigger:'.second-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false,
  }
},'key1')
.to(scene.rotation,{x:0.14,y:-4.86,z:0.03,
  scrollTrigger:{
    trigger:'.second-section',
    start:"top bottom",
    end:"top top",
    scrub:0.5,
    immediateRender:false
  }
},'key1')
// .to(modelRef.current.rotation, {
//   y: -4,
//   scrollTrigger:{
//     trigger:'.second-section',
//     start:"top bottom",
//     end:"top top",
//     scrub:0.5,
//     immediateRender:false
//   }
// },'key1')

// .to(scene.position,{z:0,
//   scrollTrigger:{
//     trigger:'.third-section',
//     start:"top bottom",
//     end:"top top",
//     scrub:0.5,
//     immediateRender:false,
//     markers:true
//   }
// })
// .to(modelRef.current.rotation, {
//   y: -Math.PI * 2.2,
//   scrollTrigger: {
//     trigger: '.third-section',
//     start: "top bottom",
//     end: "top center",
//     scrub: 0.5,
//     immediateRender: false
//   }
// })
.to('#webgi-canvas', {
  opacity:0,
  scrollTrigger: {
    trigger:'.second-section',
    start: "center-=200 top",
    end: "bottom bottom",
    scrub: 0.5,
    immediateRender: false,
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
    <group ref={modelRef} dispose={null} scale={5} rotation-y={[-Math.PI * 0.8]} position={[4,-4.2,-1]}> 
      <mesh geometry={nodes.koltuk.geometry} material={materials.chair}  />
    </group>
    </>
  );
}

export default Model;