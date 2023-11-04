import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, TextField } from "@mui/material";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AlertContext } from "../../AlertContext";
import LoginProvider from "../../FireBase/LoginProvider";
import { auth } from "../../FireBase/config";
import { colorBg } from "../../constants";
import Loading from "../Loading";

function Login({ onClick }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAlert = useContext(AlertContext);

  const FacebookLogin = () => {
    setLoading(true);
    const provider = new FacebookAuthProvider();
    LoginProvider(provider);
    navigate("/");
    setLoading(false);
  };
  const GoogleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    LoginProvider(provider);
    navigate("/");
    setLoading(false);
  };
  const GithubLogin = () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    LoginProvider(provider);
    navigate("/");
    setLoading(false);
  };
  const LoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[2].value;
      if (!email || !password) {
        handleAlert("warning", "Please enter a value of the filed!");
      } else {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          handleAlert("error", error.message);
        }
      }
    } catch (error) {
      handleAlert("error", error.message);
    }
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: { xs: "1rem 2rem", sm: " 3rem 2.5rem" },
          backgroundColor: `#fff`,
          position: "relative",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {loading && <Loading color={colorBg} width={50} />}
        <Box>
          <h5
            style={{
              textAlign: "center",
              fontSize: "2rem",
              margin: "0.5rem 0",
              color: `${colorBg}`,
            }}
          >
            Sign in
          </h5>

          <Box
            my={1}
            sx={{
              my: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={FacebookLogin}
              sx={{
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <FacebookOutlinedIcon
                fontSize="large"
                sx={{ color: "#555", ":hover": { color: "#333" } }}
              />
            </Button>
            <Button
              onClick={GithubLogin}
              sx={{
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <GitHubIcon
                fontSize="large"
                sx={{ color: "#555", ":hover": { color: "#333" } }}
              />
            </Button>
            <Button
              onClick={GoogleLogin}
              sx={{
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <GoogleIcon
                fontSize="large"
                sx={{ color: "#555", ":hover": { color: "#333" } }}
              />
            </Button>
          </Box>
          <p style={{ textAlign: "center" }}>or use your account</p>
        </Box>

        <Box>
          <form onSubmit={LoginSubmit}>
            <TextField
              sx={{
                margin: " 0.5rem 0",
                borderRadius: "8px",
                backgroundColor: "#eee",
                ".Mui-focused": {
                  color: "#000 !important",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#333  !important",
                    borderWidth: "2px",
                  },
                },
              }}
              fullWidth
              id="login-email"
              label="Email"
              size="small"
              autoComplete="username"
            />
            <TextField
              sx={{
                margin: " 0.5rem 0",
                borderRadius: "8px",
                backgroundColor: "#eee",
                ".Mui-focused": {
                  color: "#000 !important",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#333 !important",
                    borderWidth: "2px",
                  },
                },
              }}
              fullWidth
              id="login-password"
              label="Password"
              type="password"
              autoComplete="current-password"
              size="small"
            />

            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.875",
                lineHight: "1.75",
                padding: "5px 15px",
                textTransform: "uppercase",
                width: "100%",
                fontWeight: "500",
                color: "#fff",
                cursor: "pointer",
                margin: "1.5rem 0",
                backgroundColor: "#222",
                border: "2px solid  #222",
                borderRadius: "8px",
                "&:hover": {
                  color: "#333",
                  backgroundColor: "#fff",
                },
              }}
            >
              Sign in
            </button>
          </form>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box
              onClick={onClick}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.875",
                lineHight: "1.75",
                textTransform: "capitalize",
                textDecoration: "underline",
                width: "100%",
                fontWeight: "400",
                color: "#333",
                cursor: "pointer",
                margin: "0",
              }}
            >
              Sign up
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Login.propTypes = {};

export default Login;
