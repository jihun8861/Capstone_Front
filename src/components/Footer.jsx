import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #63b26d;
  clip-path: ellipse(75% 100% at 50% 100%);
`;

const Frame = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextFrame = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 16px;
  height: 80px;
  justify-content: flex-end;
  padding: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Frame>
        <TextFrame>Copyright ⓒ 2024. Capstone Design -- Team VirtuaLeaf</TextFrame>
      </Frame>
    </Container>
  );
};

export default Footer;
