import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainPlantsModal from "./MainPlantsModal";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 25%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 2;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

const Modal = ({ onClose, isOpen }) => {
  const [plantName, setPlantName] = useState("");
  const [isPlantsModalOpen, setIsPlantsModalOpen] = useState(true);

  useEffect(() => {
    const selectedPlant = localStorage.getItem("selectedPlant");
    setPlantName(selectedPlant || "");
  }, []);

  const openPlantsModal = () => setIsPlantsModalOpen(true);

  useEffect(() => {
    if (isOpen) {
      openPlantsModal(); // 모달이 열릴 때 식물 정보 모달 자동 열림
      document.body.style.overflow = "hidden"; // 스크롤 잠금
    } else {
      document.body.style.overflow = "auto"; // 스크롤 복구
    }

    // 컴포넌트가 언마운트될 때 초기화
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ModalContainer isOpen={isOpen}>
        {isPlantsModalOpen && (
          <MainPlantsModal
            isOpen={isPlantsModalOpen}
            plantName={plantName}
          />
        )}
    </ModalContainer>
  );
};

export default Modal;
