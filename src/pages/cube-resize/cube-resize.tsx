import * as THREE from "three";
import { Form } from "react-bootstrap";
import { cubeState } from "./cube.state";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Setup } from "./Setup";

const Range = () => {
  const cubeSettings = cubeState();

  // Slider Componente hier ergänzen
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Zoom Value {}</Form.Label>
          <input
            type="range"
            className="form-range"
            id="customRange1"
            defaultValue={1}
            min={cubeSettings.rangeMin}
            max={cubeSettings.rangeMax}
            onChange={(event) =>
              cubeSettings.setCubeHeight(
                event.target.value as unknown as number
              )
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const CubeResize = () => {
  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <Setup cameraPosition={new THREE.Vector3(0, 10, 40)}>{Scene()}</Setup>
      {Range()}
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

const Scene = () => {
  const cubeSettings = cubeState();
  return (
    <>
      <fog attach="fog" args={["#f0f0f0", 100, 200]} />
      <Box cubeHeight={cubeSettings.transformCubeHeight} color={"hotpink"} />
      <gridHelper args={[100, 10]} />
    </>
  );
};

const Box = ({ cubeHeight = 1, color = "orange", ...restProps }) => {
  const cubeSettings = cubeState();
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);

  const m = new THREE.Matrix4();

  useEffect(() => {
    ref.current!.applyMatrix4(
      m.makeScale(1, cubeSettings.transformCubeHeight, 1)
    );
    // ref.current!.position.y = Math.sin(0 + clock.elapsedTime) * 5;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default CubeResize;
