// import {
//   useRapier,
//   RigidBody,
//   CuboidCollider,
//   BallCollider,
// } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber";
// import { useKeyboardControls } from "@react-three/drei";
// import { useState, useEffect, useRef } from "react";
// import Runner from "./Runner";
// import * as THREE from "three";
// import useGame from "./stores/useGame.jsx";

// export default function Player() {
//   const body = useRef();
//   const currentSpeed = useRef(0);
//   const [animation, setAnimation] = useState("rig|Idle"); // Initial animation state
//   const [subscribeKeys, getKeys] = useKeyboardControls();
//   const { rapier, world } = useRapier();
//   const [smoothedCameraPosition] = useState(
//     () => new THREE.Vector3(10, 10, 10)
//   );
//   const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
//   const start = useGame((state) => state.start);
//   const end = useGame((state) => state.end);
//   const restart = useGame((state) => state.restart);
//   const blocksCount = useGame((state) => state.blocksCount);
//   const [isGrounded, setIsGrounded] = useState(false);
//   const jump = () => {
//     if (body.current) {
//       if (isGrounded) {
//         // Only jump if grounded
//         body.current.applyImpulse({ x: 0, y: 4, z: 0 }, true);
//         setAnimation("rig|Jump"); // Set jump animation when jumping
//         setIsGrounded(false);
//       }
//     }
//   };

//   const reset = () => {
//     if (body.current) {
//       body.current.setTranslation({ x: 0, y: 1.2, z: 0 });
//       body.current.setLinvel({ x: 0, y: 0, z: 0 });
//       body.current.setAngvel({ x: 0, y: 0, z: 0 });
//     }
//   };

//   useEffect(() => {
//     const unsubscribeReset = useGame.subscribe(
//       (state) => state.phase,
//       (value) => {
//         if (value === "ready") reset();
//       }
//     );
//     const unsubscribeJump = subscribeKeys(
//       (state) => state.jump,
//       (value) => {
//         if (value) jump();
//       }
//     );
//     const unsubscribeAny = subscribeKeys(() => {
//       start();
//     });
//     return () => {
//       unsubscribeReset();
//       unsubscribeJump();
//       unsubscribeAny();
//     };
//   }, []);

//   useFrame((state, delta) => {
//     if (!body.current) return;

//     const { forward, backward, leftward, rightward, jump } = getKeys();
//     // console.log({ forward, backward, leftward, rightward, jump });

//     const velocity = body.current.linvel();

//     const rapierRot = body.current.rotation();
//     const rotation = new THREE.Quaternion(
//       rapierRot.x,
//       rapierRot.y,
//       rapierRot.z,
//       rapierRot.w
//     );

//     const localVelocity = new THREE.Vector3(
//       velocity.x,
//       velocity.y,
//       velocity.z
//     ).applyQuaternion(rotation.clone().invert());
//     currentSpeed.current = -localVelocity.z;

//     let impulseStrength = 1.2 * delta; //Base Impulse Strength
//     const impulse = new THREE.Vector3();
//     const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(rotation);
//     let targetAnimation = "rig|Idle"; //Default Animation
//     if (isGrounded) {
//       if (forward) {
//         targetAnimation = "rig|Walk"; //Default to walk
//         if (getKeys().shift) {
//           targetAnimation = "rig|Sprint"; //Sprint if shift is pressed
//           impulseStrength = 4 * delta; // up impulse strength if shift is pressed
//         }
//         impulse.add(forwardVector.multiplyScalar(impulseStrength));
//       }
//       if (backward) {
//         impulse.add(forwardVector.multiplyScalar(-impulseStrength * 0.5)); //Backwards is slower
//       }
//     }
//     // console.log(impulse);
//     // Smooth Turning
//     let targetRotationY = 0;
//     if (leftward) targetRotationY += 1;
//     if (rightward) targetRotationY -= 1;
//     const turnSpeed = 2 * delta; //Adjust this value for turn speed
//     let newRotation = new THREE.Euler(0, rapierRot.y + targetRotationY, 0);
//     body.current.setRotation(newRotation, true);

