// // // Floor.jsx
// // import * as THREE from "three";
// // import { RigidBody, CuboidCollider } from "@react-three/rapier";

// // export function Floor({ width = 15, length = 15, y = -0.2, zOffset = 0 }) {
// //   return (
// //     <RigidBody
// //       type="fixed"
// //       restitution={0.2}
// //       friction={1}
// //       position={[0, y, zOffset]}
// //     >
// //       <mesh
// //         receiveShadow
// //         userData={{ rigidBody: "BaseFloor" }} // Important for collision detection
// //       >
// //         <planeGeometry args={[width, length]} />
// //         <meshStandardMaterial color="#4a4a4a" />
// //         <CuboidCollider
// //           args={[width / 2, 0.1, length / 2]} // Half extents
// //           position={[0, 0, 0]} // Center the collider
// //         />
// //       </mesh>
// //     </RigidBody>
// //   );
// // }

import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export function Floor({ width = 15, length = 15, y = -0.2, zOffset = 0 }) {
  const texture = new THREE.TextureLoader().load("/textures/checkerboard.png"); // Replace with your texture path
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10); // Adjust repetition as needed

  return (
    <RigidBody
      type="fixed"
      restitution={0.2}
      friction={1}
      position={[0, y, zOffset]}
    >
      <mesh
        receiveShadow
        userData={{ rigidBody: "BaseFloor" }} // Important for collision detection
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        <CuboidCollider
          args={[width / 2, 0.1, length / 2]} // Half extents
          position={[0, 0, 0]} // Center the collider
        />
      </mesh>
    </RigidBody>
  );
}
