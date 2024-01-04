import { ViewerApp, AssetManagerPlugin,TonemapPlugin ,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GBufferPlugin,
  ProgressivePlugin
} from "webgi";
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

let needsUpdate = true
let viewer
gsap.registerPlugin(ScrollTrigger)

export async function setupViewer() {
  viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas"),
    useRgbm: false,
  });

  viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

  // await addBasePlugins(viewer);
  await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
  await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
      await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
      await viewer.addPlugin(BloomPlugin)

  const manager = await viewer.getPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera
  const position = camera.position
  const target = camera.target
  

  const importer = manager.importer;

  await viewer.renderer.refreshPipeline();

  const models = await manager.addFromPath("https://cdn.jsdelivr.net/gh/Dhanush-Saji/cdn-char-3d@main/scene.glb");
  viewer.scene.setEnvironment(
    await manager.importer.importSingle({
      path: "/env.hdr",
    })
  );

 
  const setupScrollAnimation = () =>{
     camera.position.set(9.8, 1.5, -0.8); // Initial position
camera.target.set(0, 0, 2.5);         // Initial target
    const tl = gsap.timeline()
  
    /* First section */
    tl.to(position,{x:0.6,y:2.4,z:9.6,
      scrollTrigger:{
        trigger:".second",
        start:"top bottom",
        end:"top top",
        scrub:true
      },onUpdate})
      .to(target,{x:3,y:0,z:0,duration:4,
        scrollTrigger:{
          trigger:".second",
          start:"top bottom",
          end:"top top",
          scrub:true
        }})
  }
  setupScrollAnimation()


  function onUpdate(){
    needsUpdate = true
    viewer.renderer.resetShadows()
  }
  viewer.addEventListener('preFrame',()=>{
    if(needsUpdate){
      camera.positionUpdated(false)
      camera.targetUpdated(true)
      needsUpdate = false
    }
  })
}
export function disposeViewer() {
  viewer.scene.disposeSceneModels();
  viewer.scene.dispose();
  viewer.renderer.dispose();
  viewer.dispose();
}

