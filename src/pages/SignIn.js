import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // axios 추가
import {
  Container,
  Frame1,
  Frame2,
  Frame3Top,
  InputBox,
  InputWrapper,
  Input,
  Button,
  H2Sign,
  P3Text,
  P3Text2,
  P3Text3,
  P3Text4,
  HomePageButton,
  HomePageDiv,
} from "../components/Sign";

const Frame3Bottom = styled.div`
  width: 100%;
  flex-direction: column;
`;

// ______or______ << 처럼 생긴 컴포넌트를 감싸는 박스
const DivideLineBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DivideLine = styled.div`
  height: 1px;
  flex: 1;
  background-color: #000000;
`;

const OrText = styled.div`
  margin: 0 10px; /* 텍스트 좌우 여백 */
  font-size: 0.75rem;
`;

// 이미지+텍스트 버튼
const ImageDiv = styled.div`
  justify-content: space-between; /* 가로 중앙 정렬 */
  margin-top: 1rem;
  padding-left: 4rem;
  padding-right: 5rem;
  border-radius: 12px;
  display: flex;
  background-color: ${(props) => props.bgcolor || "#63b26d"};
  border: ${(props) => (props.border ? props.border : "none")};
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
`;

const ButtonText = styled.p`
  display: flex; /* 상하조절? */
  align-items: center; /* 수직 중앙 정렬 */
  color: ${(props) => props.textcolor || "rgb(255 255 255)"}; /* 텍스트 색상 */
  font-weight: bold; /* 텍스트 굵기 증가 */
`;

const ButtonWithImageAndText = ({
  imageSrc,
  bgcolor,
  border,
  Text,
  textcolor,
  onClick, // onClick 추가
}) => {
  return (
    <ImageDiv bgcolor={bgcolor} border={border} onClick={onClick}>
      {imageSrc && <img src={imageSrc} alt="social icon" />}
      <ButtonText textcolor={textcolor}>{Text}</ButtonText>
    </ImageDiv>
  );
};

// 수정된 SignInContent 컴포넌트
const SignInContent = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailError, setEmailError] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);

  const [pwValid, setPwValid] = useState(false);

  const [pwType, setPwType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  // Kakao 로그인 관련 상수
  const KAKA0_REST_API_KEY = "62b2c37c9d5de5b35c5f93a9e2d03595";
  const KAKAO_REDIRECT_URI = "http://localhost:3000/social/kakao/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKA0_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  // 구글 로그인 핸들러
  const googleLoginHandler = () => {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=140224755848-2pt178oklbtm68ldbp964hgkdnhni73n.apps.googleusercontent.com&redirect_uri=http://localhost:3000/social/googlelogin&scope=profile%20email%20openid&response_type=code`;
    window.location.href = googleLoginUrl;
  };

  // 네이버 로그인 핸들러
  const naverLoginHandler = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=Vvfv1MYjiC3tNwq0DvKn&redirect_uri=http://localhost:3000/social/naverlogin&response_type=code`;
    window.location.href = naverLoginUrl;
  };

  // 카카오 로그인 핸들러
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailEntered(newEmail.length > 0);
    updateButtonState(newEmail, pw);

    if (!validateEmail(newEmail)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else setEmailError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePw = (e) => {
    const newPw = e.target.value;
    setPw(newPw);
    setPwValid(newPw.length >= 4);
    updateButtonState(email, newPw);
  };

  const updateButtonState = (newEmail, newPw) => {
    setNotAllow(
      !(newEmail.length > 0 && newPw.length >= 4 && validateEmail(newEmail))
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSignInBtn();
    }
  };

  const onClickSignInBtn = async () => {
    if (notAllow) {
      if (email.length === 0 && pw.length === 0) {
        alert("값을 입력해주세요.");
      } else if (!validateEmail(email)) {
        alert(emailError);
      } else {
        alert("비밀번호를 올바르게 입력해주세요.");
      }
      return;
    }

    try {
      const response = await axios.post(
        "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/login",
        {
          email: email,
          password: pw,
        }
      );

      const token = response.data;

      if (token) {
        localStorage.setItem("token", token);
        alert("로그인 성공!");
        navigate("/");
      } else {
        alert("토큰을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`로그인 실패: ${error.response.data.message}`);
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEyeClick = () => {
    setPwType(pwType === "password" ? "text" : "password");
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <HomePageButton />

      <Frame1>
        <Frame2>
          <Frame3Top>
            <H2Sign>로그인</H2Sign>
            <P3Text>가상식물키우기 VirtuaLeaf에 오신것을 환영합니다.</P3Text>
            <InputBox>
              <Input
                type="email"
                placeholder="이메일 주소를 입력해주세요"
                value={email}
                onChange={handleEmail}
                onKeyDown={handleKeyDown}
              />
              {emailError && <P3Text3>{emailError}</P3Text3>}
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={pw}
                  onChange={handlePw}
                  onKeyDown={handleKeyDown}
                />
                <P3Text4 onClick={handleEyeClick}>
                  {showPassword ? "🙈" : "👁️‍🗨️"}
                </P3Text4>
              </InputWrapper>
              {!pwValid && pw.length > 0 && (
                <P3Text3>비밀번호는 4자 이상이여야 합니다.</P3Text3>
              )}
              <Button onClick={onClickSignInBtn} disabled={notAllow}>
                로그인
              </Button>
            </InputBox>
          </Frame3Top>
          <DivideLineBox>
            <DivideLine />
            <OrText>OR</OrText>
            <DivideLine />
          </DivideLineBox>
          <Frame3Bottom>
            <ButtonWithImageAndText
              imageSrc="/images/social_kakao_icon.svg"
              bgcolor="#fee500"
              Text="카카오로 계속하기"
              textcolor="rgb(0 0 0)"
              onClick={loginHandler} // 카카오 로그인 버튼에 onClick 추가
            />
            <ButtonWithImageAndText
              imageSrc="/images/social_google_icon.svg"
              bgcolor="#FFFFFF"
              border="1px solid gray"
              Text="구글로 계속하기"
              textcolor="rgb(0 0 0)"
              onClick={googleLoginHandler} // 구글 로그인 버튼에 onClick 추가
            />
            <ButtonWithImageAndText
              imageSrc="/images/social_naver_icon.svg"
              bgcolor="#03CF5D"
              Text="네이버로 계속하기"
              textcolor="rgb(255 255 255)"
              onClick={naverLoginHandler} // 네이버 로그인 버튼에 onClick 추가
            />
          </Frame3Bottom>
          <P3Text2 onClick={handleSignUpClick}>회원가입</P3Text2>
        </Frame2>
      </Frame1>
    </Container>
  );
};

const SignIn = () => {
  return <SignInContent />;
};

export default SignIn;