//     //Animation State Update. Only change if the target animation is different
//     if (animation !== targetAnimation) {
//       setAnimation(targetAnimation);
//     }

//     const bodyPosition = body.current.translation();
//     const cameraPosition = new THREE.Vector3().copy(bodyPosition);
//     cameraPosition.z += 4.5;
//     cameraPosition.y += 1.2;
//     const cameraTarget = new THREE.Vector3().copy(bodyPosition);
//     cameraTarget.y += 0.25;
//     smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
//     smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
//     state.camera.position.copy(smoothedCameraPosition);
//     state.camera.lookAt(smoothedCameraTarget);

//     if (bodyPosition.z < -(blocksCount * 4 + 2)) end();
//     if (bodyPosition.y < -4) restart();
//   });

//   const handleCollisionEnter = (event) => {
//     // console.log("Collision Enter:", event); // Add this line
//     if (event) {
//       setIsGrounded(true);
//     }
//   };

//   const handleCollisionExit = (event) => {
//     // console.log("Collision Exit:", event); // Add this line
//     if (event) {
//       setIsGrounded(false);
//     }
//   };
//   return (
//     // <RigidBody
//     //   ref={body}
//     //   // canSleep={false} //remove this prop
//     //   colliders="cuboid"
//     //   restitution={0.2}
//     //   friction={1}
//     //   linearDamping={0.5}
//     //   angularDamping={0.5}
//     //   position={[0, 1, 0]}
//     //   enabledRotations={[false, true, false]}
//     //   onCollisionEnter={handleCollisionEnter}
//     //   onCollisionExit={handleCollisionExit}
//     // >
//     //   <Runner
//     //     animationName={animation}
//     //     rotation={[0, Math.PI, 0]}
//     //     // scale={[0.005, 0.005, 0.005]}
//     //   />
//     //   {/* <CuboidCollider args={[0.5, 1, 0.75]} position={[0, 0, 0]} /> */}
//     // </RigidBody>
//     <RigidBody
//       ref={body}
//       // canSleep={false} //remove this prop
//       colliders="cuboid"
//       restitution={0.2}
//       friction={1}
//       linearDamping={0.5}
//       angularDamping={0.5}
//       position={[0, 1, 0]}
//       enabledRotations={[false, true, false]}
//       enabledTranslations={[true, true, true]} //THIS LINE
//       onCollisionEnter={handleCollisionEnter}
//       onCollisionExit={handleCollisionExit}
//     >
//       <Runner
//         animationName={animation}
//         rotation={[0, Math.PI, 0]}
//         // scale={[0.005, 0.005, 0.005]}
//       />
//       {/*<CuboidCollider args={[0.5, 1, 0.75]} position={[0, 0, 0]} />*/}
//       <BallCollider args={[0.75]} position={[0, 0, 0]} />
//       {/*Added sphere collider*/}
//     </RigidBody>
//   );
// }

// import { useRapier, RigidBody } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber";
// import { useKeyboardControls } from "@react-three/drei";
// import { useState, useEffect, useRef } from "react";
// import Runner from "./Runner";
// import * as THREE from "three";
// import useGame from "./stores/useGame.jsx";

// export default function Player() {
//   const body = useRef();
//   const currentSpeed = useRef(0);
//   const [subscribeKeys, getKeys] = useKeyboardControls();
//   const { world } = useRapier();
//   const [smoothedCameraPosition] = useState(
//     () => new THREE.Vector3(10, 10, 10)
//   );
//   const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
//   const start = useGame((state) => state.start);
//   const end = useGame((state) => state.end);
//   const restart = useGame((state) => state.restart);
//   const blocksCount = useGame((state) => state.blocksCount);

//   const jump = () => {
//     if (body.current && isGrounded) {
//       body.current.applyImpulse({ x: 0, y: 2, z: 0 }, true);
//       console.log("Jump triggered");
//     }
//   };

