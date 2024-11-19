import React from "react";
import styled from "styled-components";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"; // 닫기 아이콘 추가

const ModalContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  width: 300px;
  height: 90%;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")}; /* 모달이 열릴 때만 클릭 가능하게 설정 */
`;

const ModalContent = styled.div`
  width: 100%;
  height: 200px;
  border: solid 1px;
`;

const CloseButton = styled(MdOutlineKeyboardDoubleArrowLeft)`
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 42px;
  cursor: pointer;
  transform: translate(-50%, -50%); /* 중앙 정렬을 위해 이동 */
`;


const Modal = ({ onClose, isOpen }) => {
  // 모달 외부를 클릭했을 때 모달을 닫는 함수
  const handleModalContainerClick = (e) => {
    e.stopPropagation(); // 모달 콘텐츠 클릭 시 이벤트 버블링을 막음
    onClose(); // 모달 닫기
  };

  return (
    <ModalContainer isOpen={isOpen} onClick={handleModalContainerClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* 모달 내용 클릭 시 닫히지 않도록 설정 */}
        <CloseButton onClick={onClose} />
        <h2>모달 창</h2>
        <p>여기에 내용을 추가하세요.</p>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
