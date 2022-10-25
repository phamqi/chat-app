import { Box, Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";

import {
  FacebookAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import React, { useState } from "react";
import { colorBg, colorOnBg } from "../constants";
import { auth, db } from "../FireBase/config";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { doc, setDoc } from "firebase/firestore";

function Login(props) {
  const provider = new FacebookAuthProvider();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result.user) {
          const { isNewUser } = getAdditionalUserInfo(result);
          if (isNewUser) {
            await setDoc(doc(db, "users", result.user.uid), {
              uid: result.user.uid,
              displayName: result.user.displayName,
              searchName: result.user.displayName.toLowerCase(),
              email: result.user.email,
              photoURL: result.user.photoURL,
            });
            await setDoc(doc(db, "userFriends", result.user.uid), {});
          }
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("singin with psw err", error);
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
                  <Button onClick={handleLogin}>
                    <FacebookOutlinedIcon fontSize="large" />
                  </Button>
                  <Button onClick={handleLogin}>
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