//   const reset = () => {
//     if (body.current) {
//       body.current.setTranslation({ x: 0, y: 1.2, z: 0 });
//       body.current.setLinvel({ x: 0, y: 0, z: 0 });
//       body.current.setAngvel({ x: 0, y: 0, z: 0 });
//       console.log("Reset");
//     }
//   };

//   // Ground collision state (if needed)
//   const [isGrounded, setIsGrounded] = useState(false);

//   useEffect(() => {
//     const unsubscribeReset = useGame.subscribe(
//       (state) => state.phase,
//       (value) => {
//         if (value === "ready") reset();
//       }
//     );
//     const unsubscribeJump = subscribeKeys(
//       (state) => state.jump,
//       (value) => {
//         if (value) jump();
//       }
//     );
//     const unsubscribeAny = subscribeKeys(() => {
//       start();
//     });
//     return () => {
//       unsubscribeReset();
//       unsubscribeJump();
//       unsubscribeAny();
//     };
//   }, []);

//   useFrame((state, delta) => {
//     if (!body.current) return;

//     const { forward, backward } = getKeys();
//     const velocity = body.current.linvel();

//     // Get rotation as a quaternion
//     const rapierRot = body.current.rotation();
//     const rotation = new THREE.Quaternion(
//       rapierRot.x,
//       rapierRot.y,
//       rapierRot.z,
//       rapierRot.w
//     );

//     const localVelocity = new THREE.Vector3(
//       velocity.x,
//       velocity.y,
//       velocity.z
//     ).applyQuaternion(rotation.clone().invert());
//     currentSpeed.current = -localVelocity.z;
//     console.log("Current speed:", currentSpeed.current);

//     // Lower impulse for slower movement; adjust strength as needed
//     const impulseStrength = 1 * delta;
//     const impulse = new THREE.Vector3();
//     const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(rotation);

//     if (forward) {
//       impulse.add(forwardVector.multiplyScalar(impulseStrength));
//       console.log("Forward impulse:", impulse);
//     }
//     if (backward) {
//       impulse.add(forwardVector.multiplyScalar(-impulseStrength));
//       console.log("Backward impulse:", impulse);
//     }
//     body.current.applyImpulse(impulse, true);

//     // Camera control remains unchanged
//     const bodyPosition = body.current.translation();
//     const cameraPosition = new THREE.Vector3().copy(bodyPosition);
//     cameraPosition.z += 4.5;
//     cameraPosition.y += 1.2;
//     const cameraTarget = new THREE.Vector3().copy(bodyPosition);
//     cameraTarget.y += 0.25;
//     smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
//     smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
//     state.camera.position.copy(smoothedCameraPosition);
//     state.camera.lookAt(smoothedCameraTarget);

//     if (bodyPosition.z < -(blocksCount * 4 + 2)) end();
//     if (bodyPosition.y < -4) restart();
//   });

//   const handleCollisionEnter = (event) => {
//     console.log("Collision Enter:", event);
//     if (event) setIsGrounded(true);
//   };

//   const handleCollisionExit = (event) => {
//     console.log("Collision Exit:", event);
//     if (event) setIsGrounded(false);
//   };

//   return (
//     <RigidBody
//       ref={body}
//       colliders="cuboid" // Use cuboid for a runner
//       restitution={0.2}
//       friction={1}
//       linearDamping={0.3} // You might lower damping further
//       angularDamping={0.3}
//       position={[0, 1.2, 0]}
//       enabledRotations={[false, true, false]}
//       onCollisionEnter={handleCollisionEnter}
//       onCollisionExit={handleCollisionExit}
//     >
//       <Runner
//         animationName="rig|Idle" // Starting with idle
//         rotation={[0, Math.PI, 0]}
//         scale={[0.8, 0.8, 0.8]}
//         speed={currentSpeed.current}
//       />
//     </RigidBody>
//   );
// }

// import { useRapier, RigidBody } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber";
// import { useKeyboardControls } from "@react-three/drei";
// import { useState, useEffect, useRef } from "react";
// import Runner from "./Runner";
// import * as THREE from "three";
// import useGame from "./stores/useGame.jsx";

