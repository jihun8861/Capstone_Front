import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Main from "../components/Main";
import InfoBox from "../components/InfoBox";
import Modal from "../components/Modal";
import MultiSlider from "../components/MultiSlider";
import Swal from "sweetalert2";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaSeedling } from "react-icons/fa";
import { GiWateringCan } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
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

const WaterBarContainer = styled.div`
  width: 200px;
  height: 20px;
  border: 1px solid #63b26d;
  border-radius: 10px;
  background-color: #e0e0e0;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
`;

const WaterBar = styled.div`
  height: 100%;
  width: ${(props) => props.level}%;
  background-color: #63b26d;
  transition: width 0.3s ease-in-out;
`;

const WaterLevelText = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 5px;
`;

const AlokasiaModel = () => {
  const { scene } = useGLTF("/models/Alokasia/Alokasia10.glb");
  return <primitive object={scene} scale={10} position={[0, 0, 0]} />;
};

const SanseveriaModel = () => {
  const { scene } = useGLTF("/models/Sanseveria/Sanseveria8.glb");
  return <primitive object={scene} scale={10} position={[0, 0, 0]} />;
};

const GrowingContent = () => {
  const location = useLocation();
  const plantData = location.state?.plantData || {};
  const [userEmail, setUserEmail] = useState("");

  const [plantName, setPlantName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(null);
  const [temperature, setTemperature] = useState(plantData.temperature);
  const [humidity, setHumidity] = useState(plantData.humidity);
  const [light, setLight] = useState(plantData.light);
  const [waterLevel, setWaterLevel] = useState(plantData.water);

  // 10분마다 리렌더링 트리거
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => prev);
      setHumidity((prev) => prev);
      setLight((prev) => prev);
      setWaterLevel((prev) => prev);
    }, 10 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, []);

  // 초기 사용자 이메일 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/getuser",
            { token }
          );
          if (response.data && response.data.email) {
            setUserEmail(response.data.email);
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // 식물 데이터 업데이트 함수
  const updatePlantData = async (updatedData) => {
    try {
      if (!userEmail) {
        console.error("사용자 이메일이 없습니다.");
        return;
      }

      const response = await axios.post(
        "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/plant/update/plant",
        {
          username: userEmail,
          ...updatedData
        }
      );

      if (response.status === 200) {
        console.log("식물 데이터 업데이트 성공:", updatedData);
      }
    } catch (error) {
      console.error("식물 데이터 업데이트 중 오류 발생:", error);
      Swal.fire({
        title: "오류 발생!",
        text: "데이터 업데이트 중 문제가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#ff6b6b",
      });
    }
  };

  // 식물 데이터 초기화
  useEffect(() => {
    if (plantData.plantName) {
      setPlantName(plantData.plantName);
      setTemperature(plantData.temperature ?? 20);
      setHumidity(plantData.humidity ?? 50);
      setLight(plantData.light ?? "보통");
      setWaterLevel(plantData.water ?? 0);
    } else {
      const savedPlant = localStorage.getItem("selectedPlant");
      setPlantName(savedPlant || "");
    }
  }, [plantData]);

  // 온도 변경 핸들러
  const handleTemperatureChange = (e) => {
    const newTemp = e.target.value;
    setTemperature(newTemp);
  };

  const handleTemperatureChangeEnd = () => {
    updatePlantData({ temperature: temperature });
  };

  // 습도 변경 핸들러
  const handleHumidityChange = (e) => {
    const newHumidity = e.target.value;
    setHumidity(newHumidity);
  };

  const handleHumidityChangeEnd = () => {
    updatePlantData({ humidity: humidity });
  };

  // 햇빛 변경 핸들러
  const handleLightChange = (e) => {
    const newLight = Number(e.target.value);
    setLight(newLight);
  };

  const handleLightChangeEnd = () => {
    const lightLabels = ["매우 약함", "약함", "보통", "강함", "매우 강함"];
    const lightValue = lightLabels[light - 1];
    updatePlantData({ light: lightValue });
  };

  // 물주기 핸들러
  const handleWatering = () => {
    if (waterLevel >= 100) {
      Swal.fire({
        title: "❌ 물을 줄 수 없습니다!",
        text: "현재 물 양이 이미 최대치입니다.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#ff6b6b",
        customClass: {
          popup: "popup-alert",
        },
      });
      return;
    }

    const newWaterLevel = Math.min(waterLevel + 20, 100);
    setWaterLevel(newWaterLevel);
    updatePlantData({ water: newWaterLevel });

    Swal.fire({
      title: "💧 물을 주었습니다!",
      text: `현재 물 양이 ${newWaterLevel}%입니다.`,
      icon: "success",
      confirmButtonText: "확인",
      confirmButtonColor: "#63b26d",
      customClass: {
        popup: "popup-alert",
      },
    });
  };

  // 모달 및 슬라이더 토글 핸들러
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
                  position: [0, 5, 10],
                  fov: 40,
                }}
              >
                <ambientLight intensity={1.0} />
                <directionalLight position={[2, 5, 2]} intensity={1.2} />
                <OrbitControls
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  rotateSpeed={0.7}
                  target={[0, 0, 0]}
                />
                {plantName === "알로카시아 프라이덱" && <AlokasiaModel />}
                {plantName === "산세베리아 슈퍼바" && <SanseveriaModel />}
              </Canvas>
            </MainFrame>

            <MainBottomFrame>
              <WaterButtonContainer>
                <WaterButton onClick={handleWatering}>
                  <GiWateringCan style={{ fontSize: "22px" }} /> 물 주기
                </WaterButton>
                <WaterBarContainer>
                  <WaterBar level={waterLevel} />
                </WaterBarContainer>
                <WaterLevelText>{`현재 물양: ${waterLevel}%`}</WaterLevelText>
              </WaterButtonContainer>
            </MainBottomFrame>
          </MainContainer>

          <RightFrame>
            <InfoFrame>
              <InfoBox
                temperature={temperature}
                humidity={humidity}
                light={light}
              />
            </InfoFrame>
            <ControlFrame>
              <div>
                <MultiSlider
                  isVisible={showSlider === "temperature"}
                  type="temperature"
                  value={temperature}
                  onChange={handleTemperatureChange}
                  onChangeEnd={handleTemperatureChangeEnd}
                />
                <ControlBtn onClick={() => toggleSlider("temperature")}>
                  온도조절
                </ControlBtn>
              </div>
              <div>
                <MultiSlider
                  isVisible={showSlider === "humidity"}
                  type="humidity"
                  value={humidity}
                  onChange={handleHumidityChange}
                  onChangeEnd={handleHumidityChangeEnd}
                />
                <ControlBtn onClick={() => toggleSlider("humidity")}>
                  습도조절
                </ControlBtn>
              </div>
              <div>
                <MultiSlider
                  isVisible={showSlider === "light"}
                  type="light"
                  value={light}
                  onChange={handleLightChange}
                  onChangeEnd={handleLightChangeEnd}
                />
                <ControlBtn onClick={() => toggleSlider("light")}>
                  햇빛조절
                </ControlBtn>
              </div>
            </ControlFrame>
          </RightFrame>
        </PlantContainer>

        <Modal onClose={closeModal} isOpen={isModalOpen} />
      </Frame>

      <ToastContainer />
    </Container>
  );
};

const Growing = () => {
  return <Main props={<GrowingContent />} footerVisible={false} />;
};

export default Growing;