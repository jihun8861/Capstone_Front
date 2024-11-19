import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import PlantsModal from "./PlantsModal";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 450px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 2;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  overflow-y: hidden; /* 세로 스크롤 추가 */
  overflow-x: hidden; /* 세로 스크롤 추가 */
`;

const CloseButton = styled(MdOutlineKeyboardDoubleArrowLeft)`
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 42px;
  cursor: pointer;
  transform: translate(-50%, -50%);
  z-index: 11120;
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
