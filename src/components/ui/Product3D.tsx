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

function Model({ obj }: { obj: THREE.Group }) {
  const meshRef = useRef<THREE.Group>(null);

  // Apply texture with high-quality settings
  useMemo(() => {
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
        
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.5, // Slightly rougher to reduce overblown highlights
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

function Scene() {
  const materials = useLoader(MTLLoader, "/assets/product.mtl");
  const obj = useLoader(OBJLoader, "/assets/product.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <Stage 
      intensity={0.4} // Significantly reduced lighting intensity
      preset="studio" // Changed back to studio for softer lighting
      environment="city" 
      adjustCamera={1.2} 
      shadows={{ type: 'contact', opacity: 0.3, blur: 3 }}
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
          {/* 
            OrbitControls restricted to prevent seeing the back:
            - minAzimuthAngle / maxAzimuthAngle: limits left/right rotation
            - minPolarAngle / maxPolarAngle: limits up/down rotation
          */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            // Limit horizontal rotation to +/- 45 degrees from front
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            // Limit vertical rotation to stay relatively level
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.8}
            // Make it feel responsive to mouse but snaps back
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
