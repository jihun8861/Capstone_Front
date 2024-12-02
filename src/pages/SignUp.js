import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios"; // axios 임포트
import { useNavigate, Link } from "react-router-dom";
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

// ______or______ << 처럼 생긴 컴포넌트를 감싸는 박스
const DivideLineBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0rem 1rem 0rem; /* 위, 오른쪽, 아래, 왼쪽 여백 */
`;

const DivideLine = styled.div`
  height: 1px;
  flex: 1;
  background-color: #000000;
`;


const SignUpContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  const [nameValid, setNameValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);

  const [pwType, setPwType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    updateButtonState(email, name, pw, confirmPw);
  }, [email, name, pw, confirmPw, isDuplicateChecked]);

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailEntered(newEmail.length > 0);
    setEmailError("");
    setEmailSuccess("");

    if (!validateEmail(newEmail)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setEmailSuccess("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNameValid(newName.length > 0);
  };

  const handlePw = (e) => {
    const newPw = e.target.value;
    setPw(newPw);
    setPwValid(newPw.length >= 4);
  };

  const handleConfirmPw = (e) => {
    const newConfirmPw = e.target.value;
    setConfirmPw(newConfirmPw);
    setConfirmPwValid(newConfirmPw === pw);
  };

  const updateButtonState = (newEmail, newName, newPw, newConfirmPw) => {
    setNotAllow(
      !(
        newEmail.length > 0 &&
        newName.length > 0 &&
        newPw.length >= 4 &&
        newPw === newConfirmPw &&
        isDuplicateChecked
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSignUpBtn();
    }
  };

  // 이메일 중복 체크
  const emailCheck = async () => {
    console.log("emailCheck");
    try {
      const response = await axios.post(
        "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/duplication",
        { email: email }
      );
      console.log(email);
      console.log(response.data);
      if (!validateEmail(email)) {
        setIsDuplicateChecked(false);
      } else if (response.data === true) {
        setEmailError("이미 사용중인 이메일입니다.");
        setEmailSuccess("");
        setIsDuplicateChecked(false);
      } else {
        setIsDuplicateChecked(true);
        setEmailError("");
        setEmailSuccess("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      setEmailError("에러");
      setEmailSuccess("오류가 발생했습니다.");
      setIsDuplicateChecked(false);
    }
  };

  // 회원가입 버튼 클릭 시
  const onClickSignUpBtn = async () => {
    if (!notAllow) {
      try {
        await axios.post(
          "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/user/register",
          {
            name: name,
            email: email,
            password: pw,
          }
        );
        alert("회원가입에 성공했습니다.");
        navigate("/SignIn");
      } catch (error) {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (!isDuplicateChecked) {
      alert("이메일 중복확인을 해주세요.");
    } else {
      alert("회원가입 정보를 올바르게 입력해주세요.");
    }
  };

  const handleEyeClick = () => {
    setPwType(pwType === "password" ? "text" : "password");
    setShowPassword(!showPassword);
  };

  const handleSigninClick = () => {
    navigate("/signin");
  };

  return (
    <Container>
     
      <Frame1>
        <Frame2> 
          <HomePageButton navigate={navigate} />
          <Frame3Top>
            <H2Sign>회원가입</H2Sign>
            <P3Text>VirtuaLeaf의 회원이 되어보세요!</P3Text>
            <InputBox>
              <InputWrapper>
                <Input
                  type="email"
                  placeholder="✉이메일을 입력해주세요"
                  value={email}
                  onChange={handleEmail}
                  onKeyDown={handleKeyDown}
                />
                <P3Text4 onClick={emailCheck}>중복확인</P3Text4>
              </InputWrapper>
              {emailError && <P3Text3>{emailError}</P3Text3>}
              {emailSuccess && <P3Text3>{emailSuccess}</P3Text3>}
              <Input
                type="text"
                placeholder="🌱이름을 입력해 주세요"
                value={name}
                onChange={handleName}
                onKeyDown={handleKeyDown}
              />
 
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="🔐비밀번호를 입력해주세요"
                  value={pw}
                  onChange={handlePw}
                  onKeyDown={handleKeyDown}
                />
                <P3Text4 onClick={handleEyeClick}>👁️‍🗨️</P3Text4>
              </InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="✅한번 더 입력해주세요"
                value={confirmPw}
                onChange={handleConfirmPw}
                onKeyDown={handleKeyDown}
              />
              {!confirmPwValid && confirmPw.length > 0 && (
                <P3Text3>비밀번호가 일치하지 않습니다.</P3Text3>
              )}
              {!pwValid && pw.length > 0 && (
                <P3Text3>비밀번호는 4자 이상이여야 합니다.</P3Text3>
              )}
              <Button onClick={onClickSignUpBtn} /*disabled={notAllow}*/>
                가입하기
              </Button>
            </InputBox>
          </Frame3Top>
          <P3Text2 onClick={handleSigninClick}>로그인</P3Text2>
        </Frame2>
      </Frame1>
    </Container>
  );
};

const SignUp = () => {
  return <SignUpContent />;
};

export default SignUp;
