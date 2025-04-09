import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface.jsx";
import TestRunner from "./TestRunner.jsx"; // <-- use your new test component

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
      { name: "shift", keys: ["ShiftLeft", "ShiftRight"] }, // <-- ADD THIS
    ]}
  >
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <Experience />
    </Canvas>
    {/* <Interface /> */}
  </KeyboardControls>
);

// import "./style.css";
// import ReactDOM from "react-dom/client";
// import { Canvas } from "@react-three/fiber";
// import TestRunner from "./TestRunner.jsx";
// import { KeyboardControls } from "@react-three/drei";

// const root = ReactDOM.createRoot(document.querySelector("#root"));

// root.render(
//   <KeyboardControls
//     map={[
//       { name: "forward", keys: ["ArrowUp", "KeyW"] },
//       { name: "backward", keys: ["ArrowDown", "KeyS"] },
//       { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
//       { name: "rightward", keys: ["ArrowRight", "KeyD"] },
//       { name: "jump", keys: ["Space"] },
//     ]}
//   >
//     <Canvas
//       shadows
//       camera={{ fov: 45, near: 0.1, far: 200, position: [2.5, 4, 6] }}
//     >
//       <TestRunner />
//     </Canvas>
//   </KeyboardControls>
// );

// index.jsx;
// import "./style.css";
// import ReactDOM from "react-dom/client";
// import { Canvas } from "@react-three/fiber";
// import TestRunner from "./TestRunner.jsx";
// import Player from "./Player.jsx";
// import { KeyboardControls } from "@react-three/drei";

// const root = ReactDOM.createRoot(document.querySelector("#root"));

// root.render(
//   <KeyboardControls
//     map={[
//       { name: "forward", keys: ["ArrowUp", "KeyW"] },
//       { name: "backward", keys: ["ArrowDown", "KeyS"] },
//       { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
//       { name: "rightward", keys: ["ArrowRight", "KeyD"] },
//       { name: "jump", keys: ["Space"] },
//     ]}
//   >
//     <Canvas
//       shadows
//       camera={{ fov: 45, near: 0.1, far: 200, position: [2.5, 4, 6] }}
//     >
//       {/* <TestRunner /> */}
//       <Player />
//     </Canvas>
//   </KeyboardControls>
// );
