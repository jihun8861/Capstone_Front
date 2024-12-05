import React from "react";
import styled from "styled-components";
import { FaThermometerHalf, FaTint, FaSun } from "react-icons/fa";
import { sunlightLevels } from "../constants";

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const TitleFrame = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
`;

const MainFrame = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  flex-grow: 1;
  padding: 10px 0;
`;

const MainBox = styled.div`
  width: 33.3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconFrame = styled.div`
  font-size: 30px;
  color: ${(props) => props.color};
  margin-bottom: 5px;
`;

const Gauge = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => props.color} ${(props) => props.percentage}%,
    #e0e0e0 ${(props) => props.percentage}% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;
`;

const Label = styled.div`
  margin-top: 5px;
  color: #666;
  font-size: 14px;
`;

const Value = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const InfoBox = ({ nowtem, humidity, light }) => {
  const lightIndex = typeof light === 'string'
    ? sunlightLevels.indexOf(light) + 1
    : light;

  const lightLevel = sunlightLevels[lightIndex - 1] || "정보 없음";

  return (
    <Container>
      <TitleFrame>환경정보</TitleFrame>
      <MainFrame>
        <MainBox>
          <IconFrame color="#e57373">
            <FaThermometerHalf />
          </IconFrame>
          <Gauge color="#e57373" percentage={(nowtem / 50) * 100}>
            {nowtem ?? "N/A"}℃ 
          </Gauge>
          <Value>{nowtem ?? "N/A"} ℃</Value>
        </MainBox>

        <MainBox>
          <IconFrame color="#4fc3f7">
            <FaTint />
          </IconFrame>
          <Gauge color="#4fc3f7" percentage={humidity || 0}>
            {humidity ?? "N/A"}%
          </Gauge>
          <Value>{humidity ?? "N/A"} %</Value>
        </MainBox>

        <MainBox>
          <IconFrame color="#ffd54f">
            <FaSun />
          </IconFrame>
          <Gauge
            color="#ffd54f"
            percentage={((lightIndex || 1) / 5) * 100}
          >
            {lightLevel}
          </Gauge>
          <Value>{lightLevel}</Value>
        </MainBox>
      </MainFrame>
    </Container>
  );
};


export default InfoBox;