import { Container } from "@mui/material";
import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChatRoom, Login, Register } from "./component";
import { colorBg, colorOuter, colorOuterActive } from "./constants";
import AuthProvider from "./Context";

function App() {
  const createStyle = () => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 0.7rem;
      }
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px ${colorOuterActive}; 
        border-radius: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background: ${colorOuter}; 
        border: 3px solid ${colorOuterActive};
        border-radius: 8px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${colorBg};
      }
    `;
    document.head.appendChild(style);
  };
  useMemo(() => {
    createStyle();
  }, []);
  return (
    <div style={{ backgroundColor: `${colorBg}`, height: "100%" }}>
      <Container
        sx={{
          height: "100%",
          paddingLeft: { xs: "0", sm: "10px", md: "16px" },
          paddingRight: { xs: "0", sm: "10px", md: "16px" },
        }}
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </Container>
    </div>
  );
}

export default App;
