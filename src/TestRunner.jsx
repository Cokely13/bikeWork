// TestRunner.jsx
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import Runner from "./Runner";
// import React from "react";

// export default function TestRunner() {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <Runner
//         animationName="rig|Sprint"
//         rotation={[0, Math.PI, 0]}
//         scale={[0.005, 0.005, 0.005]}
//         position={[0, 1.5, 0]}
//       />
//       <OrbitControls />
//       <Environment preset="sunset" />
//     </>
//   );
// }

import {
  useKeyboardControls,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import Runner from "./Runner";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";

export default function TestRunner() {
  const [animationName, setAnimationName] = useState("rig|Idle");
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame(() => {
    const { forward, backward, jump } = getKeys();

    if (jump) {
      setAnimationName("rig|Jump");
    } else if (forward) {
      setAnimationName("rig|Sprint");
    } else if (backward) {
      setAnimationName("rig|Walk");
    } else {
      setAnimationName("rig|Idle");
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Runner
        animationName={animationName}
        rotation={[0, Math.PI, 0]}
        scale={[0.005, 0.005, 0.005]}
        position={[0, 0, 0]}
      />
      <OrbitControls />
      <Environment preset="sunset" />
    </>
  );
}
