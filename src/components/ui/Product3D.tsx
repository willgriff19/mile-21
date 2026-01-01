"use client";

import { useRef, Suspense, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
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

  // Load ONLY the OBJ and Texture - bypass the MTL (it references old filenames + isn't needed)
  const obj = useLoader(OBJLoader, "/assets/product.obj");
  const texture = useTexture("/assets/product-texture.png");

  const baseRotation = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!obj) return;

    // Auto-center + auto-scale: this OBJ is exported in mm and offset in world-space.
    // Without this, you end up looking at a “slice” of the model.
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Re-center geometry at origin
    obj.position.sub(center);

    // Scale to a consistent size in our scene
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.6;
    const s = targetSize / maxDim;
    obj.scale.setScalar(s);
  }, [obj]);

  useMemo(() => {
    if (!obj || !texture) return;

    texture.colorSpace = THREE.SRGBColorSpace;
    // This export behaves correctly with flipY=true
    texture.flipY = true;
    texture.anisotropy = 16;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Keep the tub matte black; apply the texture map to all parts for now.
        // If you export a full wrap label later (or split label mesh), we can
        // map only the label material.
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          color: new THREE.Color(0xffffff),
          roughness: 0.7,
          metalness: 0.05,
          side: THREE.FrontSide,
        });
        
        child.material.needsUpdate = true;
      }
    });
  }, [obj, texture]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse-follow rotation, clamped so user can’t reveal the unedited back.
    const targetY = THREE.MathUtils.clamp(state.pointer.x * 0.35, -0.45, 0.45);
    const targetX = THREE.MathUtils.clamp(-state.pointer.y * 0.18, -0.18, 0.18);

    // Gentle idle motion that stays within front-only range
    const idle = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      baseRotation.current.y + targetY + idle,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      baseRotation.current.x + targetX,
      0.08
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
        <color attach="background" args={["#0B0D10"]} />

        {/* Softer lighting (avoid blown highlights) */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 7]} intensity={0.7} castShadow />
        <directionalLight position={[-6, 2, -7]} intensity={0.25} />
        
        <Suspense fallback={<Loader />}>
          <Model />
          
          <Environment preset="studio" />
          
          <ContactShadows 
            position={[0, -1.55, 0]}
            opacity={0.28}
            scale={7}
            blur={3}
            far={3.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
