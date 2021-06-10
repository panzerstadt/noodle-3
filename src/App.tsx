import React, { Suspense } from "react";
import "./App.css";
import { MirrorScene } from "components/Scene";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 20], fov: 40 }}
        gl={{
          stencil: false,
          depth: false,
          alpha: false,
          antialias: false,
        }}
      >
        {/* <fog attach="fog" args={["red", 25, 40]} />
        <color attach="background" args={["#ffdd41"]} /> */}

        <color attach="background" args={["#FC9E4F"]} />
        <fog
          color={"red" as unknown as THREE.Color}
          attach="fog"
          near={15}
          far={60}
        />
        {/* <color attach="background" args={["#EEF0F2"]} /> */}
        {/* <fog
          color={"#F8F9FB" as unknown as THREE.Color}
          attach="fog"
          near={8}
          far={28}
        /> */}
        <Suspense fallback={<Html>Loading!</Html>}>
          <MirrorScene text="panzerstadt" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
