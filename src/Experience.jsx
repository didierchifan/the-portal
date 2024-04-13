import {
  Sparkles,
  Center,
  useGLTF,
  OrbitControls,
  useTexture,
  shaderMaterial,
} from "@react-three/drei";

import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import * as THREE from "three";

export function Cat(props) {
  const { nodes, materials } = useGLTF("./model/cat.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.oziCat.geometry}
        position={[0, 0.174, -0.477]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color={new THREE.Color("#dbdbdb")} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.oziCat001.geometry}
        material={nodes.oziCat001.material}
        position={[0, 0.174, -0.477]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color={new THREE.Color("#ff0000")} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/cat.glb");

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#0a0908"),
    uColorEnd: new THREE.Color("#d1ac00"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color args={["#030202"]} attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh geometry={nodes.poleLightA.geometry}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh geometry={nodes.poleLightB.geometry}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh geometry={nodes.portalLight.geometry}>
          <portalMaterial ref={portalMaterial} />
        </mesh>

        {/* <Cat /> */}

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.3}
          count={60}
        />
      </Center>
    </>
  );
}
