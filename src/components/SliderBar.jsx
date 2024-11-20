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
  position: relative;
  background: ${(props) =>
    props.type === "temperature"
      ? "linear-gradient(to bottom, #ff6f6f, #ff4c4c)" // 온도계 색상
      : "linear-gradient(to bottom, #4ca1ff, #63baff)"}; // 습도계 색상
  margin-bottom: 10px;
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
    props.type === "temperature" ? "#ff4c4c" : "#4ca1ff"}; /* 온도와 습도에 맞는 색상 */
`;

const ThermometerSlider = ({ isVisible, type, value, onChange }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SliderLabel type={type}>
        {type === "temperature" ? `온도: ${value}°C` : `습도: ${value}%`}
      </SliderLabel>
      <Container isVisible={isVisible} type={type}>
        <Slider
          type="range"
          min={type === "temperature" ? "0" : "0"}
          max={type === "temperature" ? "50" : "100"}
          value={value}
          onChange={onChange}
        />
      </Container>
    </div>
  );
};

export default ThermometerSlider;
