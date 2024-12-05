import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
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
  border-bottom: ${(props) => (props.isHome ? "none" : "1px solid #e8e8e8")};
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
  cursor: pointer;
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

const NavItem = styled(Link)`
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
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/getuser",
            { 
              token: token
            }
          );
  
          if (response.data && response.data.email) {
            const email = response.data.email;
            setUserEmail(email);
            setIsLoggedIn(true);
  
            const plantResponse = await axios.post(
              "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/plant/getplant",
              { 
                username: email 
              }
            );
  
            if (plantResponse.data && plantResponse.data.plantname) {
              const plantName = plantResponse.data.plantname;
              localStorage.setItem("selectedPlant", plantName);
              console.log(`사용자의 선택된 식물: ${plantName}`);
            }
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("selectedPlant");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/");
  };

  const handleClearTokenClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("selectedPlant");
    alert("토큰이 삭제되었습니다.");
  };

  const handleUserIconClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
  
      const response = await axios.post(
        "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/plant/getplant",
        { username: userEmail }
      );
  
      const plantData = response.data;
  
      if (plantData && plantData.plantname) {
        // 선택된 식물이 있는 경우
        navigate("/growing", { state: { plantData } });
      } else {
        // 선택된 식물이 없는 경우
        navigate("/select", { state: { plantData: null } });
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      navigate("/select", { state: { plantData: null } });
    }
  };
  

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Container atTop={atTop} isHome={isHome}>
      <Frame>
        <HeaderFrame>
          <Logo onClick={handleLogoClick}>
            <img src="images/logo.png" alt="logo" />
          </Logo>

          <NavMenu>
            <NavItem to="/plants" atTop={atTop} isHome={isHome}>
              Plants
            </NavItem>
            <NavItem to="/contact" atTop={atTop} isHome={isHome}>
              Contact
            </NavItem>
            <NavItem to="/virtual" atTop={atTop} isHome={isHome}>
              Virtual
            </NavItem>
          </NavMenu>

          {isLoggedIn && (
            <>
              <UserName atTop={atTop} isHome={isHome}>
                {userEmail}님
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

          <button onClick={handleClearTokenClick} style={{ marginLeft: "10px" }}>
            토큰 삭제
          </button>

          <UserIcon
            onClick={handleUserIconClick}
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