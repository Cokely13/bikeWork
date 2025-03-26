import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import Bicycle from "./Bicycle";
import * as THREE from "three";
import useGame from "./stores/useGame.jsx";

export default function Player() {
  const body = useRef();
  const currentSpeed = useRef(0);
  const lean = useRef(0);
  const [leanState, setLeanState] = useState(0);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  //   const jump = () => {
  //     const origin = body.current.translation();
  //     origin.y -= 0.31;
  //     const direction = { x: 0, y: -1, z: 0 };
  //     const ray = new rapier.Ray(origin, direction);
  //     const hit = world.castRay(ray, 10, true);

  //     if (hit.timeOfImpact < 0.15) {
  //       body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
  //     }
  //   };
  //   const jump = () => {
  //     const bodyPosition = body.current.translation();

  //     // 📌 Start a bit below the bike’s center
  //     const origin = {
  //       x: bodyPosition.x,
  //       y: bodyPosition.y - 1.2, // go lower depending on your bike’s height
  //       z: bodyPosition.z,
  //     };

  //     const direction = { x: 0, y: -1, z: 0 };
  //     const ray = new rapier.Ray(origin, direction);

  //     // Cast down 1.5 meters
  //     const hit = world.castRay(ray, 1.5, true);

  //     console.log("JUMP ray hit:", hit);

  //     if (hit && hit.toi < 0.15) {
  //       body.current.applyImpulse({ x: 0, y: 1, z: 0 }, true);
  //     }
  //   };

  const jump = () => {
    body.current.applyImpulse({ x: 0, y: 1, z: 0 }, true);
  };

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();
    const velocity = body.current.linvel();
    // currentSpeed.current = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);

    // const impulse = { x: 0, y: 0, z: 0 };
    // const torque = { x: 0, y: 0, z: 0 };

    // const impulseStrength = 0.6 * delta;
    // const torqueStrength = 0.2 * delta;

    // if (forward) {
    //   impulse.z -= impulseStrength;
    //   torque.x -= torqueStrength;
    // }

    // if (rightward) {
    //   impulse.x += impulseStrength;
    //   torque.z -= torqueStrength;
    // }

    // if (backward) {
    //   impulse.z += impulseStrength;
    //   torque.x += torqueStrength;
    // }

    // if (leftward) {
    //   impulse.x -= impulseStrength;
    //   torque.z += torqueStrength;
    // }

    // body.current.applyImpulse(impulse);
    // body.current.applyTorqueImpulse(torque);

    const impulseStrength = 4 * delta;
    const torqueStrength = 1 * delta;

    const impulse = new THREE.Vector3();
    const torque = new THREE.Vector3();

    // ✅ Get rotation from body (quaternion-based)
    const rapierRot = body.current.rotation();
    const rotation = new THREE.Quaternion(
      rapierRot.x,
      rapierRot.y,
      rapierRot.z,
      rapierRot.w
    );

    const localVelocity = new THREE.Vector3(
      velocity.x,
      velocity.y,
      velocity.z
    ).applyQuaternion(
      new THREE.Quaternion(
        rapierRot.x,
        rapierRot.y,
        rapierRot.z,
        rapierRot.w
      ).invert()
    );
    currentSpeed.current = -localVelocity.z;

    // Update lean direction based on keypress
    let targetLean = 0;
    if (leftward) targetLean = 1;
    if (rightward) targetLean = -1;

    // Smooth transition
    lean.current = THREE.MathUtils.lerp(lean.current, targetLean, 0.2);
    setLeanState(lean.current);

    // ✅ Forward and right vectors based on actual rotation
    const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(rotation);
    const rightVector = new THREE.Vector3(1, 0, 0).applyQuaternion(rotation);

    // Apply impulses based on keys and direction
    if (forward) impulse.add(forwardVector.multiplyScalar(impulseStrength));
    if (backward) impulse.add(forwardVector.multiplyScalar(-impulseStrength));
    if (leftward) torque.y += torqueStrength;
    if (rightward) torque.y -= torqueStrength;

    body.current.applyImpulse(impulse, true);
    body.current.applyTorqueImpulse(torque, true);

    /**
     * Camera
     */
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /**
     * Phases
     */
    if (bodyPosition.z < -(blocksCount * 4 + 2)) end();

    if (bodyPosition.y < -4) restart();
  });

  return (
    // <RigidBody
    //   ref={body}
    //   canSleep={false}
    //   //   colliders="ball"
    //   colliders="cuboid"
    //   restitution={0.2}
    //   friction={1}
    //   linearDamping={0.5}
    //   angularDamping={0.5}
    //   position={[0, 1, 0]}
    // >
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="cuboid"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
      enabledRotations={[false, true, false]} // 👈 Only allow rotation on Y
    >
      {/* <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh> */}

      <Bicycle
        rotation={[0, Math.PI, 0]}
        speed={currentSpeed.current}
        lean={leanState}
      />
    </RigidBody>
  );
}
