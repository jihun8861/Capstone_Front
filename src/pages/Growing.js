import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import InfoBox from "../components/InfoBox";
import SliderBar from "../components/SliderBar";
import Modal from "../components/Modal";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaSeedling } from "react-icons/fa";
import SunlightSlider from "../components/SunlightSlider";
import { GiWateringCan } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: #63b26d;
  color: white;
  margin-bottom: 30px;
`;

const PlantContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const LeftFrame = styled.div`
  width: 25%;
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

const MainContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainFrame = styled.div`
  width: 100%;
  height: 90%;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBottomFrame = styled.div`
  width: 100%;
  height: 10%;
  position: relative;
`;

const RightFrame = styled.div`
  width: 25%;
  height: 100%;
  border: solid 1px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const WaterButton = styled.button`
  width: 160px;
  height: 60px;
  border: 1px solid #63b26d;
  border-radius: 30px;
  background-color: #63b26d;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #519957;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #407a45;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const WaterButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
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
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const AlokasiaModel = () => {
  const { scene } = useGLTF("/models/Alokasia/Alokasia10.glb");
  return <primitive object={scene} scale={10} position={[0, 0, 0]} />;
};

const SanseveriaModel = () => {
  const { scene } = useGLTF("/models/Sanseveria/Sanseveria8.glb"); // GLB 파일 경로를 정확히 지정
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
  const [sunlight, setSunlight] = useState(3); // 기본값 3단계

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

  const handleWatering = () => {
    toast.success("💧 식물에게 물을 주었습니다!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        marginBottom: "100px",
      },
    });
  };

  return (
    <Container>
      <Frame>
        <TitleFrame>
          <FaSeedling />
          {plantName && `${plantName}`}
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

          <MainContainer>
            <MainFrame>
              <Canvas
                camera={{
                  position: [0, 5, 10], //초기 카메라 각도
                  fov: 40,
                }}
              >
                <ambientLight intensity={1.0} />
                <directionalLight position={[2, 5, 2]} intensity={1.2} />
                <OrbitControls
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  rotateSpeed={0.7}
                  target={[0, 0, 0]} // 카메라가 바라볼 중심점
                />
                {plantName === "알로카시아 프라이덱" && <AlokasiaModel />}
                {plantName === "산세베리아 슈퍼바" && <SanseveriaModel />}
              </Canvas>
            </MainFrame>

            <MainBottomFrame>
              <WaterButtonContainer>
                <WaterButton onClick={handleWatering}>
                  <GiWateringCan style={{ fontSize: "22px" }} />물 주기
                </WaterButton>
              </WaterButtonContainer>
            </MainBottomFrame>
          </MainContainer>

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
              <div>
                <SunlightSlider
                  isVisible={showSlider === "sunlight"}
                  value={sunlight}
                  onChange={(e) => setSunlight(e.target.value)}
                />
                <ControlBtn onClick={() => toggleSlider("sunlight")}>
                  햇빛조절
                </ControlBtn>
              </div>
            </ControlFrame>
          </RightFrame>
        </PlantContainer>

        <Modal onClose={closeModal} isOpen={isModalOpen} />
      </Frame>

      {/* ToastContainer 추가 */}
      <ToastContainer />
    </Container>
  );
};

const Growing = () => {
  return <Main props={<GrowingContent />} footerVisible={false} />;
};

export default Growing;
