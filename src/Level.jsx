import * as THREE from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import { Float, Text, useGLTF } from "@react-three/drei";
import { BaseFloor } from "./BaseFloor";

export function BlockMid({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          geometry={new THREE.BoxGeometry(1, 1, 1)}
          material={new THREE.MeshStandardMaterial({ color: "limegreen" })}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="/bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Ryan Cokely
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={new THREE.BoxGeometry(1, 1, 1)}
        material={new THREE.MeshStandardMaterial({ color: "limegreen" })}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Text
        font="/bebas-neue-v9-latin-regular.woff"
        scale={1}
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={new THREE.BoxGeometry(1, 1, 1)}
        material={new THREE.MeshStandardMaterial({ color: "limegreen" })}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      {/* You might include a decorative end object here */}
    </group>
  );
}

/*
  Modify the Bounds component to remove or open up walls where the branches exit.
  For simplicity, here's a version with no side walls on the branches.
*/
function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        {/* Instead of continuous walls, create a central boundary
            that only surrounds the center branch */}
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={new THREE.BoxGeometry(1, 1, 1)}
          material={new THREE.MeshStandardMaterial({ color: "slategrey" })}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />
        <CuboidCollider
          type="fixed"
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}

export function Level({ count = 5, seed = 0 }) {
  const leftAngle = THREE.MathUtils.degToRad(30);
  const rightAngle = THREE.MathUtils.degToRad(-30);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      <group>
        {/* Left branch */}
        <group rotation={[0, leftAngle, 0]} position={[-2, 0, 0]}>
          <Float floatIntensity={0.25} rotationIntensity={0.25}>
            <Text
              font="/bebas-neue-v9-latin-regular.woff"
              scale={0.5}
              position={[0, 2, -3]}
            >
              About
              <meshBasicMaterial toneMapped={false} />
            </Text>
          </Float>
          {Array.from({ length: count }).map((_, i) => (
            <RigidBody key={`left-${i}`} type="fixed" colliders="cuboid">
              <BlockMid position={[0, 0, -4 * (i + 1)]} />
            </RigidBody>
          ))}
        </group>

        {/* Center branch */}
        <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
          <Float floatIntensity={0.25} rotationIntensity={0.25}>
            <Text
              font="/bebas-neue-v9-latin-regular.woff"
              scale={0.5}
              position={[0, 2, -3]}
            >
              Skills & Projects
              <meshBasicMaterial toneMapped={false} />
            </Text>
          </Float>
          {Array.from({ length: count }).map((_, i) => (
            <RigidBody key={`center-${i}`} type="fixed" colliders="cuboid">
              <BlockMid position={[0, 0, -4 * (i + 1)]} />
            </RigidBody>
          ))}
        </group>

        {/* Right branch */}
        <group rotation={[0, rightAngle, 0]} position={[2, 0, 0]}>
          <Text
            font="/bebas-neue-v9-latin-regular.woff"
            scale={0.5}
            position={[0, 2, -3]}
          >
            Contact
            <meshBasicMaterial toneMapped={false} />
          </Text>
          {Array.from({ length: count }).map((_, i) => (
            <RigidBody key={`right-${i}`} type="fixed" colliders="cuboid">
              <BlockMid position={[0, 0, -4 * (i + 1)]} />
            </RigidBody>
          ))}
        </group>
      </group>
      <BaseFloor width={200} length={500} y={-0.2} zOffset={-25} />
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
