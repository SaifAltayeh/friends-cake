"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CAKE_CAMERA, CAKE_TARGET_HEIGHT } from "@/components/home/cake/types";
import { prepareCakeScene } from "@/components/home/cake/prepareCake";
import { CakeLights } from "@/components/home/cake/CakeLights";

function CardCake({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const group = useRef<THREE.Group>(null);
  const prepared = useMemo(
    () => prepareCakeScene(scene, CAKE_TARGET_HEIGHT, { hideStage: true }),
    [scene],
  );

  useFrame((state, delta) => {
    state.camera.lookAt(0, 0.28, 0);
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={0.68} rotation={[0.04, 0.4, 0]}>
      <primitive object={prepared} />
    </group>
  );
}

export function ProductModelPreview({ path }: { path: string }) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.7]}
      camera={{
        position: [CAKE_CAMERA.x, CAKE_CAMERA.y, CAKE_CAMERA.z],
        fov: CAKE_CAMERA.fov,
        near: 0.1,
        far: 40,
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ width: "100%", height: "100%", background: "transparent", pointerEvents: "none" }}
    >
      <CakeLights />
      <Suspense fallback={null}>
        <CardCake path={path} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/birthday.glb");
useGLTF.preload("/models/dark-chocolate.glb");
