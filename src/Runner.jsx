// import React, { useRef, useEffect } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import * as THREE from "three";

// export default function Runner({
//   speed = 0,
//   lean = 0,
//   animationName,
//   ...props
// }) {
//   const group = useRef();
//   const { scene, animations } = useGLTF("/models/runner.glb");
//   const { actions } = useAnimations(animations, group);

//   useEffect(() => {
//     if (actions && Object.keys(actions).length > 0) {
//       for (const clip in animations) {
//         actions[animations[clip].name].loop = THREE.LoopRepeat;
//       }

//       actions["rig|Idle"].play(); // Play initial animation
//       console.log(actions);
//     } else {
//       console.warn("Animations not yet loaded.");
//     }

//     return () => {
//       // Cleanup animations when the component unmounts
//       if (actions) {
//         try {
//           actions["rig|Idle"].stop();
//           actions["rig|Sprint"].stop();
//           actions["rig|Walk"].stop();
//           actions["rig|Jump"].stop();
//         } catch (error) {
//           console.error("Error stopping animations during cleanup:", error);
//         }
//       }
//     };
//   }, [actions, animations]);

//   useEffect(() => {
//     if (actions) {
//       try {
//         actions["rig|Idle"]?.stop();
//         actions["rig|Sprint"]?.stop();
//         actions["rig|Walk"]?.stop();
//         actions["rig|Jump"]?.stop();
//         actions[animationName]?.reset().fadeIn(0.2).play();
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   }, [animationName, actions]);

//   // Apply wireframe material to all meshes
//   scene.traverse((object) => {
//     if (object.isMesh) {
//       object.material = new THREE.MeshStandardMaterial({
//         wireframe: true,
//         color: "red",
//       });
//     }
//   });

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group scale={[0.005, 0.005, 0.005]}>
//         <primitive object={scene} />
//       </group>
//     </group>
//   );
// }

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function Runner({
  speed = 0,
  lean = 0,
  animationName,
  ...props
}) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/runner.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      console.log("Available animation keys:", Object.keys(actions));
      for (const clip in animations) {
        actions[animations[clip].name].loop = THREE.LoopRepeat;
      }

      actions["rig|Idle"].play(); // Play initial animation
    } else {
      console.warn("Animations not yet loaded.");
    }

    return () => {
      // Cleanup animations when the component unmounts
      if (actions) {
        try {
          actions["rig|Idle"].stop();
          actions["rig|Sprint"].stop();
          actions["rig|Walk"].stop();
          actions["rig|Jump"].stop();
        } catch (error) {
          console.error("Error stopping animations during cleanup:", error);
        }
      }
    };
  }, [actions, animations]);

  useEffect(() => {
    if (actions) {
      try {
        //Stop existing animations from playing
        actions["rig|Idle"]?.stop();
        actions["rig|Sprint"]?.stop();
        actions["rig|Walk"]?.stop();
        actions["rig|Jump"]?.stop();

        //Play the animation we want
        actions[animationName]?.reset().fadeIn(0.2).play();
      } catch (e) {
        console.error(e);
      }
    }
  }, [animationName, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* <group scale={[0.005, 0.005, 0.005]}> */}
      <primitive object={scene} />
      {/* </group> */}
    </group>
  );
}
