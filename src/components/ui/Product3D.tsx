"use client";

import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  Html,
  useTexture,
  Center
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
  const groupRef = useRef<THREE.Group>(null);
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  const texture = useTexture("/assets/product-texture.png");

  useLayoutEffect(() => {
    if (!obj || !texture) return;

    // Fix texture properties for maximum vividness
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true; 
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Use a material that pops more
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          color: new THREE.Color(0xffffff),
          roughness: 0.4,
          metalness: 0.1,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.1, // Slight self-illumination to prevent "greyed out" look
          envMapIntensity: 1.5,
        });
        child.material.needsUpdate = true;
      }
    });

    // Auto-center and scale the geometry based on its bounding box
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.0 / maxDim; // fit nicely in view
    obj.position.sub(center);
    obj.scale.setScalar(scale);

    // Face the camera directly
    obj.rotation.set(0, Math.PI, 0);
  }, [obj, texture]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth mouse interaction restricted to front
    const targetY = THREE.MathUtils.clamp(state.pointer.x * 0.4, -0.5, 0.5);
    const targetX = THREE.MathUtils.clamp(-state.pointer.y * 0.2, -0.2, 0.2);
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Center>
        {/* Adjusted scale to prevent vertical elongation feel */}
        <primitive object={obj} scale={0.014} />
      </Center>
    </group>
  );
}

export default function Product3D() {
  return (
    <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        {/* Increased distance and flattened FOV to reduce perspective distortion (elongation) */}
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={25} />
        
        {/* High-intensity studio lighting */}
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
        <pointLight position={[-10, 5, 10]} intensity={1.5} />
        <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} />
        
        <Suspense fallback={<Loader />}>
          <Model />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={8} blur={3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
