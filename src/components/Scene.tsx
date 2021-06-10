import React, { useMemo, useRef } from "react";
import {
  Octahedron,
  OrbitControls,
  Stats,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Layers } from "three";
import useSlerp from "utils/use-slerp";
import FloatingCity from "./FloatingCity";
import { Stage } from "./CityStage";

export const MirrorScene = ({ text = "MIRRORS" }) => {
  const renderTarget = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(1024, {
        format: THREE.RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      }),
    []
  );

  const camera = useRef<THREE.CubeCamera>();
  const sphere = useRef<THREE.Mesh>();
  const controls = useRef();

  // TODO: explore the matcapTexture repo
  const [matcapTexture] = useMatcapTexture("C8D1DC_575B62_818892_6E747B");

  useFrame(({ gl, scene }) => {
    camera.current.update(gl, scene);
  });
  const group = useSlerp();

  return (
    <group name="mirrors-container" ref={group}>
      <Octahedron
        ref={sphere}
        layers={[1] as unknown as Layers}
        name="background"
        args={[20, 4]}
        position={[0, 0, 0]}
      >
        <meshMatcapMaterial
          matcap={matcapTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.3}
          color="#FFFFFF"
        />
      </Octahedron>
      {/* <Title text={text} name="title" layers={[0]} position={[0, 0, -10]} /> */}

      <Stage
        controls={controls}
        contactShadow={false}
        adjustCamera={false}
        position={[-1, -2.5, 0]}
        environment="city"
        preset="soft"
        intensity={0.5}
        // shadowBias={-0.0001}
      >
        {/* <axesHelper scale={0.1} position={[0, 15, 0]} /> */}
        <FloatingCity
          rotation={[0, (Math.PI / 2) * 1.5, 0]}
          layers={0}
          scale={0.2}
          // position={[-1, -2, 0]}
        />
      </Stage>

      {/* <TitleCopies text={text} layers={[1]} /> */}
      <cubeCamera
        layers={[1] as unknown as Layers}
        ref={camera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, 5]}
      />
      {/* <Mirrors layers={[0, 1]} envMap={renderTarget.texture} /> */}

      <Stats />
      <OrbitControls
        enablePan={false}
        //  enableRotate={false}
        maxAzimuthAngle={Math.PI * 0.4} // right
        minAzimuthAngle={-Math.PI * 0.2} // left
        minDistance={8}
        maxDistance={25}
        maxPolarAngle={Math.PI * 0.5} // up down
        minPolarAngle={Math.PI * 0.1}
        ref={controls}
      />
      {/* <ambientLight intensity={0.4} /> */}

      {/* <EffectComposer>
        <Vignette
          darkness={0.5}
          offset={0.1}
          eskil={false}
          blendFunction={BlendFunction.OVERLAY}
        />
        // https://vanruesc.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction
      </EffectComposer> */}
    </group>
  );
};
