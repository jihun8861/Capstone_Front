import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "../components/Main";
import { FaSeedling } from "react-icons/fa"; 

import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from "react-notion";

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
  border: 1px solid ;
  width: 100%;
  max-width: 900px;
  height: 100%;
  display: flex;
  padding-top: 160px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TeamMember = styled.div`
  width: 100%;
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
    name: "현지훈",
    role: "팀장",
    image: "images/현지훈.png",
  },
  {
    name: "신아울",
    role: "프론트엔드",
    image: "images/신아울.png",
  },
  {
    name: "김호연",
    role: "디자이너",
    image: "images/김호연.png",
  },
  {
    name: "조우주",
    role: "디자이너",
    image: "images/조우주.png",
  },
  // 추가 팀원 정보를 여기에 추가
];

const ContactContent = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [response, setResponse] = useState({});

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

    useEffect(() => {
      const notionID = `8b0b052fbed24011b780e22fe581028c`;
      fetch(`https://notion-api.splitbee.io/v1/page/${notionID}`)
      .then(res => res.json())
      .then(data => setResponse(data))
      .catch(err => console.error(err));
  }, []);
  
      
  return (
    <Container>
        <HeaderBar scrollProgress={scrollProgress}>
            <HeaderText>
                <LogoText><FaSeedling /></LogoText>
                VirtuaLeaf 팀을 소개합니다 🙂</HeaderText>
            </HeaderBar>        
            <TeamContainer>
        {teamMembers.map((member, index) => (
          <TeamMember key={index}>
            <MemberImage src={member.image} alt={member.name} />
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </TeamMember>
        ))}
      </TeamContainer>
      {response && (
        <NotionRenderer
          blockMap={response}
          fullPage={true}
        />
      )}
    </Container>
  );
};

const Contact = () => {
  return <Main props={<ContactContent />} />;
};

export default Contact;