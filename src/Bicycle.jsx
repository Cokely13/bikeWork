// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";

// export default function Bicycle({ speed = 0, lean = 0, ...props }) {
//   const { nodes } = useGLTF("/models/bike.glb");

//   const leanGroupRef = useRef(); // Inner group that holds all visible meshes
//   const frontWheelRef = useRef();
//   const backWheelRef = useRef();

//   useFrame((_, delta) => {
//     const rotationAmount = speed * delta * 10;

//     if (leanGroupRef.current) {
//       console.log("Lean value:", lean);
//       leanGroupRef.current.rotation.z = THREE.MathUtils.lerp(
//         leanGroupRef.current.rotation.z,
//         -lean * 0.4,
//         0.2 // Slightly faster easing to help you notice it
//       );
//     }

//     // Spin wheels
//     if (frontWheelRef.current)
//       frontWheelRef.current.rotation.x -= rotationAmount;
//     if (backWheelRef.current) backWheelRef.current.rotation.x -= rotationAmount;
//   });

//   // return (
//   //   <group>
//   //     <group {...props} ref={leanGroupRef}>
//   //       {/* Wheels */}
//   //       {/* <mesh
//   //         ref={frontWheelRef}
//   //         geometry={nodes.Wheel_a.geometry}
//   //         material={nodes.Wheel_a.material}
//   //         position={nodes.Wheel_a.position}
//   //         rotation={nodes.Wheel_a.rotation}
//   //         scale={nodes.Wheel_a.scale}
//   //       /> */}
//   //       <group
//   //         ref={frontWheelRef}
//   //         position={nodes.Wheel_a.position}
//   //         rotation={nodes.Wheel_a.rotation}
//   //         scale={nodes.Wheel_a.scale}
//   //       >
//   //         <mesh
//   //           geometry={nodes.Wheel_a.geometry}
//   //           material={nodes.Wheel_a.material}
//   //           position={[0, 0, 0]} // reset position so it rotates around center
//   //         />
//   //       </group>
//   //       {/* <mesh
//   //         ref={backWheelRef}
//   //         geometry={nodes.Wheel_b.geometry}
//   //         material={nodes.Wheel_b.material}
//   //         position={nodes.Wheel_b.position}
//   //         rotation={nodes.Wheel_b.rotation}
//   //         scale={nodes.Wheel_b.scale}
//   //       /> */}
//   //       <group
//   //         ref={backWheelRef}
//   //         position={nodes.Wheel_b.position}
//   //         rotation={nodes.Wheel_b.rotation}
//   //         scale={nodes.Wheel_b.scale}
//   //       >
//   //         <mesh
//   //           geometry={nodes.Wheel_b.geometry}
//   //           material={nodes.Wheel_b.material}
//   //           position={[0, 0, 0]} // reset to center
//   //         />
//   //       </group>

//   //       {/* Other parts */}
//   //       <primitive object={nodes.Frame} />
//   //       <primitive object={nodes.Saddle} />
//   //       <primitive object={nodes.Helm} />
//   //       <primitive object={nodes.Pedal_a} />
//   //       <primitive object={nodes.Pedal_b} />
//   //       <primitive object={nodes.Pedal_c} />
//   //       <primitive object={nodes.a} />
//   //       <primitive object={nodes.b} />
//   //       <primitive object={nodes.c} />
//   //     </group>
//   //   </group>
//   // );

//   return (
//     <group>
//       <group {...props} ref={leanGroupRef}>
//         {/* FRONT WHEEL */}
//         <group
//           position={nodes.Wheel_a.position}
//           rotation={nodes.Wheel_a.rotation}
//           scale={nodes.Wheel_a.scale}
//         >
//           <mesh
//             ref={frontWheelRef} // <-- this is the actual spinning mesh
//             geometry={nodes.Wheel_a.geometry}
//             material={nodes.Wheel_a.material}
//             position={[0, 0, 0]} // reset any inherited offset
//           />
//         </group>

//         {/* BACK WHEEL */}
//         <group
//           position={nodes.Wheel_b.position}
//           rotation={nodes.Wheel_b.rotation}
//           scale={nodes.Wheel_b.scale}
//         >
//           <mesh
//             ref={backWheelRef}
//             geometry={nodes.Wheel_b.geometry}
//             material={nodes.Wheel_b.material}
//             position={[0, 0, 0]}
//           />
//         </group>

//         {/* Other parts */}
//         <primitive object={nodes.Frame} />
//         <primitive object={nodes.Saddle} />
//         <primitive object={nodes.Helm} />
//         <primitive object={nodes.Pedal_a} />
//         <primitive object={nodes.Pedal_b} />
//         <primitive object={nodes.Pedal_c} />
//         <primitive object={nodes.a} />
//         <primitive object={nodes.b} />
//         <primitive object={nodes.c} />
//       </group>
//     </group>
//   );
// }

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Bicycle({ speed = 0, lean = 0, ...props }) {
  const { nodes } = useGLTF("/models/bike.glb");

  const leanGroupRef = useRef();
  const frontWheelRef = useRef();
  const backWheelRef = useRef();

  // Optional: center geometry to avoid strange pivot points
  useEffect(() => {
    if (nodes.Wheel_a?.geometry) nodes.Wheel_a.geometry.center();
    if (nodes.Wheel_b?.geometry) nodes.Wheel_b.geometry.center();
  }, [nodes]);

  useFrame((_, delta) => {
    const rotationAmount = speed * delta * 10;

    if (leanGroupRef.current) {
      leanGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        leanGroupRef.current.rotation.z,
        -lean * 0.4,
        0.1
      );
    }

    if (frontWheelRef.current) {
      frontWheelRef.current.rotation.x -= rotationAmount;
    }
    if (backWheelRef.current) {
      backWheelRef.current.rotation.x -= rotationAmount;
    }
  });

  return (
    <group {...props}>
      <group ref={leanGroupRef}>
        {/* Front Wheel */}
        {nodes.Wheel_a && (
          <group
            position={nodes.Wheel_a.position}
            rotation={nodes.Wheel_a.rotation}
            scale={nodes.Wheel_a.scale}
          >
            <mesh
              ref={frontWheelRef}
              geometry={nodes.Wheel_a.geometry}
              material={nodes.Wheel_a.material}
              position={[0, 0, 0]}
            />
          </group>
        )}

        {/* Back Wheel */}
        {nodes.Wheel_b && (
          <group
            position={[0, 0, -1.0]} // 👈 tweak this Z value to move it behind the bike
            rotation={nodes.Wheel_b.rotation}
            scale={nodes.Wheel_b.scale}
          >
            <mesh
              ref={backWheelRef}
              geometry={nodes.Wheel_b.geometry}
              material={nodes.Wheel_b.material}
              position={[0, 0, 0]}
            />
          </group>
        )}

        {/* Frame and parts */}
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
    </group>
  );
}
