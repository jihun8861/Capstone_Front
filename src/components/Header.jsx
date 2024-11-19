import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  background-color: ${(props) =>
    props.atTop ? (props.isHome ? "transparent" : "white") : "white"};
  border-bottom: ${(props) =>
    props.isHome ? "none" : "1px solid #e8e8e8"};
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    border-bottom 0.3s ease-in-out;
`;

const Frame = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const HeaderFrame = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Logo = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 50px;
  img {
    width: 100%;
    height: 80%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  margin-left: 150px;
  gap: 30px;
`;

const NavItem = styled.a`
  font-size: 21px;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) =>
    props.atTop ? (props.isHome ? "#57685a" : "black") : "black"};
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #97c9a1;
  }
`;

const UserIcon = styled(RiUserLine)`
  font-size: 28px;
  position: absolute;
  right: 60px;
  color: ${(props) =>
    props.isHome ? (props.atTop ? "white" : "black") : "black"};
  transition: color 0.3s ease-in-out;
  cursor: pointer;
`;

const MenuIcon = styled(RxHamburgerMenu)`
  font-size: 28px;
  position: absolute;
  right: 10px;
  color: ${(props) =>
    props.isHome ? (props.atTop ? "white" : "black") : "black"};
  transition: color 0.3s ease-in-out;
  cursor: pointer;
`;


const LogoutButton = styled.button`
  position: absolute;
  right: 180px;
  background-color: transparent;
  border: 1px solid #97c9a1;
  color: ${(props) =>
    props.atTop ? (props.isHome ? "white" : "black") : "black"};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #97c9a1;
    color: white;
  }
`;

const UserName = styled.span`
  position: absolute;
  right: 280px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) =>
    props.atTop ? (props.isHome ? "white" : "black") : "black"};
  transition: color 0.3s ease-in-out;
`;

const Header = ({ isHome }) => {
  const navigate = useNavigate();
  const [atTop, setAtTop] = useState(isHome);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/getuser", // API URL
            {
              token: token, // 요청 본문에 토큰 전달
            }
          );
          
          // 사용자 정보가 있으면 이름 설정
          if (response.data && response.data.name) {
            setUserName(response.data.name);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY === 0);
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/select");
    } else {
      navigate("/signin"); // 비로그인 상태면 로그인 페이지로 이동
    }
  };

  const handleLogoutClick = () => {
    // 로그아웃 처리 (토큰 삭제 및 리다이렉트)
    localStorage.removeItem("token");
    localStorage.removeItem("access_token"); // access_token도 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    setUserName(""); // 사용자 이름 초기화
    navigate("/");
  };
  

  return (
    <Container atTop={atTop} isHome={isHome}>
      <Frame>
        <HeaderFrame>
          <Logo>
            <a href="/">
              <img src="images/logo.png" alt="logo" />
            </a>
          </Logo>

          <NavMenu>
            <NavItem href="/plants" atTop={atTop} isHome={isHome}>
              Plants
            </NavItem>
            <NavItem href="/contact" atTop={atTop} isHome={isHome}>
              Contact
            </NavItem>
            <NavItem href="/Virtual" atTop={atTop} isHome={isHome}>
              Virtual
            </NavItem>
          </NavMenu>

          {isLoggedIn && (
            <>
              <UserName atTop={atTop} isHome={isHome}>
                {userName}님                
              </UserName>
              <LogoutButton
                onClick={handleLogoutClick}
                atTop={atTop}
                isHome={isHome}
              >
                로그아웃
              </LogoutButton>
            </>
          )}

          <UserIcon
            onClick={handleLoginClick} // 로그인 상태에 따라 mypage 또는 signin으로 이동
            atTop={atTop}
            isHome={isHome}
          />
          <MenuIcon atTop={atTop} isHome={isHome} />
        </HeaderFrame>
      </Frame>
    </Container>
  );
};

export default Header;
