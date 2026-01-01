"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  Float,
  ContactShadows,
  Center,
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
  
  // Load ONLY the OBJ and Texture - bypassing the buggy MTL file entirely
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  const texture = useLoader(THREE.TextureLoader, "/assets/product-texture.png");

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
          roughness: 0.4,
          metalness: 0.1,
          side: THREE.FrontSide,
        });
        
        child.material.needsUpdate = true;
      }
    });
  }, [obj, texture]);

  return (
    <primitive 
      ref={meshRef} 
      object={obj} 
      scale={0.012} // Adjusted scale for OBJ
      rotation={[0, 0, 0]} // Ensure it starts facing forward
    />
  );
}

export default function Product3D() {
  return (
    <div className="h-[350px] w-full sm:h-[450px] lg:h-[550px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={35} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <Center top>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
              <Model />
            </Float>
          </Center>
          
          <Environment preset="city" />
          
          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.8}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
