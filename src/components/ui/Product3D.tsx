"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  Float,
  ContactShadows,
  Center
} from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

function Scene() {
  const materials = useLoader(MTLLoader, "/assets/product.mtl");
  
  const obj = useLoader(OBJLoader, "/assets/product.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const meshRef = useRef<THREE.Group>(null);

  // Apply texture if the MTL doesn't handle it perfectly or to ensure it's there
  useMemo(() => {
    const texture = new THREE.TextureLoader().load('/assets/product-texture.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false; // Often needed for OBJ models

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          // If it's an array of materials
          if (Array.isArray(child.material)) {
            child.material.forEach(m => {
              if (m.map === null) m.map = texture;
            });
          } else {
            if (child.material.map === null) child.material.map = texture;
          }
        }
      }
    });
  }, [obj]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow auto-rotation
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <Center>
      <group ref={meshRef}>
        <primitive object={obj} scale={0.015} />
      </group>
    </Center>
  );
}

export default function Product3D() {
  return (
    <div className="h-[300px] w-full sm:h-[400px] lg:h-[450px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Scene />
          </Float>
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
