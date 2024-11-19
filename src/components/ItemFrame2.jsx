import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

// 페이드 인과 슬라이드 업 애니메이션 정의
const fadeInSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);  // 아래에서 시작
  }
  100% {
    opacity: 1;
    transform: translateY(0);  // 원래 위치로 이동
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #f7f7f5;
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 70px 70px;
  position: relative;
`;

const ImageFrame = styled.div`
  width: 800px;
  height: 700px;
`;

const TextFrame = styled.div`
  width: 500px;
  height: 500px;
  margin-left: 200px;
`;

// 공통 애니메이션 스타일 정의
const AnimatedComponent = styled.div`
  opacity: 0;
  transform: translateY(30px); // 기본적으로 살짝 아래에서 시작
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeInSlideUp} 1s forwards;
    `}
`;

const TitleText = styled(AnimatedComponent)`
  font-size: 70px;
  font-weight: bold;
  padding-bottom: 80px;
  animation-delay: 0.2s; // 약간의 지연시간 추가
`;

const MainTitleText = styled(AnimatedComponent)`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 20px;
  animation-delay: 0.4s;
`;

const MainText = styled(AnimatedComponent)`
  font-size: 23px;
  animation-delay: 0.6s;
`;

const AnimatedImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateY(30px); 
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeInSlideUp} 1.2s forwards;
    `}
`;

const ItemFrame2 = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true); // 요소가 뷰포트에 들어오면 애니메이션 트리거
      }
    };

    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [isVisible]);

  return (
    <Container ref={textRef}>
      <Frame>
        <ImageFrame>
          <AnimatedImage src="/images/plants1.jpg" isVisible={isVisible} />
        </ImageFrame>
        <TextFrame>
          <TitleText isVisible={isVisible}>our vision</TitleText>
          <MainTitleText isVisible={isVisible}>변화에 대해 도전하는 것.</MainTitleText>
          <MainText isVisible={isVisible}>
            저희가 말하는 ‘변화’는 자신만의 정서와 시간을<br />
            담을 수 있는 공간으로 변화 시켜 스스로 만족하는<br />
            라이프스타일을 만드는 것입니다.
          </MainText>
        </TextFrame>

        {/*<LeafFrame>
          <LeafImage src="/images/22.png" />
        </LeafFrame>
        */}

      </Frame>
    </Container>
  );
};

export default ItemFrame2;
