import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Container = styled.div`
  height: 100vh; /* 디스플레이의 높이만큼 */
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Frame1 = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 0%;
`;

export const Frame2 = styled.div`
  width: 100%;
  flex-direction: column;
`;

export const Frame3Top = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* flex 항목 간의 간격 */
`;

export const InputBox = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
`;

export const InputWrapper = styled.div`
  position: relative; /* 상대 위치 */
  width: 100%;
`;

export const Input = styled.input`
  margin-top:5px;
  margin-bottom: 5px;
  display: inline-block;
  position: relative;
  border-radius: 12px;
  font-size: 1rem; /* 텍스트 크기 */
  border: 2px solid gray;
  width: 100%;
  padding: 10px;
`;

export const Button = styled.button`
  margin-top:5px;
  margin-bottom: 5px;
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #63b26d;
  color: white;
  border-radius: 12px;
  border: none;
  font-size: 1.1rem; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 굵기 증가 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;
export const H2Sign = styled.h2`
  font-size: 3rem;
  font-weight: 4000;
  text-align: center;
  color: rgba(61, 81, 92, var(--tw-text-opacity));
`;

export const P3Text = styled.p`
  text-align: center;
  font-weight: 4000;
  word-break: keep-all;
  color: gray;
`;

export const P3Text2 = styled.p`
  text-align: right;
  text-decoration: underline; /* 밑줄 추가 */
  margin-top:15px;
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;

export const P3Text3 = styled.p`
  text-align: left;
  font-size: 0.875rem;
  color: red;
`;

export const P3Text4 = styled.p`
  position: absolute; /* 절대 위치 */
  top: 50%; /* 상단에서 50% */
  right: 10px; /* 우측에서 10px */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;

export const HomePageDiv = styled.div`
  display: flex;
  justify-content: left; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  img {
    width: 20vw; /* 화면 너비의 20%로 설정 */
    height: auto; /* 비율을 유지하면서 높이를 자동으로 설정 */
    max-width: 200px; /* 최대 너비 200px */
  }
  width: 100%;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding-top: 0.7rem;
  padding-bottom: 1rem;
  padding-left: 0.7rem;
  padding-right: 5rem;
  gap: 0.5rem;
  border-radius: 12px;
  background-color: ${(props) => props.bgcolor || "#63b26d"};
  border: ${(props) => (props.border ? props.border : "none")};
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;

export const HomePageButton = () => {
  const navigate = useNavigate();

  const HomePageOnClick = () => {
    navigate("/");
  };
  return (
    <HomePageDiv onClick={HomePageOnClick} bgcolor={"none"} border={"none"}>
      <img src={"images/logo.png"} alt="logo" />
    </HomePageDiv>
  );
};