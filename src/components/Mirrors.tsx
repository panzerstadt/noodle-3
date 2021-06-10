import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { MutableRefObject, useRef, useState } from "react";
import { Texture } from "three";
import { ThinFilmFresnelMap } from "../utils/ThinFilmFresnelMap";
// import { ThinFilmFresnelMap } from "../utils/thinFilmFresnelMapOld";
import { mirrorsData } from "./constants";
import * as THREE from "three";
import useLayers from "utils/use-layers";

export const Mirrors = ({ envMap, layers, ...props }) => {
  const sideMaterialRef = useRef<THREE.MeshLambertMaterial>();
  const reflectionMaterialRef = useRef<THREE.MeshLambertMaterial>();
  const [thinFilmFresnelMap] = useState(
    new ThinFilmFresnelMap() as unknown as Texture
  );

  return (
    <group name="mirrors" {...props}>
      <meshLambertMaterial
        ref={sideMaterialRef}
        map={thinFilmFresnelMap}
        color="#AAAAAA"
      />
      <meshLambertMaterial
        ref={reflectionMaterialRef}
        map={thinFilmFresnelMap}
        envMap={envMap}
      />

      {mirrorsData.mirrors.map((mirror, index) => (
        <Mirror
          key={`mirror-${index}`}
          layers={layers}
          {...mirror}
          name={`mirror-${index}`}
          sideMaterial={sideMaterialRef.current}
          reflectionMaterial={reflectionMaterialRef.current}
        />
      ))}
    </group>
  );
};

const Mirror = ({
  sideMaterial,
  reflectionMaterial,
  args,
  layers,
  ...props
}) => {
  const ref = useLayers(layers) as MutableRefObject<THREE.Mesh>;

  useFrame(() => {
    ref.current.rotation.y += 0.001;
    ref.current.rotation.z += 0.01;
  });

  return (
    <Box
      {...props}
      ref={ref}
      args={args}
      material={[
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        reflectionMaterial,
        reflectionMaterial,
      ]}
    />
  );
};