// export default function Player() {
//   const body = useRef();
//   const [animation, setAnimation] = useState("rig|Idle");
//   const [subscribeKeys, getKeys] = useKeyboardControls();
//   const [isGrounded, setIsGrounded] = useState(false);
//   const { start, end, restart, blocksCount } = useGame();

//   const jumpImpulse = 3;

//   const jump = () => {
//     if (body.current) {
//       body.current.applyImpulse({ x: 0, y: jumpImpulse, z: 0 }, true);
//       setAnimation("rig|Jump");
//       setIsGrounded(false);
//     }
//   };

//   const reset = () => {
//     if (body.current) {
//       body.current.setTranslation({ x: 0, y: 1.5, z: 0 });
//       body.current.setLinvel({ x: 0, y: 0, z: 0 });
//       body.current.setAngvel({ x: 0, y: 0, z: 0 });
//     }
//   };

//   useEffect(() => {
//     const unsubscribeReset = useGame.subscribe(
//       (state) => state.phase,
//       (value) => {
//         if (value === "ready") reset();
//       }
//     );

//     const unsubscribeJump = subscribeKeys(
//       (state) => state.jump,
//       (pressed) => pressed && jump()
//     );

//     const unsubscribeAny = subscribeKeys(() => {
//       start();
//     });

//     return () => {
//       unsubscribeReset();
//       unsubscribeJump();
//       unsubscribeAny();
//     };
//   }, [subscribeKeys]);

//   useFrame((state, delta) => {
//     if (!body.current) return;

//     const { forward, backward, leftward, rightward, jump } = getKeys();
//     const velocity = body.current.linvel();
//     const rotationQuat = body.current.rotation();

//     // Movement setup
//     const impulseStrength =
//       forward && getKeys().shift ? 4 * delta : 1.5 * delta;
//     const impulse = new THREE.Vector3();

//     const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(
//       new THREE.Quaternion(
//         rotationQuat.x,
//         rotationQuat.y,
//         rotationQuat.z,
//         rotationQuat.w
//       )
//     );

//     if (forward) impulse.add(forwardDirection.multiplyScalar(impulseStrength));
//     if (backward)
//       impulse.add(forwardDirection.multiplyScalar(-impulseStrength * 0.5));
//     body.current.applyImpulse(impulse, true);

//     // Rotation setup
//     const rotationSpeed = 3 * delta; // Slightly faster turning
//     let euler = new THREE.Euler().setFromQuaternion(rotationQuat, "YXZ");

//     if (leftward) euler.y += rotationSpeed;
//     if (rightward) euler.y -= rotationSpeed;

//     body.current.setRotation(euler, true);
//     // Animation state handling
//     if (!isGrounded) {
//       setAnimation("rig|Jump");
//     } else if (forward) {
//       setAnimation(getKeys().shift ? "rig|Sprint" : "rig|Walk");
//     } else if (backward) {
//       setAnimation("rig|Walk");
//     } else {
//       setAnimation("rig|Idle");
//     }

//     // Camera smoothly follows player
//     const playerPosition = body.current.translation();
//     const cameraTarget = new THREE.Vector3(
//       playerPosition.x,
//       playerPosition.y + 0.5,
//       playerPosition.z
//     );
//     const cameraPosition = new THREE.Vector3(
//       playerPosition.x,
//       playerPosition.y + 2,
//       playerPosition.z + 5
//     );

//     state.camera.position.lerp(cameraPosition, 5 * delta);
//     state.camera.lookAt(cameraTarget);

//     if (playerPosition.z < -(blocksCount * 4 + 2)) end();
//     if (playerPosition.y < -4) restart();
//   });

//   const handleCollisionEnter = () => setIsGrounded(true);
//   const handleCollisionExit = () => setIsGrounded(false);

//   return (
//     <RigidBody
//       ref={body}
//       colliders="cuboid"
//       restitution={0.1}
//       friction={1}
//       linearDamping={0.3}
//       angularDamping={0.5}
//       position={[0, 1.5, 0]}
//       enabledRotations={[false, true, false]}
//       onCollisionEnter={handleCollisionEnter}
//       onCollisionExit={handleCollisionExit}
//     >
//       <Runner
//         animationName={animation}
//         rotation={[0, Math.PI, 0]}
//         scale={[0.005, 0.005, 0.005]}
//       />
//     </RigidBody>
//   );
// }

