import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Container = styled.div`
    width: 100%;
    height: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AlokasiaModel = () => {
  const { scene } = useGLTF("/models/Alokasia/Alokasia10.glb");
  return <primitive object={scene} scale={5} position={[0, 0, 0]} />;
};

const SimpleModelViewer = () => {
  return (
    <Container>
    <Canvas
      camera={{
        position: [0, 5, 10],
        fov: 40,
      }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[2, 5, 2]} intensity={1.2} />
      
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.7}
      />
      <AlokasiaModel />
    </Canvas>
    </Container>
  );
};

export default SimpleModelViewer;