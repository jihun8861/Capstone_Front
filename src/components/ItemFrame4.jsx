import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

// 상단 텍스트 애니메이션 정의 (그냥 나타나는 느낌 유지)
const slowDrop = keyframes`
  0% { opacity: 0; transform: translateY(-100px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// 아래 3개 프레임에 적용할 애니메이션 정의 (왼쪽에서 위에서 차례로 떨어지는 느낌)
const slideAndDrop = keyframes`
  0% { opacity: 0; transform: translate(-100px, -50px); }
  100% { opacity: 1; transform: translate(0, 0); }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f7f5;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const Frame = styled.div`
  width: 85%;
  height: 100%;
`;

const TitleFrame = styled.div`
  width: 30%;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const TitleMiniText = styled.div`
  font-size: 28px;
  font-weight: bold;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${slowDrop} 2s ease-in-out forwards;
  animation-delay: 0.2s;
`;

const TitleText = styled.div`
  font-size: 82px;
  font-weight: bold;
  padding-top: 30px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${slowDrop} 2s ease-in-out forwards;
  animation-delay: 0.5s;
`;

const EssenceFrame = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 150px;
  display: flex;
  justify-content: space-between;
`;

// 각 프레임에 적용될 애니메이션 스타일
const EssenceList = styled.li`
  width: 30%;
  height: 100%;
  border-top: solid 1.5px;
  border-bottom: solid 1.5px;
  list-style-type: none;
  display: flex;
  align-items: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${slideAndDrop} 1.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const EssenceIn = styled.div`
  width: auto;
  height: 60%;
  display: flex;
  flex-direction: column;
`;

const EssenceTitle = styled.div`
  display: flex;
  position: relative;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${slideAndDrop} 1.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const EssenceText = styled.h2`
  padding-top: 50px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${slideAndDrop} 1.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const EssenceContent = styled.p`
  padding-top: 18px;
  font-size: 20px;
  color: #222529;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${slideAndDrop} 1.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const EssenceItem = ({ title, minitext, content, content2, delay, isVisible }) => {
  return (
    <EssenceList delay={delay} isVisible={isVisible}>
      <EssenceIn>
        <EssenceTitle isVisible={isVisible} delay={delay}>
          <h1
            style={{
              fontSize: "52px",
              position: "relative",
              display: "inline-block",
            }}
          >
            {title}
            <h6
              style={{
                position: "absolute",
                top: "0px",
                right: "-15px",
                fontSize: "24px",
                color: "#63b26d",
              }}
            >
              {minitext}
            </h6>
          </h1>
        </EssenceTitle>
        <EssenceText isVisible={isVisible} delay={`calc(${delay} + 0.2s)`}>
          {content}
        </EssenceText>
        <EssenceContent
          isVisible={isVisible}
          delay={`calc(${delay} + 0.4s)`}
          dangerouslySetInnerHTML={{ __html: content2 }}
        />
      </EssenceIn>
    </EssenceList>
  );
};

const ItemFrame4 = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerCallback = (entries, observer) => {
      const [entry] = entries;

      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        observer.unobserve(entry.target);
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
    <Container ref={textRef} isVisible={isVisible}>
      <Frame>
        <TitleFrame>
          <TitleMiniText isVisible={isVisible}>our spirit</TitleMiniText>
          <TitleText isVisible={isVisible}>our essence</TitleText>
        </TitleFrame>
        <EssenceFrame>
          <EssenceItem
            title="쉽게"
            minitext="1"
            content="easy"
            content2="식물을 잘 모르는 사람도 <br /> 얼마든지 쉽게"
            delay="0.2s"
            isVisible={isVisible}
          />
          <EssenceItem
            title="즐거운"
            minitext="2"
            content="enjoy"
            content2="식물과 함께하는 희로애락의 <br /> 모든 과정을 즐길 수 있는"
            delay="0.7s"
            isVisible={isVisible}
          />
          <EssenceItem
            title="함께하는"
            minitext="3"
            content="together"
            content2="서로의 문제를 해결하고 <br /> 공감하면서 함께 성장하는"
            delay="1.2s"
            isVisible={isVisible}
          />
        </EssenceFrame>
      </Frame>
    </Container>
  );
};

export default ItemFrame4;