import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import Runner from "./Runner";
import * as THREE from "three";
import useGame from "./stores/useGame.jsx";

export default function Player() {
  const body = useRef();
  const [animation, setAnimation] = useState("rig|Idle");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [isGrounded, setIsGrounded] = useState(false);
  const { start, end, restart, blocksCount } = useGame();

  const jumpImpulse = 4; // Increased jump impulse for clearer jump

  const jump = () => {
    if (body.current && isGrounded) {
      body.current.applyImpulse({ x: 0, y: jumpImpulse, z: 0 }, true);
      setAnimation("rig|Jump");
      setIsGrounded(false);
    }
  };

  const reset = () => {
    if (body.current) {
      body.current.setTranslation({ x: 0, y: 1.5, z: 0 });
      body.current.setLinvel({ x: 0, y: 0, z: 0 });
      body.current.setAngvel({ x: 0, y: 0, z: 0 });
    }
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => value === "ready" && reset()
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => pressed && jump()
    );

    const unsubscribeAny = subscribeKeys(() => start());

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, [subscribeKeys]);

  useFrame((state, delta) => {
    if (!body.current) return;

    const keys = getKeys();
    const { forward, backward, leftward, rightward, shift } = keys;

    const rotationQuat = body.current.rotation();

    // Increased Impulse Strength for noticeable movement
    const impulseStrength = forward
      ? (shift ? 15 : 8) * delta
      : backward
      ? 4 * delta
      : 0;

    const impulse = new THREE.Vector3();

    const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(
      new THREE.Quaternion(
        rotationQuat.x,
        rotationQuat.y,
        rotationQuat.z,
        rotationQuat.w
      )
    );

    if (forward) impulse.add(forwardDirection.multiplyScalar(impulseStrength));
    if (backward)
      impulse.add(forwardDirection.multiplyScalar(-impulseStrength));

    body.current.applyImpulse(impulse, true);

    // Turning via Angular Velocity
    const angularSpeed = 2; // radians per second
    let angularVelocity = 0;
    if (leftward) angularVelocity += angularSpeed;
    if (rightward) angularVelocity -= angularSpeed;
    body.current.setAngvel({ x: 0, y: angularVelocity, z: 0 });

    // Animation Logic
    let newAnimation = "rig|Idle";
    if (forward) {
      newAnimation = shift ? "rig|Sprint" : "rig|Walk";
    } else if (backward) {
      newAnimation = "rig|Walk";
    }

    if (animation !== newAnimation) {
      console.log("Animation changed to:", newAnimation);
      setAnimation(newAnimation);
    }

    // Camera smoothly follows player
    const playerPosition = body.current.translation();
    const cameraTarget = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 0.5,
      playerPosition.z
    );
    const cameraPosition = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 2,
      playerPosition.z + 5
    );
    state.camera.position.lerp(cameraPosition, 5 * delta);
    state.camera.lookAt(cameraTarget);

    if (playerPosition.z < -(blocksCount * 4 + 2)) end();
    if (playerPosition.y < -4) restart();
  });

  const handleCollisionEnter = (e) => {
    console.log("Collision Entered", e);
    setIsGrounded(true);
  };

  const handleCollisionExit = (e) => {
    console.log("Collision Exited", e);
    setIsGrounded(false);
  };

  return (
    <RigidBody
      ref={body}
      colliders={false}
      restitution={0.1}
      friction={1}
      linearDamping={0.3}
      angularDamping={0.9}
      position={[0, 1.5, 0]}
      enabledRotations={[false, true, false]}
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
    >
      <CuboidCollider args={[0.3, 0.8, 0.3]} position={[0, 0.8, 0]} />
      <Runner
        animationName={animation}
        rotation={[0, Math.PI, 0]}
        scale={[0.005, 0.005, 0.005]}
      />
    </RigidBody>
  );
}
