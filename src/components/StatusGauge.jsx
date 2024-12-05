import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const GaugeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 10px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
`;

const GaugeBar = styled.div`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ color }) => color};
  transition: width 0.3s ease-in-out;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-top: 10px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #333;
`;

const StatusGauge = ({ status }) => {
    const statusMap = {
      "매우 나쁨": { percentage: 20, color: "red" },
      "나쁨": { percentage: 40, color: "orange" },
      "보통": { percentage: 60, color: "#F7DC6F" },
      "좋음": { percentage: 80, color: "#6fb75a" },
      "매우 좋음": { percentage: 100, color: "#588bf6" },
    };
  
    const { percentage, color } = statusMap[status] || { percentage: 0, color: "#ddd" };
  
    return (
      <Container>
        <h3>환경 상태</h3>
        <GaugeWrapper>
          <GaugeBar percentage={percentage} color={color} />
        </GaugeWrapper>
        <LabelWrapper>
          <Label>매우 나쁨</Label>
          <Label>나쁨</Label>
          <Label>보통</Label>
          <Label>좋음</Label>
          <Label>매우 좋음</Label>
        </LabelWrapper>
      </Container>
    );
  };
  

export default StatusGauge;
