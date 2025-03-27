import { useGLTF } from "@react-three/drei";

export default function Cyclist(props) {
  const { scene } = useGLTF("/models/cyclist/scene.gltf");
  return <primitive object={scene} {...props} />;
}
