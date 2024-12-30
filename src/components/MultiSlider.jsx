import React from "react";
import styled from "styled-components";
import { sunlightLevels } from "../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px; /* 슬라이더 바 간의 간격 증가 */
`;

const Slider = styled.input`
  width: 400px;
  height: 3px; /* 바의 높이 */
  cursor: pointer;
  background: ${({ value, min, max }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #007bff ${percentage}%, #e0e0e0 ${percentage}%)`;
  }};
  border-radius: 5px;
  appearance: none;
  position: relative;

  /* 슬라이더 바 스타일 */
  &::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 5px;
  }

  /* 슬라이더 thumb 스타일 */
  &::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    background: #007bff; /* 네모의 배경 색상 */
    cursor: pointer;
    appearance: none;
    margin-top: -5px; /* 중앙 정렬 */
    border: 2px solid #ffffff; /* thumb 테두리 */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* shadow 효과 */
  }

  /* 마우스 오버 시 thumb 색상 변화 */
  &:hover::-webkit-slider-thumb {
    background: #0056b3; /* 마우스 오버 시 색상 */
  }
`;

const SliderLabel = styled.label`
  display: flex;
  justify-content: space-between;
  width: 400px;
  font-size: 16px;
  font-weight: bold;
`;

const MultiSlider = ({ type, value, onChange, onChangeEnd }) => {

  const getLabel = () => {
    if (type === "temperature") {
      return `온도 ${value}°C`;
    } else if (type === "humidity") {
      return `습도 ${value}%`;
    } else if (type === "light") {
      const lightIndex = typeof value === "string" 
        ? sunlightLevels.indexOf(value) + 1 
        : value;
      return `햇빛 ${sunlightLevels[lightIndex - 1] || "정보 없음"}`;
    }
    return "";
  };
  
  const getSliderProps = () => {
    if (type === "temperature") {
      return { min: 0, max: 50 };
    } else if (type === "humidity") {
      return { min: 0, max: 100 };
    } else if (type === "light") {
      return { min: 1, max: 5 };
    }
    return {};
  };
  
  const handleMouseDown = () => {
    console.log(`${type} 슬라이더 조작 시작`);
  };

  const handleMouseUp = (e) => {
    console.log(`${type} 슬라이더 조작 완료`);
    if (onChangeEnd) {
      onChangeEnd(e);
    }
  };

  return (
    <Container>
      <SliderWrapper>
        <SliderLabel type={type}>
          <span>{getLabel().split(" ")[0]}</span>
          <span>{getLabel().split(" ")[1]}</span>
        </SliderLabel>
        <Slider
          type="range"
          value={value}
          onChange={onChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          {...getSliderProps()}
        />
      </SliderWrapper>
    </Container>
  );
};

export default MultiSlider;
