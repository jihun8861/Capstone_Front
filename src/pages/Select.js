import React from "react";
import styled from "styled-components";
import Main from "../components/Main";
import { FaSeedling } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PlantsFrame = styled.div`
  width: 85%;
  height: auto;
  padding: 30px;
  margin-bottom: 30px;
  border: solid 2px #a5d6a7;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  background-color: #f9fbe7;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const ImageFrame = styled.div`
  width: 20%;
  height: 300px;
  border-radius: 15px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.image})`};
  margin-right: 25px;
`;

const Content = styled.div`
  width: 74%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PlantTitle = styled.h3`
  font-size: 28px;
  color: #2e7d32;
  font-weight: bold;
  margin: 0;
`;

const PlantScientificName = styled.h4`
  font-size: 18px;
  color: #388e3c;
  font-style: italic;
  margin: 8px 0 18px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #c8e6c9;
  color: #2e7d32;
  font-size: 15px;
`;

const PlantDescription = styled.p`
  color: #455a64;
  font-size: 17px;
  line-height: 1.6;
`;

const HeaderBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: #63b26d;
  margin: 120px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const HeaderText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 아이콘과 텍스트 사이 간격 */
`;

  const SelectContent = () => {
    const navigate = useNavigate();
    const [selectedPlant, setSelectedPlant] = useState(null);
  
    // Function to handle plant selection
    const handlePlantSelect = (plantName) => {
      setSelectedPlant(plantName);
      localStorage.setItem("selectedPlant", plantName);
      navigate("/growing");
    };

  return (
    <Container>
      <Frame>
        <HeaderBar>
          <HeaderText>
            <FaSeedling />
            나만의 가상 정원
          </HeaderText>
        </HeaderBar>
        
        <PlantsFrame onClick={() => handlePlantSelect("알로카시아 프라이덱")}>
          <ImageFrame image="/images/image1.png" />
          <Content>
            <PlantTitle>알로카시아 프라이덱</PlantTitle>
            <PlantScientificName>
              Alocasia micholitziana 'Frydek'
            </PlantScientificName>
            <TagContainer>
              <Tag>잎을 감상하는</Tag>
              <Tag>빛이 적어도 되는</Tag>
              <Tag>둥근모양</Tag>
              <Tag>하트모양</Tag>
              <Tag>길쭉한</Tag>
              <Tag>무늬가 있는</Tag>
            </TagContainer>
            <PlantDescription>
              알로카시아 프라이덱은 'Green Velvet Alocasia'라고도 불리며,
              아시아의 아열대 지역과 호주 동부에서 온 식물입니다. 하트모양의
              잎은 보드라운 벨벳 느낌을 주고, 흰색 잎맥이 돋보여 실내에서
              포인트가 됩니다. 이 식물은 밝은 간접광과 따뜻한 온도, 그리고
              촉촉한 습도를 좋아합니다.
            </PlantDescription>
          </Content>
        </PlantsFrame>

        <PlantsFrame onClick={() => handlePlantSelect("산세베리아 슈퍼바")}>
          <ImageFrame image="/images/image2.png" />
          <Content>
            <PlantTitle>산세베리아 슈퍼바</PlantTitle>
            <PlantScientificName>Sansevieria Trifasciata ‘Futura Superba’</PlantScientificName>
            <TagContainer>
              <Tag>공기 정화</Tag>
              <Tag>관리 쉬움</Tag>
              <Tag>튼튼한 잎</Tag>
              <Tag>낮은 물 요구량</Tag>
              <Tag>다육식물</Tag>
            </TagContainer>
            <PlantDescription>
              산세베리아 슈퍼바는 잎 테두리의 노란 무늬가 예쁜 식물이에요.
              산세베리아는 밤에 산소를 내어주고 이산화탄소를 흡수해 밤에
              공기정화 능력이 아주 뛰어난 식물이랍니다. 산세베리아는 빛이 적은
              곳에서도 잘 자라고 물을 자주 주지 않아도 되어 초보가드너도 어려움
              없이 키울 수 있는 식물이에요. 식물에게 독성이 있으니 반려동물과
              어린아이가 있는 경우에는 섭취하지 않도록 주의해 주세요.
            </PlantDescription>
          </Content>
        </PlantsFrame>
      </Frame>
    </Container>
  );
};

const Select = () => {
  return <Main isHome={false} props={<SelectContent />} />;
};

export default Select;
