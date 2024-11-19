import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import InfoBox from "../components/InfoBox";
import SliderBar from "../components/SliderBar";
import Modal from "../components/Modal";
import {MdOutlineKeyboardDoubleArrowRight,MdOutlineKeyboardDoubleArrowLeft,} from "react-icons/md";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  width: 20%;
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
  width: 50%;
  height: 700px;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightFrame = styled.div`
  width: 30%;
  height: 100%;
  border: solid 1px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const InfoFrame = styled.div`
  width: 100%;
  height: 200px;
  border: solid 1px;
`;

const ControlFrame = styled.div`
  width: 100%;
  height: 300px;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 50px;
`;

const ControlBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 0 10px; /* 버튼 간격 */
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e2e6ea;
  }

  &:active {
    background-color: #d6d8db;
  }
`;

const AlokasiaModel = () => {
  const { scene } = useGLTF("/models/Alokasia/Alokasia6.glb");
  return (
    <primitive object={scene} scale={10} position={[0, 0, 0]} /> // 모델 위치 설정
  );
};

const SanseveriaModel = () => {
  const { scene } = useGLTF("/models/Sanseveria/Sanseveria10.glb"); // GLB 파일 경로를 정확히 지정
  return (
    <primitive object={scene} scale={10} position={[0, 0, 0]} /> // 모델 위치 설정
  );
};

const GrowingContent = () => {
  const [plantName, setPlantName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(null); // 현재 활성화된 슬라이더 ('temperature', 'humidity', 또는 null)
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(50);

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

  const toggleSlider = (type) => {
    setShowSlider((prev) => (prev === type ? null : type));
  };

  return (
    <Container>
      <Frame>
        <TitleFrame>
          {plantName && `${plantName}의 성장 페이지입니다.`}
        </TitleFrame>

        <PlantContainer>
          <LeftFrame>
            <ArrowIcon onClick={handleArrowClick}>
              {isModalOpen ? (
                <MdOutlineKeyboardDoubleArrowLeft />
              ) : (
                <MdOutlineKeyboardDoubleArrowRight />
              )}
            </ArrowIcon>
          </LeftFrame>

          <MainFrame>
            <Canvas>
              <ambientLight intensity={1.0} />
              <directionalLight position={[2, 5, 2]} intensity={1.2} />
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                rotateSpeed={0.7}
                target={[0, 0, 0]}
              />
              {/* 조건부 렌더링으로 모델 선택 */}
              {plantName === "알로카시아 프라이덱" && <AlokasiaModel />}
              {plantName === "산세베리아 슈퍼바" && <SanseveriaModel />}
            </Canvas>
          </MainFrame>

          <RightFrame>
            <InfoFrame>
              <InfoBox />
            </InfoFrame>
            <ControlFrame>
              <div>
                <SliderBar
                  isVisible={showSlider === "temperature"}
                  type="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                <ControlBtn onClick={() => toggleSlider("temperature")}>
                  온도조절
                </ControlBtn>
              </div>
              <div>
                <SliderBar
                  isVisible={showSlider === "humidity"}
                  type="humidity"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
                <ControlBtn onClick={() => toggleSlider("humidity")}>
                  습도조절
                </ControlBtn>
              </div>
            </ControlFrame>
          </RightFrame>
        </PlantContainer>

        <Modal onClose={closeModal} isOpen={isModalOpen} />
      </Frame>
    </Container>
  );
};

const Growing = () => {
  return <Main props={<GrowingContent />} footerVisible={false} />;
};

export default Growing;
