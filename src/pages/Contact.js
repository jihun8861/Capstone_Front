import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import { FaSeedling } from "react-icons/fa"; 
import KakaoMap from "../components/KakaoMap";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HeaderBar = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;

    width: 100%;
    height: 50px;
    
    background-color: white;
    margin: 120px 0 0 0;
    display: flex;


    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: #88C765;
        width: ${({ scrollProgress }) => `${scrollProgress}%`}; /* 스크롤 진행 상황에 따라 길이 조정 */
    }
`;

const LogoText = styled.div`
    margin-left: 20px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    color:black;
    background-color: #88C765;
    padding: 5px 8px; 
    border-radius: 5px;
`;

const HeaderText = styled.div`
    color: black;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px; /* 아이콘과 텍스트 사이 간격 */
`;
const TeamContainer = styled.div`
  width: 900px;
  padding: 160px 96px 0 96px; /* 상 우 하 좌 순서 */
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  
`;
const TeamBox = styled.div`  
  width: 100%;
  margin: 96px 0px 96px 0px;
  justify-content: left;
  
`;
const TeamMembersStyle = styled.div`  
  width: 100%;
  display: grid;  
  grid-template-columns: repeat(2, 1fr);
`;
const TeamLogo = styled.div`
  font-size: 90px;
  margin: 0 0 20px 0;
`;

const CallOut = styled.div`
  width: 100%;
  border-radius: 30px;
  background-color: #F1F1EF;
  padding: 20px;
  font-size: 16px;
  font-weight: 800;
  margin: 20px 0 20px 0;
`;
const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin: 10px 0px 10px 0px;
`;
const TeamH1 = styled.h1`
  margin: 10px 0 10px 0;
  font-weight: 700;
  font-size: 40px;
`;

const TeamH2 = styled.h2`
  margin: 40px 0 10px 0;
  font-weight: 800;
  font-size: 24px;
  color : #0B6E99;
`;
const TeamH4 = styled.h4`
  margin: 10px 0 10px 0;
  font-size: 18px;
  font-weight: 400;
`;
const TeamH5 = styled.h5`
  margin: 10px 0 10px 0;
  font-size: 16px;
  color: gray;
  font-weight: 400;
`;

const TeamMember = styled.div`
  width: 90%;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const MemberName = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const MemberRole = styled.p`
  font-size: 14px;
  color: #666;
`;

const teamMembers = [
  {
    name: "현지훈 | Leader ",
    role: "VirtuaLeaf 팀은 언제나 크게 생각하고, 빠르게 실행합니다. 기술을 통해 문제를 해결합니다.",
    image: "images/현지훈.png",
  },
  {
    name: "신아울 | FrontEnd Developer",
    role:   `뛰어난 팀원들 곁에서 많은 것을 배우며, 성장하고 있습니다. 
            주도적으로 일할 수 있는 환경에서 책임감을 가지고 일하는 것을 좋아합니다. 
            팀은 그런 환경이 주어져서 즐겁게 일했습니다. `,
    image: "images/신아울.png",
  },
  {
    name: "김호연 | BackEnd Developer",
    role: `backend 개발자로서, 팀원들과 함께 협업하며 서비스를 개발하고 있습니다. 
            3D 모델링을 구현하는 것을 담당하였습니다.`,
    image: "images/김호연.png",
  },
  {
    name: "조우주 | Designer",
    role:`backend 개발자로서, 팀원들과 함께 협업하며 서비스를 개발하고 있습니다. 
            3D 모델링을 구현하는 것을 담당하였습니다.`,
    image: "images/조우주.png",
  },
  // 추가 팀원 정보를 여기에 추가
];

const ContactContent = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setScrollProgress(scrollPercent);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
      
    }, []);
    
  return (
    <Container>
      <HeaderBar scrollProgress={scrollProgress}>
        <HeaderText>
          <LogoText><FaSeedling /></LogoText>
          VirtuaLeaf 팀을 소개합니다 🙂
        </HeaderText>
      </HeaderBar>        
        <TeamContainer>
          <TeamBox>
          <TeamLogo>👪</TeamLogo>
          <TeamH1>버추얼리프 팀을 소개합니다🙂</TeamH1>
           <TeamH5>버추얼리프 팀 구성원들은 어떤 생각을 가지고, 어떤 문제를 해결하고 있을까요?</TeamH5>
           <TeamH5>아래에서 팀원들을 소개합니다!</TeamH5>
        </TeamBox>
        <TeamMembersStyle>
        {teamMembers.map((member, index) => (
          <TeamMember key={index}>
            <MemberImage src={member.image} alt={member.name} />
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </TeamMember>
          
        ))}
        </TeamMembersStyle>
        
        <TeamH2>VirtuaLeaf는 어떤 서비스를 만들고 있나요?</TeamH2>
        <Line/>
        <CallOut>🙂변화에 대해 도전하는 것.
                  저희가 말하는 ‘변화’는 자신만의 정서와 시간을
                  담을 수 있는 공간으로 변화 시켜 스스로 만족하는
                  라이프스타일을 만드는 것입니다.🌱
        </CallOut>
          Virtualeaf는 가상 공간에서 사람과 식물이 서로 연결될 수 있도록, 
          사용자가 겪는 제약을 넘어 더 풍부한 경험과 성장을 제공합니다.
          <br/><br/>
          Virtual Leaf의 'Virtual'은 현실의 제약을 넘어 새로운 공간에서의 성장을 의미합니다. 
          이 공간에서는 사용자가 직접 가꾸는 가상 식물을 통해 자신의 성장과 변화를 시각적으로 체험할 수 있습니다. 
          ‘Leaf’는 생명력과 성장을 상징하는 동시에, 사용자가 선택한 취미나 라이프스타일을 대변하는 작은 조각이기도 합니다.
          <br/><br/>
          결국 'Virtual Leaf'는 물리적인 한계를 뛰어넘어, 사용자들이 스스로의 발전을 돌보고 가꾸며, 가상 세계에서 현실과 닮은 성취감을 느끼는 공간입니다. 이곳에서 식물과 함께 자라나는 것은 단순한 취미를 넘어서, 지속적인 성장과 변화를 추구하는 모든 사용자들입니다.
        
        <TeamH2>Contact</TeamH2>
        <Line/>
        <TeamH4>🌱 홈페이지 :  <a href="/">virtualeaf.com</a> 
        <br/>
        😎 지식블로그(캠프) :  <a href="/">  dd.com</a>
        <br/>
        🧱 채용 문의  jihunhyen123@naver.com</TeamH4>
        <br/>
        <br/>
        <TeamH4>
        🚩 오시는 길 : 경상남도 김해시 인제로 197, E동(장영실관) P&N </TeamH4>
        <KakaoMap/>
        <Line/>
        </TeamContainer>
    </Container>
  );
};

const Contact = () => {
  return <Main props={<ContactContent />} />;
};

export default Contact;