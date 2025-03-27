import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// function Rider() {
//   const { scene } = useGLTF("/models/racer.glb");
//   return <primitive object={scene} />;
// }

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
        {/* Rider: now as part of the lean group */}
        {/* <group position={[0, 0.5, 0]} scale={[0.4, 0.4, 0.4]}>
          <Rider />
        </group> */}

        {/* Wheels */}
        {nodes.Wheel_a && (
          <group
            position={[
              nodes.Wheel_a.position.x + 0.03,
              nodes.Wheel_a.position.y + 0.36,
              nodes.Wheel_a.position.z + 0.038,
            ]}
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

        {nodes.Wheel_b && (
          <group
            position={[+0.03, 0.36, -1.042]}
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

        {/* Frame and other parts */}
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
