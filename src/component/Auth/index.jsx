import { Box, Grid } from "@mui/material";
import React from "react";

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Panel from "./Panel";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const setTrue = () => {
    setIsRegister(true);
  };
  const setFalse = () => {
    setIsRegister(false);
  };
  return (
    <div style={{ backgroundColor: "#202225", height: "100%" }}>
      <Box
        sx={{
          height: "100%",
          paddingLeft: { xs: "0", sm: "8px", md: "16px" },
          paddingRight: { xs: "0", sm: "8px", md: "16px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1000",
          " .active .register": {
            transform: { xs: "translateX(0)", sm: "translateX(100%)" },
            zIndex: 5,
          },
          ".active .login": {
            transform: { xs: "translateX(-150%)", sm: "translateX(100%)" },
            zIndex: { sx: 5, sm: 1 },
          },
          " .active .overlay": {
            transform: { xs: "translateX(0)", sm: "translateX(-100%)" },
          },
          " .active .over": {
            transform: { xs: "translateX(0)", sm: "translateX(50%)" },
          },
          " .active .right": {
            transform: { xs: "translateX(100%)", sm: "translateX(80%)" },
          },
          " .active .left": {
            transform: "translateX(0%)",
          },
        }}
      >
        <Grid container justifyContent="center" p={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={6}
            sx={{
              boxShadow: `8px 14px 20px rgba(0,0,0,0.78), 
			0 10px 10px rgba(0,0,0,0.22)`,
            }}
          >
            <Box
              className={`${isRegister ? "active" : " "}`}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "50vh", sm: "480px" },
                minHeight: "400px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <Box
                className="login"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: "5",
                  height: "100%",
                  width: { xs: "100%", sm: "50%" },
                  transition: "all 0.5s  ease-in-out",
                  transform: { xs: "translateX(0)", sm: "translateX(0)" },
                }}
              >
                <Login onClick={setTrue} />
              </Box>
              <Box
                className="register"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: { xs: "100%", sm: "50%", md: "50%" },
                  transition: "all 0.5s  ease-in-out ",
                  transform: { xs: "translateX(150%)", sm: "translateX(0)" },
                  zIndex: { xs: 5, sm: 1 },
                }}
              >
                <Register onClick={setFalse} />
              </Box>
              <Box
                className="overlay"
                sx={{
                  position: { xs: "fixed", sm: "absolute" },
                  width: { xs: "100vw", sm: "50%" },
                  height: { xs: "100vh", sm: "100%" },
                  top: 0,
                  left: { xs: "0", sm: "50%" },
                  bottom: 0,
                  zIndex: { xs: 4, sm: 10 },
                  transition: "all 0.5s  ease-in-out",
                  transform: "translateX(0)",
                  overflow: "hidden",
                }}
              >
                <Box
                  className="over"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to bottom right, #202225, #000)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    position: { xs: "fixed", sm: "relative" },
                    top: 0,
                    left: { xs: "0", sm: "-100%" },
                    width: { xs: "100%", sm: "200%" },
                    height: "100%",
                  }}
                >
                  <Box
                    className="left"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: { xs: "100%", sm: "50%" },
                      transform: {
                        xs: "translateX(-100%)",
                        sm: "translateX(-80%)",
                      },
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <Panel
                      onCLick={setFalse}
                      text={{
                        h1: "Welcome Back!",
                        p: "To keep connected with us please login with your personal info",
                        btn: "Sing in",
                      }}
                    />
                  </Box>
                  <Box
                    className="right"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: "100%",
                      width: { xs: "100%", sm: "50%" },
                      transform: "translateX(0)",
                      transition: "all 0.5s  ease-in-out",
                    }}
                  >
                    <Panel
                      onCLick={setTrue}
                      text={{
                        h1: "Hello, Friend!",
                        p: "Enter your personal details and start journey with us",
                        btn: "Sing up",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Auth;
