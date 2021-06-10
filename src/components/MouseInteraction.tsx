import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const MouseInteraction = ({ children }) => {
  const group = useRef<THREE.Group>();
  const rotationEuler = new THREE.Euler(0, 0, 0);
  const rotationQuaternion = new THREE.Quaternion(0, 0, 0, 0);
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 100;
    const y = (mouse.y * viewport.height) / 100;

    rotationEuler.set(y, x, 0);
    rotationQuaternion.setFromEuler(rotationEuler);

    group.current.quaternion.slerp(rotationQuaternion, 0.1);
  });

  return <group ref={group}>{children}</group>;
};
