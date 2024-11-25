import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import PlantsModal from "../components/PlantsModal.jsx";
import PlantsButton from "../components/PlantsButton.jsx";
import { FaSeedling } from "react-icons/fa"; 
import { RiPlantFill } from "react-icons/ri";
import plantsData from "../data/plantsData.js"; // plantsData.js 파일을 불러옴


const Container = styled.div`
    width: 100%;
    height: 1000px;
    display: flex;
    justify-content: center;
    
    background:#FBFBF8;
    @media (max-width: 1300px) {
        height:100%;
    }
`
const Frame = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const Frame2nd = styled.div`
    width: 100%;
    height: 100%;
      /* border: solid 1px; 주석 처리 */

    display: flex;
    align-items: center;
    flex-direction: column;

    /* 1000px 이상일 때 */
    width: 1200px;    

    /* 1000px 이하일 때 */
    @media (max-width: 1300px) {
        width: 700px; 
    }

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
const GridContainer = styled.div`
    width: 100%;
    display: grid;
    gap: 10px;

    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    @media (max-width: 1300px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;
const DivBox = styled.div`
    width: 100%;
      /* border: solid 1px; 주석 처리 */

`;
const DataH3 = styled.h3`
    width:100%;
    font-size: 24px;
    font-weight: bold;
    margin-bottom:20px;
`;
const PlantTitle = styled.h3`
    width:100%;
    font-size: 45px;
    color: #Black;
    font-weight:bold ;
    margin:50px;

`;
 
const PlantsContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const [plantName, setPlantName] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleContainerClick = (e) => {
        if (e.target.closest('.modal') || e.target.closest('.plants-button')) return;
        closeModal();
    };

    const handleGridClick = (plantName) => {
        setPlantName(plantName);
        openModal();
      };
      
    return (
        <Container onClick={handleContainerClick}>          
        <Frame>
            <HeaderBar>
                <HeaderText>
                    <FaSeedling />
                    나만의 가상 정원
                </HeaderText>
            </HeaderBar>  
            <Frame2nd>       
                <DivBox>
                    <PlantTitle>어떤 종류의<br/>식물<RiPlantFill />을 찾고있나요?</PlantTitle>
                </DivBox>
                <DivBox>
                    <DataH3>식물사전 {plantsData.length}종</DataH3>
                </DivBox>
                <GridContainer>
                {plantsData.map((plant, index) => (
                        <PlantsButton 
                        key={index} 
                        plants={plant.name}
                        onClick={() => handleGridClick(plant.name)} // 함수 참조를 전달
                        className="plants-button"
                        />
                    ))}

                </GridContainer>          
                <PlantsModal onClose={closeModal} isOpen={isModalOpen} plantName={plantName}   />
            </Frame2nd> 
          </Frame>
        </Container>
    )
}

const Plants = () => {
    return <Main props={<PlantsContent />} />;
};

export default Plants;