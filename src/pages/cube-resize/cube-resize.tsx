import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box, CubeCamera } from "@react-three/drei";
import { Vector3 } from "three";
import { Setup } from "./Setup";

const Showcase = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Setup cameraPosition={new Vector3(0, 10, 40)}>{Scene()}</Setup>
    </div>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      axisHelper: object;
    }
  }
}

const sphere = ({ offset = 0, ...props }) => {
  const ref = React.useRef<THREE.Group>();
  useFrame(({ clock }) => {
    ref.current!.position.y = Math.sin(offset + clock.elapsedTime) * 5;
  });

  return (
    <CubeCamera {...props}>
      {(texture) => (
        <mesh ref={ref}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshStandardMaterial roughness={0} metalness={1} envMap={texture} />
        </mesh>
      )}
    </CubeCamera>
  );
};

const Scene = () => {
  return (
    <>
      <fog attach="fog" args={["#f0f0f0", 100, 200]} />
      <Box material-color="hotpink" args={[5, 5, 5]} position-y={2.5} />
      <gridHelper args={[100, 10]} />
    </>
  );
};

export default Showcase;
