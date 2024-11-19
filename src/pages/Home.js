import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Main from "../components/Main";
import ItemFrame1 from "../components/ItemFrame1";
import ItemFrame2 from "../components/ItemFrame2";
import ItemFrame3 from "../components/ItemFrame3";
import ItemFrame4 from "../components/ItemFrame4";
import ItemFrame5 from "../components/ItemFrame5";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Frame1 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame2 = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame3 = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame4 = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame5 = styled.div`
  width: 100%;
  height: 1000px;
`;

// 애니메이션을 적용할 styled-component
const AnimatedItemFrame5 = styled(ItemFrame5)`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeIn} 0.5s forwards;
    `}
`;

const HomeContent = () => {
  const frame5Ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (frame5Ref.current) {
      observer.observe(frame5Ref.current);
    }

    return () => {
      if (frame5Ref.current) {
        observer.unobserve(frame5Ref.current);
      }
    };
  }, []);

  return (
    <Container>
      <Frame1><ItemFrame1 /></Frame1>
      <Frame2><ItemFrame2 /></Frame2>
      <Frame3><ItemFrame3 /></Frame3>
      <Frame4><ItemFrame4 /></Frame4>
      <Frame5 ref={frame5Ref}>
        <AnimatedItemFrame5 isVisible={isVisible} />
      </Frame5>
    </Container>
  );
};

const Home = () => {
  return <Main isHome={true} props={<HomeContent />} />;
};

export default Home;
