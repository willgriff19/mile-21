"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  Float,
  ContactShadows,
  Center,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--callouts)] border-t-transparent" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--callouts)]">Loading 3D...</p>
      </div>
    </Html>
  );
}

function Scene() {
  const materials = useLoader(MTLLoader, "/assets/product.mtl");
  
  const obj = useLoader(OBJLoader, "/assets/product.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const meshRef = useRef<THREE.Group>(null);

  // Apply texture and ensure materials are visible
  useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/product-texture.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Ensure the mesh is visible and has a material
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(m => {
            if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhongMaterial) {
              m.map = texture;
              m.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [obj]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <Center top>
      <group ref={meshRef}>
        {/* Adjusted scale to be more likely visible - OBJ scales vary wildly */}
        <primitive object={obj} scale={0.8} />
      </group>
    </Center>
  );
}

export default function Product3D() {
  return (
    <div className="h-[350px] w-full sm:h-[450px] lg:h-[500px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={40} />
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={1} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Scene />
          </Float>
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
