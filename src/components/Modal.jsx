import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import PlantsModal from "./PlantsModal";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 480px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 2;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  overflow-y: hidden;
  overflow-x: hidden;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 14%;
  right: 0;
  font-size: 32px;
  cursor: pointer;
  z-index: 1000;
`;

const Modal = ({ onClose, isOpen }) => {
  const [plantName, setPlantName] = useState("");
  const [isPlantsModalOpen, setIsPlantsModalOpen] = useState(false);

  useEffect(() => {
    const selectedPlant = localStorage.getItem("selectedPlant");
    setPlantName(selectedPlant || "");
  }, []);

  const openPlantsModal = () => setIsPlantsModalOpen(true);
  const closePlantsModal = () => setIsPlantsModalOpen(false);

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
          <PlantsModal
            isOpen={isPlantsModalOpen}
            onClose={closePlantsModal}
            plantName={plantName}
          />
        )}
      <CloseButton onClick={onClose} />
    </ModalContainer>
  );
};

export default Modal;
