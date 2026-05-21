"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import {
  AnimationMixer,
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";

const MODEL_PATH = "/assets/3dmodel_knight.glb";
const DRACO_DECODER_PATH = "/assets/draco/";
const BASE_ROTATION_Y = -Math.PI / 2;
const MODEL_TARGET_SIZE = 18.5;
const MODEL_Y_OFFSET = -4.45;

function Knight() {
  const groupRef = useRef<Group>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const gltf = useLoader(GLTFLoader, MODEL_PATH, (loader) => {
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(DRACO_DECODER_PATH);
    loader.setDRACOLoader(dracoLoader);
  }) as GLTF;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      cursorRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursorRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useLayoutEffect(() => {
    const model = gltf.scene;
    const group = groupRef.current;

    if (!group) return;

    model.traverse((object) => {
      if (!(object instanceof Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.material instanceof MeshStandardMaterial) {
        object.material.roughness = Math.max(object.material.roughness, 0.48);
        object.material.metalness = Math.min(object.material.metalness, 0.82);
      }
    });

    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    model.position.sub(center);
    group.scale.setScalar(MODEL_TARGET_SIZE / maxAxis);
    group.position.set(0, MODEL_Y_OFFSET, 0);
    group.rotation.set(0, BASE_ROTATION_Y, 0);
  }, [gltf]);

  useEffect(() => {
    if (!gltf.animations.length) return;

    mixerRef.current = new AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
      mixerRef.current?.clipAction(clip).play();
    });

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [gltf]);

  useFrame((state, delta) => {
    const group = groupRef.current;

    mixerRef.current?.update(delta);

    if (!group) return;

    const cursor = cursorRef.current;
    const targetRotationX = -cursor.y * 0.08;
    const targetRotationY = BASE_ROTATION_Y + cursor.x * 0.18;
    const idleY = Math.sin(state.clock.elapsedTime * 1.1) * 0.025;

    group.rotation.x += (targetRotationX - group.rotation.x) * 0.08;
    group.rotation.y += (targetRotationY - group.rotation.y) * 0.08;
    group.position.y += (MODEL_Y_OFFSET + idleY - group.position.y) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function KnightModelScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.12, 3.5], fov: 21 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      shadows
      style={{ height: "100%", pointerEvents: "none", width: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.45} />
        <directionalLight
          castShadow
          intensity={3}
          position={[3.5, 5.5, 4.5]}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
        />
        <pointLight color="#ff5d4f" intensity={4.2} position={[-3, 1.4, 2.2]} />
        <pointLight color="#ffffff" intensity={3.2} position={[2.6, -1.2, 3]} />
        <Knight />
      </Suspense>
    </Canvas>
  );
}
