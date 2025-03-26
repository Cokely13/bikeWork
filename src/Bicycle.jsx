// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";

// export default function Bicycle({ speed = 0, ...props }) {
//   const { nodes } = useGLTF("/models/bike.glb");

//   const frontWheelRef = useRef();
//   const backWheelRef = useRef();

//   useFrame((_, delta) => {
//     const rotationAmount = speed * delta * 10;

//     if (frontWheelRef.current) {
//       frontWheelRef.current.rotation.x -= rotationAmount;
//     }
//     if (backWheelRef.current) {
//       backWheelRef.current.rotation.x -= rotationAmount;
//     }
//   });

//   console.log("Wheel A:", nodes.Wheel_a);
//   console.log("Wheel A children:", nodes.Wheel_a.children);

//   return (
//     <group {...props}>
//       {/* 🛞 Back Wheel */}
//       <group ref={backWheelRef}>
//         <primitive object={nodes.Wheel_b} />
//       </group>

//       {/* 🛞 Front Wheel */}
//       <group ref={frontWheelRef}>
//         <primitive object={nodes.Wheel_a} />
//       </group>

//       {/* 🚲 Other Bike Parts */}
//       <primitive object={nodes.Frame} />
//       <primitive object={nodes.Saddle} />
//       <primitive object={nodes.Helm} />
//       <primitive object={nodes.Pedal_a} />
//       <primitive object={nodes.Pedal_b} />
//       <primitive object={nodes.Pedal_c} />
//       <primitive object={nodes.a} />
//       <primitive object={nodes.b} />
//       <primitive object={nodes.c} />
//     </group>
//   );
// }

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Bicycle({ speed = 0, lean = 0, ...props }) {
  const { nodes } = useGLTF("/models/bike.glb");
  const bikeRef = useRef();
  const frontWheelRef = useRef();
  const backWheelRef = useRef();

  useFrame((_, delta) => {
    const rotationAmount = speed * delta * 10;

    if (bikeRef.current) {
      bikeRef.current.rotation.z = -lean * 0.5; // tweak this multiplier for realism
    }

    if (frontWheelRef.current)
      frontWheelRef.current.rotation.x -= rotationAmount;
    if (backWheelRef.current) backWheelRef.current.rotation.x -= rotationAmount;
  });

  return (
    <group {...props} ref={bikeRef}>
      <primitive object={nodes.Wheel_a} ref={frontWheelRef} />
      <primitive object={nodes.Wheel_b} ref={backWheelRef} />

      <primitive object={nodes.Frame} />
      <primitive object={nodes.Saddle} />
      <primitive object={nodes.Helm} />
      <primitive object={nodes.Pedal_a} />
      <primitive object={nodes.Pedal_b} />
      <primitive object={nodes.Pedal_c} />
      <primitive object={nodes.a} />
      <primitive object={nodes.b} />
      <primitive object={nodes.c} />
    </group>
  );
}
