"use client";

import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  Environment, 
  Html,
  Stage,
  OrbitControls,
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

function Model({ obj }: { obj: THREE.Group }) {
  const meshRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!obj) return;
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/product-texture.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.anisotropy = 16;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.4, // Restored shiny finish
          metalness: 0.1,
        });
      }
    });
  }, [obj]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Auto-spin restored
    }
  });

  return <primitive ref={meshRef} object={obj} />;
}

function Scene() {
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  if (!obj) return null;

  return (
    <Stage 
      intensity={0.8} // Harsh lighting restored
      preset="rembrandt"
      environment="studio" 
      adjustCamera={1.2}
    >
      <Model obj={obj} />
    </Stage>
  );
}

export default function Product3D() {
  return (
    <div className="h-[350px] w-full sm:h-[450px] lg:h-[550px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={<Loader />}>
          <Scene />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
