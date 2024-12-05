import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"; // 닫기 아이콘 추가
import { GiWateringCan } from "react-icons/gi"; // 물뿌리개 아이콘
import { LuSun } from "react-icons/lu"; // 태양 아이콘
import { IoWaterOutline } from "react-icons/io5"; // 습도 물방울 아이콘
import { CiTempHigh } from "react-icons/ci"; // 온도 아이콘
import plantsData from "../data/plantsData.js"; // plantsData.js 파일을 불러옴

const ModalContainer = styled.div`
  position: fixed;
  top: 180px;
  right: -20px; /* 우측에 위치하도록 설정 */
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  /*background-color: #f7f7f4;*/
  background-color: white;

  width: 100vw; /* 화면의 100% 크기로 설정 */
  max-width: 500px; /* 최대 1000px 크기로 설정 */
  height: ${({ scrollOffset }) =>
    `calc(100% - 50px - ${scrollOffset}px)`}; /* 스크롤 위치에 따른 높이 설정 */

  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(100%)"}; /* 우측에서 슬라이드 인 */
  transition: transform 0.3s ease;
  z-index: 1000;
  pointer-events: ${({ isOpen }) =>
    isOpen ? "auto" : "none"}; /* 모달이 열릴 때만 클릭 가능하게 설정 */
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Frame = styled.div`
  width: 430px;
  height: 100%;
  flex-direction: column;
`;

const DivBox = styled.div`
  width: 100%;
  align-items: left;
  display: flex;
  justify-content: left;
  position: relative;
  flex-direction: column;
`;

const OrangeLabel = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
  text-align: left;
  color: #ff6c2f;
`;

const TitleLabel = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 80%;
  font-size: 64px;
  font-weight: bold;
  text-align: left;
  line-height: 1.2;
`;

const GridContainer1 = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 허용 */
  gap: 10px;
`;

const GridBox1 = styled.div`
  background-color: #f6f6f3;
  border: solid 1px #e7e7e6;
  border-radius: 25px; /* 둥근 캡슐 모양 */
  padding: 10px 10px;
  text-align: center;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */

  font-size: 12px;
  font-weight: bold;
  color: gray; /* 폰트 색 설정 */
`;

const TextBox = styled.h4`
    padding-bottom: 3px;
`;

const GridContainer2 = styled.div`
  margin-top: 45px;
  margin-bottom: 30px;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr); /* 2열 그리드 */
  grid-template-rows: repeat(2, auto); /* 2행 그리드 */
  position: relative; /* 가상 요소의 위치를 기준으로 설정 */

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: gray; /* 선 색상 */
  }

  &::before {
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-50%);
  }

  &::after {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
  }
`;
const IconDiv = styled.div`
  font-size: 30px;
`;

const MainPlantsModal = ({ onClose, isOpen, plantName }) => {
  const [scrollOffset, setScrollOffset] = useState(64);
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const footerHeight = 150;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollTop = window.scrollY;
      const scrollPosition = Math.min(currentScrollTop, maxScrollTop);
      const offset = Math.max(
        0,
        footerHeight - (maxScrollTop - scrollPosition)
      );
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // plantName 값이 변경될 때마다 실행되는 로직
    const plantA = plantsData.find((plant) => plant.name === plantName);
    setPlant(plantA || null); // plant가 없으면 null로 설정
  }, [plantName]);

  const handleModalContainerClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClick={handleModalContainerClick}
      scrollOffset={scrollOffset}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {plant ? (
          <>
            <Frame>              
              <DivBox>
                <OrangeLabel>{plant.scientificName || "정보 없음"}</OrangeLabel>
              </DivBox>
              <DivBox>
                <TitleLabel>{plant.name || "정보 없음"}</TitleLabel>
              </DivBox>
              <DivBox>
                <GridContainer1>
                  {plant.attributes?.map((attribute) => (
                    <GridBox1 key={attribute}>{attribute}</GridBox1>
                  )) || <p>속성 정보가 없습니다.</p>}
                </GridContainer1>
              </DivBox>
              <DivBox>
                <TextBox>{plant.description || "설명 없음"}</TextBox>
              </DivBox>
              <DivBox>
                <GridContainer2>
                  <DivBox>
                    <IconDiv>
                      <GiWateringCan />
                    </IconDiv>
                    <TextBox>
                      {plant.waterFrequency?.[0] || "정보 없음"}
                    </TextBox>
                    <h5 style={{ paddingBottom: "20px" }}>
                      {plant.waterFrequency?.[1] || "정보 없음"}
                    </h5>
                  </DivBox>
                  <DivBox>
                    <IconDiv>
                      <LuSun />
                    </IconDiv>
                    <TextBox>{plant.sunlight?.[0] || "정보 없음"}</TextBox>
                    <h5>{plant.sunlight?.[1] || "정보 없음"}</h5>
                  </DivBox>
                  <DivBox>
                    <IconDiv>
                      <IoWaterOutline />
                    </IconDiv>
                    <TextBox>{plant.humidity?.[0] || "정보 없음"}</TextBox>
                    <h5>{plant.humidity?.[1] || "정보 없음"}</h5>
                  </DivBox>
                  <DivBox>
                    <IconDiv>
                      <CiTempHigh />
                    </IconDiv>
                    <TextBox>잘 자라는 온도</TextBox>
                    <h5>
                      {plant.temperature?.[0] || "정보 없음"}~
                      {plant.temperature?.[1] || "정보 없음"}℃의 온도에서 잘
                      자라요
                    </h5>
                  </DivBox>
                </GridContainer2>
              </DivBox>
            </Frame>
          </>
        ) : (
          <p>식물 정보가 없습니다.</p>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default MainPlantsModal;