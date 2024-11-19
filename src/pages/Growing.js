import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import InfoBox from "../components/InfoBox";
import Modal from "../components/Modal";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"; // 닫기 아이콘 추가
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Container = styled.div`
  width: 100%;
  height: 980px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
`;

const TitleFrame = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px;
`;

const PlantContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const LeftFrame = styled.div`
  width: 10%;
  height: 100%;
  border: solid 1px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const ArrowIcon = styled.div`
  font-size: 42px;
  cursor: pointer;
  transition: transform 0.3s ease;
`;

const MainFrame = styled.div`
  width: 65%;
  height: 700px;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightFrame = styled.div`
  width: 25%;
  height: 100%;
  border: solid 1px;
  display: flex;
  justify-content: center;
`;

// 3D 모델 컴포넌트
const AlokasiaModel = () => {
  const { scene } = useGLTF("/models/Alokasia/Alokasia8.glb");
  return <primitive object={scene} scale={10} />;
};

const GrowingContent = () => {
  const [plantName, setPlantName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const selectedPlant = localStorage.getItem("selectedPlant");
    setPlantName(selectedPlant || "");
  }, []);

  const handleArrowClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Frame>
        <TitleFrame>
          {plantName && `${plantName}의 성장 페이지입니다.`}
        </TitleFrame>

        <PlantContainer>
          <LeftFrame>
            {/* 화살표 아이콘 클릭 시 상태에 따라 변경 */}
            <ArrowIcon onClick={handleArrowClick}>
              {isModalOpen ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
            </ArrowIcon>
          </LeftFrame>

          <MainFrame>
            <Canvas>
              <ambientLight intensity={1.0} /> {/* 조명 강도를 증가시켜서 밝게 */}
              <directionalLight position={[2, 5, 2]} intensity={1.2} /> {/* 방향광 강도 증가 */}
              <OrbitControls
                enableZoom={false} // 확대 비활성화
                maxPolarAngle={Math.PI / 2} // 하단 회전 제한
                rotateSpeed={0.7} // 회전 속도 감소 (기본값: 1)
              />
              <AlokasiaModel />
            </Canvas>
          </MainFrame>

          <RightFrame>
            <InfoBox />
          </RightFrame>
        </PlantContainer>

        <Modal onClose={closeModal} isOpen={isModalOpen} />
      </Frame>
    </Container>
  );
};

const Growing = () => {
  return <Main props={<GrowingContent />} />;
};

export default Growing;
