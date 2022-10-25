import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../FireBase/config";

import { colorBg, colorOnBg } from "../constants";
import Loading from "./Loading";

function Register(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value.trim();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const img = e.target[3].files[0];
    if (!img) {
      alert("Please choose an img");
    } else {
      try {
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, displayName.trim() + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                Promise.all([
                  await updateProfile(res.user, {
                    displayName: displayName,
                    photoURL: downloadURL,
                  }),
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: displayName,
                    searchName: displayName.toLowerCase(),
                    email,
                    photoURL: downloadURL,
                  }),
                  await setDoc(doc(db, "userFriends", res.user.uid), {}),
                ]);
                setLoading(false);
                navigate("/");
              }
            );
          }
        );
      } catch (error) {
        console.log(error);
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
                Register
              </h5>
              <form onSubmit={onSubmit}>
                <TextField
                  sx={{ margin: " 0.5rem 0", textTransform: "capitalize" }}
                  fullWidth
                  id="userName"
                  label="Name"
                  variant="standard"
                  size="small"
                  color="secondary"
                />
                <TextField
                  sx={{ margin: " 0.5rem 0" }}
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  size="small"
                  autoComplete="username"
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

                <label
                  style={{
                    display: "flex",
                    width: "100%",
                    margin: "0.5rem 0",
                    alignItems: "center",
                  }}
                  htmlFor="avatar"
                >
                  <span
                    style={{
                      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                      fontWeight: 400,
                      fontSize: "1rem",
                      textDirection: "underline",
                      color: "rgba(0, 0, 0, 0.6)",
                      cursor: "pointer",
                      padding: "8px 0 ",
                      borderBottom: "1px solid rgba(0, 0 ,0, 0.6)",
                    }}
                  >
                    Add an avatar
                  </span>
                </label>
                <input type="file" id="avatar" style={{ display: "none" }} />
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
                  Register
                </button>
              </form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContents: "center",
                }}
              >
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  <Link to="/login">Log in</Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

Register.propTypes = {};

export default Register;
