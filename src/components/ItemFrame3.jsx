import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  0% { opacity: 0; transform: translateX(-100px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const scaleUp = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 1s ease-in-out;
`;

const Frame = styled.div`
  width: 85%;
  height: 100%;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 1.5s ease-in-out;
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 2s ease-in-out;
  overflow: hidden;
`;

const Image = styled.img`
  background-size: 100% 100%;
  width: 50%;
  height: 800px;
  position: absolute;
  right: 0;
  top: -20px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? scaleUp : "none")} 1.5s ease-in-out;
  z-index: 1;
`;


const TitleFrame = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 70px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? slideIn : "none")} 1.5s ease-in-out;
`;

const MainImageFrame = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 2s ease-in-out;
`;

const SecondImage = styled.img`
  width: 45%;
  height: 100%;
  background-size: 100% 100%;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? scaleUp : "none")} 1.8s ease-in-out;
`;

const TitleMiniText = styled.div`
  font-size: 28px;
  font-weight: bold;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 1s ease-in-out;
`;

const TitleText = styled.div`
  font-size: 82px;
  font-weight: bold;
  width: 25%;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? slideIn : "none")} 1.2s ease-in-out;
`;

const MainText = styled.div`
  width: 25%;
  font-size: 22px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 2s ease-in-out;
`;

const ItemFrame3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true); // 애니메이션이 한 번 발생하면 더 이상 상태를 변경하지 않음
          }
        });
      },
      {
        threshold: 0.2, // 20%가 화면에 들어오면 트리거
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  return (
    <Container ref={ref} isVisible={isVisible}>
      <Frame isVisible={isVisible}>
        <TitleMiniText isVisible={isVisible}>our mission</TitleMiniText>
        <TitleFrame isVisible={isVisible}>
          <TitleText isVisible={isVisible}>what we doing</TitleText>
          <MainImageFrame isVisible={isVisible}>
            <SecondImage src="/images/sd.jpg" isVisible={isVisible} />
            <SecondImage src="/images/ee.png" isVisible={isVisible} />
          </MainImageFrame>
        </TitleFrame>
        <MainText isVisible={isVisible}>
          <p>
            Virtualeaf는 가상 공간에서 사람과 식물이 서로 연결될 수 있도록,
            사용자가 겪는 제약을 넘어 더 풍부한 경험과 성장을 제공합니다.
          </p>
        </MainText>
        <ImageFrame isVisible={isVisible}>
          <Image src="/images/qq.png" isVisible={isVisible} />
        </ImageFrame>
      </Frame>
    </Container>
  );
};

export default ItemFrame3;
