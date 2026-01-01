"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  Environment, 
  Html,
  Stage,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

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
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  const texture = useLoader(THREE.TextureLoader, "/assets/product-texture.png");
  const meshRef = useRef<THREE.Group>(null);

  useMemo(() => {
    if (!obj || !texture) return;

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.anisotropy = 16;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7, // Matte finish
          metalness: 0.05,
          side: THREE.FrontSide,
        });
        
        child.material.needsUpdate = true;
      }
    });
  }, [obj, texture]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={meshRef} object={obj} scale={0.8} />;
}

export default function Product3D() {
  return (
    <div className="h-[350px] w-full sm:h-[450px] lg:h-[550px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={<Loader />}>
          <Stage intensity={0.4} preset="studio" environment="city" adjustCamera={1.2}>
            <Model />
          </Stage>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
