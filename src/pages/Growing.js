import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Main from "../components/Main";
import InfoBox from "../components/InfoBox";
import Modal from "../components/Modal";
import MultiSlider from "../components/MultiSlider";
import StatusGauge from "../components/StatusGauge";
import { sunlightLevels } from "../constants";
import Swal from "sweetalert2";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GiWateringCan } from "react-icons/gi";
import axios from "axios";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 170px;
`;

const PlantContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const LeftFrame = styled.div`
  width: 28%;
  height: 100%;
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
  width: 47%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const RightFrame = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoFrame = styled.div`
  width: 100%;
  height: 25%;
`;

const ControlFrame = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 50px 20px;
`;

const StateFrame = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  padding-bottom: 40px;
`

const RightBottom = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
`;

const WaterButton = styled.button`
  width: 160px;
  height: 55px;
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
  left: 20px;
`;

const WaterBarContainer = styled.div`
  width: 400px;
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

const ScoreFrame = styled.div`
  width: 100%;
  height: 10%;
`;

const ScoreContainer = styled.div`
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ScoreText = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #333;
`;

const ScoreInputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
`;

const ScoreInput = styled.input`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100px;
`;

const ScoreButton = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #63b26d;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #519957;
  }
`;

const ModelText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const GrowingContent = () => {
  const location = useLocation();
  const plantData = location.state?.plantData || {};
  const [userEmail, setUserEmail] = useState("");

  const [plantName, setPlantName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showSlider, setShowSlider] = useState(null);
  const [temperature, setTemperature] = useState(plantData.temperature);
  const [nowtem, setNowtem] = useState(plantData.nowtem);
  const [humidity, setHumidity] = useState(plantData.humidity);
  const [light, setLight] = useState(plantData.light);
  const [waterLevel, setWaterLevel] = useState(plantData.water);
  const [plantScore, setPlantScore] = useState(plantData.score || 0);

  const [currentModelNumber, setCurrentModelNumber] = useState(null);

  const [scoreInput, setScoreInput] = useState('');

  const handleScoreInputChange = (e) => {
    setScoreInput(e.target.value);
  };

// handleScoreSubmit 함수를 다음과 같이 수정
const handleScoreSubmit = async () => {
  const additionalScore = parseInt(scoreInput);
  if (isNaN(additionalScore) || additionalScore < 0) {
    Swal.fire({
      title: "잘못된 입력",
      text: "유효한 점수를 입력해주세요.",
      icon: "error",
      confirmButtonText: "확인",
      confirmButtonColor: "#ff6b6b",
    });
    return;
  }

  const newTotalScore = plantScore + additionalScore; // 현재 점수에 입력된 점수를 더함

  try {
    const response = await axios.post(
      "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/plant/add/score",
      {
        username: userEmail,
        score: additionalScore // 더할 점수만 서버로 전송
      }
    );

    if (response.status === 200) {
      setPlantScore(newTotalScore); // 새로운 총점으로 상태 업데이트
      setScoreInput('');
      Swal.fire({
        title: "성공",
        text: `${additionalScore}점이 추가되어 총 ${newTotalScore}점이 되었습니다.`,
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#63b26d",
      });
    }
  } catch (error) {
    console.error("점수 업데이트 중 오류 발생:", error);
    Swal.fire({
      title: "오류 발생",
      text: "점수 업데이트에 실패했습니다.",
      icon: "error",
      confirmButtonText: "확인",
      confirmButtonColor: "#ff6b6b",
    });
  }
};

  // 3D 모델 선택 함수
  const selectPlantModel = (plantName, score) => {
    const modelPrefix = plantName === "알로카시아 프라이덱" ? "Alokasia" : "Sansevieria";
    let modelNumber;
  
    const scoreStages = {
      "산세베리아 슈퍼바": [
        { max: 200, model: 1 },
        { max: 500, model: 2 },
        { max: 1000, model: 3 },
        { max: 1456, model: 4 },
        { max: 2500, model: 5 },
        { max: 4000, model: 6 },
        { max: 5616, model: 7 },
        { max: 7000, model: 8 },
        { max: 8500, model: 9 },
        { max: Infinity, model: 10 },
      ],
      "알로카시아 프라이덱": [
        { max: 200, model: 1 },
        { max: 600, model: 2 },
        { max: 1100, model: 3 },
        { max: 1451, model: 4 },
        { max: 3000, model: 5 },
        { max: 5000, model: 6 },
        { max: 6872, model: 7 },
        { max: 8000, model: 8 },
        { max: 9000, model: 9 },
        { max: Infinity, model: 10 },
      ],
    };
  
    // 단계별 점수 기준에 따라 modelNumber 설정
    const stages = scoreStages[plantName];
    for (const stage of stages) {
      if (score <= stage.max) {
        modelNumber = stage.model;
        break;
      }
    }
    setCurrentModelNumber(modelNumber);
    return `/models/${modelPrefix}/${modelPrefix}${modelNumber}.glb`;
  };
  
// 3D 모델 컴포넌트
const PlantModel = ({ plantName, score }) => {
  const modelPath = selectPlantModel(plantName, score);
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={10} position={[0, 0, 0]} />;
};

  const calculateAlokasiaStatus = () => {
    let suitableConditions = 0;
  
    if (temperature < 8 || temperature > 39) return "매우 나쁨";
    if (waterLevel === 0) return "매우 나쁨";
    if (temperature >= 18 && temperature <= 29) suitableConditions += 1;
    if (humidity >= 70) suitableConditions += 1;
    if (["매우약함", "약함", "보통"].includes(sunlightLevels[light - 1])) suitableConditions += 1;
    if (waterLevel > 0) suitableConditions += 1;
  
    if (suitableConditions === 4) return "매우 좋음";
    if (suitableConditions === 3) return "좋음";
    if (suitableConditions === 2) return "보통";
    if (suitableConditions === 1) return "나쁨";
    return "매우 나쁨";
  };
  
  const calculateSanseveriaStatus = () => {
    let suitableConditions = 0;
  
    if (temperature < 8 || temperature > 40) return "매우 나쁨";
    if (waterLevel === 0) return "매우 나쁨";
    if (temperature >= 18 && temperature <= 30) suitableConditions += 1;
    if (humidity >= 40 && humidity <= 70) suitableConditions += 1;
    if (["매우약함", "약함", "보통"].includes(sunlightLevels[light - 1])) suitableConditions += 1;
    if (waterLevel > 0) suitableConditions += 1;
  
    if (suitableConditions === 4) return "매우 좋음";
    if (suitableConditions === 3) return "좋음";
    if (suitableConditions === 2) return "보통";
    if (suitableConditions === 1) return "나쁨";
    return "매우 나쁨";
  };
  
  // 상태 계산 함수 통합
  const calculateStatus = () => {
    if (plantName === "알로카시아 프라이덱") {
      return calculateAlokasiaStatus();
    } else if (plantName === "산세베리아 슈퍼바") {
      return calculateSanseveriaStatus();
    }
    return "알 수 없음";
  };
  
  useEffect(() => {
    // 10초마다 식물 데이터 새로고침
    const fetchPlantData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && userEmail) {
          const response = await axios.post(
            "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/plant/getplant",
            { 
              username: userEmail
            }
          );
          
          if (response.data) {
            // nowtem과 waterLevel 업데이트
            setNowtem(response.data.nowtem ?? nowtem);
            setWaterLevel(response.data.water ?? waterLevel);
            setPlantScore(response.data.score ?? plantScore);
          }
        }
      } catch (error) {
        console.error("식물 데이터 새로고침 중 오류 발생:", error);
      }
    };
  
    fetchPlantData();
  
    // 10초마다 반복
    const intervalId = setInterval(fetchPlantData, 10000);
  
    return () => clearInterval(intervalId);
  }, [userEmail]);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/getuser",
            { 
              token
            }
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

  const updatePlantData = async (updatedData) => {
    try {
      if (!userEmail) {
        console.error("사용자 이메일이 없습니다.");
        return;
      }
  
      const state = calculateStatus();
  
      const response = await axios.post(
        "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/plant/update/plant",
        {
          username: userEmail,
          ...updatedData,
          state,
        }
      );
  
      if (response.status === 200) {
        console.log("식물 데이터 업데이트 성공:", { ...updatedData, state });
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
  
  useEffect(() => {
    if (plantData.light) {
      const lightIndex = sunlightLevels.indexOf(plantData.light) + 1;
      setLight(lightIndex || 3);
    }
  }, [plantData]);


  useEffect(() => {
    if (plantData.plantName) {
      setPlantName(plantData.plantName);
      setTemperature(plantData.temperature ?? 25);
      setHumidity(plantData.humidity ?? 50);
      const lightIndex = sunlightLevels.indexOf(plantData.light);
      setLight(lightIndex >= 0 ? lightIndex + 1 : 3); // 유효한 값이면 숫자로 변환, 기본값 3 ("보통")
      
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
    const status = calculateStatus();
    updatePlantData({ temperature: temperature, status });
  };
  

  // 습도 변경 핸들러
  const handleHumidityChange = (e) => {
    const newHumidity = e.target.value;
    setHumidity(newHumidity);
  };

  const handleHumidityChangeEnd = () => {
    const status = calculateStatus();
    updatePlantData({ humidity: humidity, status });
  };
  
  const handleLightChange = (e) => {
    const newLight = Number(e.target.value);
    setLight(newLight);
  };
  
  const handleLightChangeEnd = () => {
    const lightLabels = ["매우 약함", "약함", "보통", "강함", "매우 강함"];
    const lightValue = lightLabels[light - 1];
    const status = calculateStatus();
    updatePlantData({ light: lightValue, status });
  };
  
  const handleWatering = () => {
    if (waterLevel > 10) {
      Swal.fire({
        title: "❌ 물을 줄 수 없습니다!",
        text: "현재 물 양이 너무 많습니다. 물이 10% 이하일 때만 줄 수 있습니다.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#ff6b6b",
        customClass: {
          popup: "popup-alert",
        },
      });
      return;
    }
  
    const newWaterLevel = Math.min(waterLevel + 100, 100);
    setWaterLevel(newWaterLevel);
    const status = calculateStatus(); // 상태 계산
    updatePlantData({ water: newWaterLevel, status });
  
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

  return (
    <Container>
      <Frame>
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
                <ambientLight intensity={2.0} />
                <directionalLight position={[2, 5, 2]} intensity={1.2} />
                <OrbitControls
                  enableZoom={false}
                  minDistance={1}
                  maxDistance={65}
                  maxPolarAngle={Math.PI / 2}
                  rotateSpeed={0.7}
                  target={[0, 0, 0]}
                />
                {plantName && (
                  <PlantModel 
                    plantName={plantName} 
                    score={plantScore} 
                  />
                )}                
              </Canvas>
            </MainFrame>
          </MainContainer>

          <RightFrame>
          <ScoreFrame>
    <ScoreContainer>
      <ScoreText>현재 스코어: {plantScore}</ScoreText>
      <ScoreInputContainer>
        <ScoreInput
          type="number"
          value={scoreInput}
          onChange={handleScoreInputChange}
          placeholder="추가할 점수"
        />
        <ScoreButton onClick={handleScoreSubmit}>
          점수 추가
        </ScoreButton>
      </ScoreInputContainer>
      <ModelText>로드된 모델 번호: {currentModelNumber}번 모델</ModelText>
    </ScoreContainer>
  </ScoreFrame>
            <InfoFrame>
              <InfoBox
                nowtem={nowtem}
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
              </div>
              <div>
                <MultiSlider
                  isVisible={showSlider === "humidity"}
                  type="humidity"
                  value={humidity}
                  onChange={handleHumidityChange}
                  onChangeEnd={handleHumidityChangeEnd}
                />
              </div>
              <div>
                <MultiSlider
                  isVisible={showSlider === "light"}
                  type="light"
                  value={light}
                  onChange={handleLightChange}
                  onChangeEnd={handleLightChangeEnd}
                />
              </div>
            </ControlFrame>

            <StateFrame>
            <StatusGauge status={calculateStatus()} />
            </StateFrame>

            <RightBottom>
              <WaterButtonContainer>
                <WaterButton onClick={handleWatering}>
                  <GiWateringCan style={{ fontSize: "22px" }} /> 물 주기
                </WaterButton>
                
                <WaterBarContainer>
                  <WaterBar level={waterLevel} />
                </WaterBarContainer>
                <WaterLevelText>{`현재 물양: ${waterLevel}%`}</WaterLevelText>
              </WaterButtonContainer>
            </RightBottom>
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