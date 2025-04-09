import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

// Modify the Bounds component to create walls around the perimeter
export function Walls({ width = 15, length = 15, wallHeight = 5 }) {
  const wallThickness = 1;

  return (
    <>
      {/* Front Wall */}
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
        position={[0, wallHeight / 2, -length / 2]}
      >
        <mesh
          geometry={new THREE.BoxGeometry(width, wallHeight, wallThickness)}
          material={new THREE.MeshStandardMaterial({ color: "slategrey" })}
          receiveShadow
        />
        <CuboidCollider
          args={[width / 2, wallHeight / 2, wallThickness / 2]}
          position={[0, 0, 0]}
        />
      </RigidBody>

      {/* Back Wall */}
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
        position={[0, wallHeight / 2, length / 2]}
      >
        <mesh
          geometry={new THREE.BoxGeometry(width, wallHeight, wallThickness)}
          material={new THREE.MeshStandardMaterial({ color: "slategrey" })}
          receiveShadow
        />
        <CuboidCollider
          args={[width / 2, wallHeight / 2, wallThickness / 2]}
          position={[0, 0, 0]}
        />
      </RigidBody>

      {/* Left Wall */}
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
        position={[-width / 2, wallHeight / 2, 0]}
      >
        <mesh
          geometry={new THREE.BoxGeometry(wallThickness, wallHeight, length)}
          material={new THREE.MeshStandardMaterial({ color: "slategrey" })}
          receiveShadow
        />
        <CuboidCollider
          args={[wallThickness / 2, wallHeight / 2, length / 2]}
          position={[0, 0, 0]}
        />
      </RigidBody>

      {/* Right Wall */}
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
        position={[width / 2, wallHeight / 2, 0]}
      >
        <mesh
          geometry={new THREE.BoxGeometry(wallThickness, wallHeight, length)}
          material={new THREE.MeshStandardMaterial({ color: "slategrey" })}
          receiveShadow
        />
        <CuboidCollider
          args={[wallThickness / 2, wallHeight / 2, length / 2]}
          position={[0, 0, 0]}
        />
      </RigidBody>
    </>
  );
}
