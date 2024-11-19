import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Plants from "./pages/Plants";
import Contact from "./pages/Contact";
import Test from "./pages/Test";
import KakaoRedirect from "./pages/KakaoRedirect";
import GoogleCallback from "./pages/GoogleRedirect";
import NaverCallback from "./pages/NaverRedirect";
import Select from "./pages/Select";
import Growing from "./pages/Growing";

// 라우터 관리하는 App.jsx 즉, 경로를 관리하는 곳이라고 생각
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Plants" element={<Plants />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Growing" element={<Growing />} />
        <Route path="/Select" element={<Select />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/social/kakao/login" element={<KakaoRedirect />} />
        <Route path="/social/naverlogin" element={<NaverCallback />} />
        <Route path="/social/googlelogin" element={<GoogleCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
