"use client";

import { useRef, Suspense, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { 
  PerspectiveCamera,
  Environment, 
  ContactShadows,
  Html,
  useTexture
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

  // Load OBJ and Texture
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  const texture = useTexture("/assets/product-texture.png");

  useLayoutEffect(() => {
    if (!obj) return;

    // Clone the object so we don't mutate the cached version
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Re-center geometry at origin
    obj.position.x = -center.x;
    obj.position.y = -center.y;
    obj.position.z = -center.z;

    // Scale to fit nicely in view
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.8;
    const s = targetSize / maxDim;
    obj.scale.setScalar(s);

    // Rotate to face the camera - the OBJ is likely exported with Y-up
    // but we need to rotate it so the label faces the camera (toward +Z)
    obj.rotation.y = Math.PI; // Rotate 180° to face camera
  }, [obj]);

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
          color: new THREE.Color(0xffffff),
          roughness: 0.6,
          metalness: 0.05,
          side: THREE.DoubleSide, // Render both sides to debug visibility
        });
        
        child.material.needsUpdate = true;
      }
    });
  }, [obj, texture]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse-follow rotation, clamped so user can't reveal the unedited back
    const targetY = THREE.MathUtils.clamp(state.pointer.x * 0.3, -0.4, 0.4);
    const targetX = THREE.MathUtils.clamp(-state.pointer.y * 0.15, -0.15, 0.15);

    // Gentle idle floating motion
    const idleY = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    const idleFloat = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + idleY,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.06
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      idleFloat,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
}

export default function Product3D() {
  return (
    <div className="h-[350px] w-full sm:h-[450px] lg:h-[550px]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        {/* Explicit camera looking at origin from the front */}
        <PerspectiveCamera makeDefault position={[0, 0.3, 4.5]} fov={32} />
        
        {/* Match site background */}
        <color attach="background" args={["#0B0D10"]} />

        {/* Balanced lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 6]} intensity={0.6} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.2} />
        <pointLight position={[0, 2, 4]} intensity={0.3} />
        
        <Suspense fallback={<Loader />}>
          <Model />
          
          <Environment preset="city" />
          
          <ContactShadows 
            position={[0, -1.4, 0]}
            opacity={0.3}
            scale={6}
            blur={2.5}
            far={3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
