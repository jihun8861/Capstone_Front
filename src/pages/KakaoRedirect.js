import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        if (!code) {
          setError("인증 코드가 없습니다. 다시 시도해주세요.");
          setLoading(false);
          return;
        }

        console.log("인증 코드:", code);
        const response = await axios.post(
          "https://port-0-virtualleaf-m1hzfdpj892e64c7.sel4.cloudtype.app/social/kakaologin",
          {
            "code": code
          }
        );

        console.log("백엔드 응답:", response.data);

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
        if (error.response && error.response.data && error.response.data.message) {
          alert(`로그인 실패: ${error.response.data.message}`);
        } 
      }
    };

    kakaoLogin();
  }, [code, navigate]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return null;
};

export default KakaoRedirect;
