"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { alignRotY, CAKE_TARGET_HEIGHT, MODEL_PATH, type CakePose } from "@/components/home/cake/types";
import { prepareCakeScene } from "@/components/home/cake/prepareCake";

export function CakeModel({ pose }: { pose: React.MutableRefObject<CakePose> }) {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef<THREE.Group>(null);
  const idle = useRef(0);
  const displayed = useRef<CakePose | null>(null);
  const prepared = useMemo(() => prepareCakeScene(scene, CAKE_TARGET_HEIGHT), [scene]);

  useFrame((_, delta) => {
    const root = group.current;
    if (!root) return;
    const next = pose.current;
    if (!displayed.current) displayed.current = { ...next };

    const current = displayed.current;
    const tight = next.idle < 0.08;
    const smooth = 1 - Math.exp(-delta * (tight ? 13 : 10));
    current.x += (next.x - current.x) * smooth;
    current.y += (next.y - current.y) * smooth;
    current.z += (next.z - current.z) * smooth;
    current.rotX += (next.rotX - current.rotX) * smooth;
    current.rotY += (alignRotY(current.rotY, next.rotY) - current.rotY) * smooth;
    current.rotZ += (next.rotZ - current.rotZ) * smooth;
    current.scale += (next.scale - current.scale) * smooth;
    current.opacity += (next.opacity - current.opacity) * smooth;
    current.idle += (next.idle - current.idle) * smooth;

    idle.current += delta * current.idle * 0.07;
    root.position.set(current.x, current.y, current.z);
    root.rotation.set(current.rotX, current.rotY + idle.current, current.rotZ);
    root.scale.setScalar(current.scale);
    root.visible = current.opacity > 0.02;
  });

  return (
    <group ref={group}>
      <primitive object={prepared} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
