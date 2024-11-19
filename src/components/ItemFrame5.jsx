import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import playVideo from "../assets/play.mp4";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoFrame = styled.div`
  width: 100%;
  height: 500px;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비디오가 프레임에 꽉 차도록 설정 */
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TextFrame = styled.div`
  width: 85%;
  height: 400px;
  display: flex;
  flex-direction: row;
  margin-top: 70px;
  flex-wrap: wrap;
`;

const TextLeft = styled.div`
  width: 50%;
  height: 100%;
  font-size: 32px;
  padding-right: 160px;
`;

const TextRight = styled.div`
  width: 50%;
  height: 100%;
  font-size: 22px;
  white-space: normal;
  line-height: 1.6; /* 줄 간격을 조정 */

  span {
    font-weight: bold;
  }
`;

// 애니메이션이 적용된 텍스트 스타일
const AnimatedText = styled.h1`
  opacity: 0;
  animation: ${fadeIn} 0.7s forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const AnimatedParagraph = styled.p`
  opacity: 0;
  animation: ${fadeIn} 0.7s forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const ItemFrame5 = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true); // 요소가 뷰포트에 들어오면 애니메이션을 트리거
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
  }, []);

  return (
    <Container>
      <VideoFrame>
        <Video autoPlay muted loop>
          <source src={playVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
      </VideoFrame>
      <TextFrame ref={textRef}>
        <TextLeft>
          {isVisible && (
            <AnimatedText delay="1s">
              가상의 공간에서 우리의 시간과 마음을 채우다
            </AnimatedText>
          )}
        </TextLeft>
        <TextRight>
          {isVisible && (
            <AnimatedParagraph delay="1.5s">
              Virtual Leaf의 '<span>Virtual</span>'은 현실의 제약을 넘어 새로운 공간에서의
              성장을 의미합니다. 이 공간에서는 사용자가 직접 가꾸는 가상 식물을
              통해 자신의 성장과 변화를 시각적으로 체험할 수 있습니다. ‘<span>Leaf</span>’는
              생명력과 성장을 상징하는 동시에, 사용자가 선택한 취미나
              라이프스타일을 대변하는 작은 조각이기도 합니다.
              <br /> <br />
              {isVisible && (
                <AnimatedParagraph delay="2s">
                  결국 'Virtual Leaf'는 물리적인 한계를 뛰어넘어, 사용자들이
                  스스로의 발전을 돌보고 가꾸며, 가상 세계에서 현실과 닮은
                  성취감을 느끼는 공간입니다. 이곳에서 식물과 함께 자라나는 것은
                  단순한 취미를 넘어서, 지속적인 성장과 변화를 추구하는 모든
                  사용자들입니다.
                </AnimatedParagraph>
              )}
            </AnimatedParagraph>
          )}
        </TextRight>
      </TextFrame>
    </Container>
  );
};

export default ItemFrame5;
