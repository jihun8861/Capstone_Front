import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const LeftFrame = styled.div`
  display: flex;
  width: 68%;
  height: 95%;
  background-color: #e9eee6;
  position: relative;
`;

const TextFrame = styled.div`
  width: 50%;
  height: 500px;
  position: absolute;
  top: 20%;
  left: 8%;
`;

const TitleText = styled.div`
  width: 100%;
  height: 20%;
  font-size: 21px;
  color: #97c9a1;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
`;

const MainText = styled.div`
  width: 100%;
  height: 45%;
  font-size: 82px;
  font-weight: bold;
  color: #3b5143;
`;

const BottomText = styled.div`
  width: 100%;
  height: 35%;
  font-size: 20px;
  padding-top: 20px;
  line-height: 1.5;
  color: #858585;
`;

const Btn = styled.button`
  width: 10%;
  height: 70px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: 6px;
  background-color: #3c5244;
  cursor: pointer;
  position: absolute;
  bottom: 15%;
  left: 8%;
`;

const RightFrame = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  background-color: #63b26d;
`;

const ImageFrame = styled.div`
  width: 30%;
  height: 650px;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-60%, -50%);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-image: url("/images/5.png");
  background-size: 100% 100%;
`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  font-size: 18px;
  color: #3b5143;
`;

const Divider = styled.div`
  width: 80px;
  height: 1px;
  background-color: black;
  margin-right: 40px;
`;

const PageNumber = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const TotalPages = styled.span`
  font-size: 16px;
  color: #97c9a1;
`;

const ItemFrame1 = () => {
  return (
    <Container>
      <LeftFrame>
        <TextFrame>
          <TitleText>
            <p>GROW A PLANTS</p>
          </TitleText>
          <MainText>
            <p>Grow Garden with Us!</p>
          </MainText>
          <BottomText>
            In today's rapidly evolving digital landscape, it is essential to
            stay adaptable and open to continuous learning. The ability to
            navigate new technologies and integrate them into existing
            frameworks has become a critical skill for success in various
            industries.
          </BottomText>
        </TextFrame>

        <Btn>START NOW</Btn>

        <PageIndicator>
          <Divider />
          <PageNumber>
            01<TotalPages>/05</TotalPages>
          </PageNumber>
        </PageIndicator>
      </LeftFrame>

      <RightFrame>
        <ImageFrame>
          <Image />
        </ImageFrame>
      </RightFrame>
    </Container>
  );
};

export default ItemFrame1;
