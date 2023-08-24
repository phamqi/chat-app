import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { colorBg, colorOnBg } from "../constants";
import { auth } from "../FireBase/config";
import LoginProvider from "../FireBase/LoginProvider";
import Loading from "./Loading";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email || !password) {
      alert("Please enter a value of the filed");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <Box>
      <Container>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            lg={4}
            sx={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: "1.3rem 2.5rem",
                backgroundColor: `${colorOnBg}`,
                borderRadius: "8px",
                position: "relative",
              }}
            >
              {loading ? <Loading color={colorBg} width={50} /> : ""}
              <h5
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  margin: "0.5rem 0",
                  color: `${colorBg}`,
                }}
              >
                Login
              </h5>
              <Box>
                <form onSubmit={onSubmit}>
                  <TextField
                    sx={{ margin: " 0.5rem 0" }}
                    fullWidth
                    id="email"
                    label="Email"
                    variant="standard"
                    size="small"
                    color="secondary"
                  />
                  <TextField
                    sx={{ margin: " 0.5rem 0" }}
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    size="small"
                    color="secondary"
                  />

                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "0.875",
                      lineHight: "1.75",
                      padding: "5px 15px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      width: "100%",
                      fontWeight: "500",
                      color: "#9c27b0",
                      border: "2px solid #9c27b0 ",
                      cursor: "pointer",
                      margin: "1.5rem 0",
                    }}
                  >
                    Sign in
                  </button>
                </form>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContents: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  my={1}
                  sx={{
                    my: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={FacebookLogin}>
                    <FacebookOutlinedIcon fontSize="large" />
                  </Button>
                  <Button onClick={GithubLogin}>
                    <GitHubIcon fontSize="large" />
                  </Button>
                  <Button onClick={GoogleLogin}>
                    <GoogleIcon fontSize="large" />
                  </Button>
                </Box>
                <Box>
                  You don't have a account? <Link to="/register">Register</Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

Login.propTypes = {};

export default Login;
