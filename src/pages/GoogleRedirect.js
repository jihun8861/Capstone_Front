import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const googleLogin = async () => {
      try {
        if (!code) {
          alert("인증 코드가 없습니다. 다시 시도해주세요.");
          return;
        }

        console.log("인증 코드:", code);
        const response = await axios.post(
          "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/social/googlelogin", // 백엔드 URL
          { 
            code: code,
          } 
        );

        console.log("백엔드 응답:", response.data);

        const token = response.data;

        if (token) {
          localStorage.setItem("token", token);
          alert("로그인 성공!");
          navigate("/"); // 메인 페이지로 이동
        } else {
          alert("토큰을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("로그인 오류:", error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(`로그인 실패: ${error.response.data.message}`);
        } 
      }
    };

    googleLogin();
  }, [code, navigate]);

  return null;
}

export default GoogleCallback;
