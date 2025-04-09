// import * as THREE from "three";
// import { RigidBody } from "@react-three/rapier";

// export function BaseFloor({
//   width = 20,
//   length = 50,
//   y = -0.2,
//   zOffset = -10,
// }) {
//   return (
//     <RigidBody type="fixed" colliders="cuboid">
//       <mesh
//         geometry={new THREE.PlaneGeometry(width, length)}
//         material={new THREE.MeshStandardMaterial({ color: "#4a4a4a" })}
//         rotation={[-Math.PI / 2, 0, 0]} // rotate so the plane is horizontal
//         position={[0, y, zOffset]}
//         receiveShadow
//       />
//     </RigidBody>
//   );
// }

import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export function BaseFloor({
  width = 20,
  length = 50,
  y = -0.2,
  zOffset = -10,
}) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        geometry={new THREE.PlaneGeometry(width, length)}
        material={new THREE.MeshStandardMaterial({ color: "#4a4a4a" })}
        rotation={[-Math.PI / 2, 0, 0]} // rotate so the plane is horizontal
        position={[0, y, zOffset]}
        userData={{ rigidBody: "BaseFloor" }}
        receiveShadow
      />
    </RigidBody>
  );
}
