"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useOBJ, 
  useMTL, 
  PerspectiveCamera, 
  Environment, 
  Float,
  ContactShadows,
  Center
} from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const materials = useMTL("/assets/product.mtl");
  const obj = useOBJ("/assets/product.obj");
  const meshRef = useRef<THREE.Group>(null);

  // Apply materials to the OBJ
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = materials.materials[Object.keys(materials.materials)[0]];
      // If the texture isn't loading automatically from MTL, we can force it:
      // const texture = new THREE.TextureLoader().load('/assets/product-texture.png');
      // child.material.map = texture;
    }
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow auto-rotation
    meshRef.current.rotation.y += 0.005;
    
    // Gentle floating
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <Center>
      <group ref={meshRef}>
        <primitive object={obj} scale={0.012} />
      </group>
    </Center>
  );
}

export default function Product3D() {
  return (
    <div className="h-[300px] w-full sm:h-[400px] lg:h-[450px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
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

