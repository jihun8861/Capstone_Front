import React from "react";
import styled from "styled-components";
import { FaThermometerHalf, FaTint, FaSun } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  height: 200px;
  border: solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const InfoBox = () => {
  const temperature = 23.6;
  const humidity = 65.7;
  const light = 1489;

  return (
    <Container>
      <TitleFrame>환경정보</TitleFrame>
      <MainFrame>
        <MainBox>
          <IconFrame color="#e57373">
            <FaThermometerHalf />
          </IconFrame>
          <Gauge color="#e57373" percentage={(temperature / 50) * 100}>
            {temperature}℃
          </Gauge>
          <Label>온도</Label>
          <Value>{temperature} ℃</Value>
        </MainBox>
        <MainBox>
          <IconFrame color="#4fc3f7">
            <FaTint />
          </IconFrame>
          <Gauge color="#4fc3f7" percentage={humidity}>
            {humidity}%
          </Gauge>
          <Label>습도</Label>
          <Value>{humidity} %</Value>
        </MainBox>
        <MainBox>
          <IconFrame color="#ffd54f">
            <FaSun />
          </IconFrame>
          <Gauge color="#ffd54f" percentage={(light / 2000) * 100}>
            {light} lux
          </Gauge>
          <Label>조도</Label>
          <Value>{light} lux</Value>
        </MainBox>
      </MainFrame>
    </Container>
  );
};

export default InfoBox;
