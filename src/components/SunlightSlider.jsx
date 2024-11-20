import React from "react";
import styled from "styled-components";

const SunlightContainer = styled.div`
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
  background: linear-gradient(to bottom, #fddb92, #d1a24c); /* 햇빛 색상 */
  margin-bottom: 10px;
`;

const SunlightSliderInput = styled.input`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) rotate(-90deg);
  width: 180px;
  height: 10px;
  cursor: pointer;
`;

const SunlightLabel = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #d1932c;
`;


const SunlightSlider = ({ isVisible, value, onChange }) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SunlightLabel>햇빛 단계: {value}</SunlightLabel>
        <SunlightContainer isVisible={isVisible}>
          <SunlightSliderInput
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={onChange}
          />
        </SunlightContainer>
      </div>
    );
  };
  

export default SunlightSlider;