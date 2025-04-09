// import { Physics } from "@react-three/rapier";
// import useGame from "./stores/useGame.jsx";
// import Lights from "./Lights.jsx";
// import { Level } from "./Level.jsx";
// import Player from "./Player.jsx";
// import Cyclist from "./Cyclist.jsx";

// export default function Experience() {
//   const blocksCount = useGame((state) => state.blocksCount);
//   const blocksSeed = useGame((state) => state.blocksSeed);

//   return (
//     <>
//       <color args={["#bdedfc"]} attach="background" />

//       <Physics debug={false}>
//         <Lights />
//         <Level count={blocksCount} seed={blocksSeed} />
//         <Player />
//         {/* <Cyclist /> */}
//       </Physics>
//     </>
//   );
// }

import { Physics } from "@react-three/rapier";
import useGame from "./stores/useGame.jsx";
import Lights from "./Lights.jsx";
// import { Level } from "./Level.jsx"; // Remove Level import
import Player from "./Player.jsx";
import { Floor } from "./Floor.jsx"; // Import the floor
import { Walls } from "./Walls.jsx"; //Import Walls Component

export default function Experience() {
  // const blocksCount = useGame((state) => state.blocksCount); // No longer needed
  // const blocksSeed = useGame((state) => state.blocksSeed);  // No longer needed

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />

      <Physics debug={false}>
        <Lights />
        {/* <Level count={blocksCount} seed={blocksSeed} /> */}
        <Floor width={20} length={50} y={-0.2} zOffset={-25} />
        <Walls width={200} length={500} wallHeight={10} />
        <Player />
      </Physics>
    </>
  );
}
