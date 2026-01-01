"use client";

import { useRef, Suspense, useLayoutEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  Html,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 whitespace-nowrap">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--callouts)] border-t-transparent" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--callouts)]">Loading 3D...</p>
      </div>
    </Html>
  );
}

function Model() {
  const meshRef = useRef<THREE.Group>(null);
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  const texture = useLoader(THREE.TextureLoader, "/assets/product-texture.png");

  useLayoutEffect(() => {
    if (!obj || !texture) return;

    // 1. Prepare texture
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true; 
    texture.anisotropy = 16;

    // 2. Auto-center and Scale the geometry
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Shift model so its center is at [0,0,0]
    obj.position.x = -center.x;
    obj.position.y = -center.y;
    obj.position.z = -center.z;

    // Scale so it fits in a 3-unit box
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim;
    obj.scale.setScalar(scale);

    // 3. Apply Materials
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.65,
          metalness: 0.05,
        });
      }
    });
  }, [obj, texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth mouse interaction
    const targetY = state.pointer.x * 0.4;
    const targetX = -state.pointer.y * 0.2;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
  });

  return (
    <group ref={meshRef}>
      <primitive object={obj} />
    </group>
  );
}

export default function Product3D() {
  return (
    <div className="relative h-[350px] w-full sm:h-[450px] lg:h-[550px]">
      {/* Fallback image shown while 3D loads or if it fails */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 transition-opacity duration-1000">
        <img src="/assets/product-tub.png" alt="" className="h-4/5 w-auto grayscale" />
      </div>

      <Canvas shadows dpr={[1, 2]} className="relative z-10" gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
        
        {/* Stronger lights to ensure visibility */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, 2, -5]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <Model />
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
