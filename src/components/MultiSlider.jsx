import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 40px;
  height: 200px;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  border-radius: 40px;
  padding: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;

  background: ${(props) =>
    props.type === "temperature"
      ? "linear-gradient(to bottom, #ff6f6f, #ff4c4c)"
      : props.type === "humidity"
      ? "linear-gradient(to bottom, #4ca1ff, #63baff)"
      : "linear-gradient(to bottom, #fddb92, #d1a24c)"};
`;

const Slider = styled.input`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) rotate(-90deg);
  width: 180px;
  height: 10px;
  cursor: pointer;
`;

const SliderLabel = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${(props) =>
    props.type === "temperature"
      ? "#ff4c4c"
      : props.type === "humidity"
      ? "#4ca1ff"
      : "#d1932c"}; /* 타입에 따라 라벨 색상 변경 */
`;

const MultiSlider = ({ isVisible, type, value, onChange, onChangeEnd }) => {
  const sunlightLevels = ["매우 약함", "약함", "보통", "강함", "매우 강함"];

  const getLabel = () => {
    if (type === "temperature") {
      return `온도: ${value}°C`;
    } else if (type === "humidity") {
      return `습도: ${value}%`;
    } else if (type === "light") {
      // 숫자인 경우와 문자열인 경우 모두 처리
      const lightIndex = typeof value === 'string' 
        ? sunlightLevels.indexOf(value) + 1 
        : value;
      return `햇빛: ${sunlightLevels[lightIndex - 1] || "정보 없음"}`;
    }
    return "";
  };

  const getSliderProps = () => {
    if (type === "temperature") {
      return { min: "0", max: "50" };
    } else if (type === "humidity") {
      return { min: "0", max: "100" };
    } else if (type === "light") {
      return { min: "1", max: "5" };
    }
    return {};
  };

  const handleMouseUp = (e) => {
    if (onChangeEnd) {
      onChangeEnd(e);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SliderLabel type={type}>{getLabel()}</SliderLabel>
      <Container isVisible={isVisible} type={type}>
        <Slider
          type="range"
          value={value}
          onChange={onChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          {...getSliderProps()}
        />
      </Container>
    </div>
  );
};

export default MultiSlider;
