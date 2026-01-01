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
  Stage,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

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
  
  // Load materials and object inside the component so they suspend together
  const materials = useLoader(MTLLoader, "/assets/product.mtl");
  const obj = useLoader(OBJLoader, "/assets/product.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Apply texture with high-quality settings
  useMemo(() => {
    if (!obj) return;
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/product-texture.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true; 
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Create a new material to ensure we have full control over lighting and textures
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.5,
          metalness: 0.1,
          side: THREE.FrontSide,
        });
        
        child.material.needsUpdate = true;
      }
    });
  }, [obj]);

  return (
    <primitive ref={meshRef} object={obj} />
  );
}

export default function Product3D() {
  return (
    <div className="h-[350px] w-full sm:h-[450px] lg:h-[550px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={<Loader />}>
          <Stage 
            intensity={0.4} 
            preset="studio" 
            environment="city" 
            adjustCamera={1.2} 
            shadows={{ type: 'contact', opacity: 0.3, blur: 3 }}
          >
            <Model />
          </Stage>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            // Limit horizontal rotation to +/- 45 degrees from front
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            // Limit vertical rotation to stay relatively level
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
