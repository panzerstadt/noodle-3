import { Text } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import useLayers from "utils/use-layers";

export const TEXT_PROPS = {
  fontSize: 2.5,
  font: "https://fonts.gstatic.com/s/syncopate/v12/pe0pMIuPIYBCpEV5eFdKvtKqBP5p.woff",
};

export const Title = ({ layers = undefined, text, ...props }) => {
  const group = useRef<THREE.Group>();

  useEffect(() => {
    group.current.lookAt(0, 0, 0);
  }, []);

  const textRef = useLayers(layers);

  return (
    <group {...props} ref={group}>
      <Text
        // @ts-ignore
        depthTest={false}
        material-toneMapped={false}
        {...TEXT_PROPS}
        ref={textRef}
      >
        {text}
      </Text>
    </group>
  );
};

export const TitleCopies = ({ layers = undefined, text }) => {
  const vertices = useMemo(() => {
    // const y = new THREE.IcosahedronGeometry(10);
    const t = (1 + Math.sqrt(5)) / 2;
    // prettier-ignore
    const vertices = [-1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0, 0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1];
    return vertices;
  }, []);

  return (
    <group name="titleCopies">
      {vertices.map((vertex, i) => (
        <Title
          text={text}
          key={"titleCopy-" + i}
          position={vertex}
          layers={layers}
          scale={0.8}
        />
      ))}
    </group>
  );
};
