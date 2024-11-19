import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"; // 닫기 아이콘 추가
import { IoLeaf } from "react-icons/io5";

const Container = styled.div`
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: left;
  cursor: pointer;
`;
const ImageBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden; /* 이미지가 넘치지 않도록 설정 */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 컨테이너에 맞게 조정되도록 설정 */
  }
`;
const Label = styled.h3`
  font-size: 19px;
  color: #2e7d32;
  font-weight: bold;
  margin: 0;
`;

const PlantsButton = ({ plants, onClick, className }) => {
  return (
    <Container onClick={onClick} className={className}>
      <ImageBox>
        <img src={`images/plants/${plants}.jpg`} alt={plants} />
      </ImageBox>
      <Label>
        <IoLeaf />
        {plants}
      </Label>
    </Container>
  );
};

export default PlantsButton;