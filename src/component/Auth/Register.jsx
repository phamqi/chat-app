import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  useFormControl,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { createUser } from "../../FireBase";
import { colorBg, colorOnBg } from "../../constants";
import Loading from "../Loading";
import { useEffect } from "react";
import { AlertContext } from "../../AlertContext";

function Register({ onClick }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const onChangeImg = (e) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setPreview(preview);
  };
  const handleAlert = useContext(AlertContext);
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const displayName = e.target[0].value.trim();
      const email = e.target[2].value;
      const password = e.target[4].value;
      const img = e.target[6].files[0];
      if (!img) {
        handleAlert("warning", "Please choose an img!");
      } else {
        if (!displayName || !email || !password) {
          handleAlert("warning", "Please enter a value of the filed!");
        } else {
          try {
            setLoading(true);
            await createUser(displayName, email, password, img);
            navigate("/");
            setLoading(false);
          } catch (error) {
            handleAlert("error", error.message);
          }
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
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        {loading && <Loading color={colorBg} width={50} />}
        <h5
          style={{
            textAlign: "center",
            fontSize: "2rem",
            margin: "0.5rem 0",
            color: `${colorBg}`,
          }}
        >
          Register
        </h5>
        <form onSubmit={onSubmit}>
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
              textTransform: "capitalize",
            }}
            fullWidth
            id="userName"
            label="Name"
            size="small"
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
            id="email"
            label="Email"
            type="email"
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
                  borderColor: "#333  !important",
                  borderWidth: "2px",
                },
              },
            }}
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            size="small"
          />

          <label
            style={{
              display: "flex",
              width: "100%",
              margin: "0.5rem 0",
              alignItems: "center",
              boxSizing: "border-box",
              height: "3rem",
            }}
            htmlFor="avatar"
          >
            {preview ? (
              <Box
                sx={{
                  width: "3rem",
                  height: "3rem",
                  overflow: "hidden",
                  borderRadius: "50%",
                  border: "1px solid rgba(0, 0, 0, 0.6)",
                }}
              >
                <img
                  src={preview}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <span
                style={{
                  textDirection: "underline",
                  cursor: "pointer",
                  padding: "8px 0 ",
                }}
              >
                <AddPhotoAlternateIcon
                  sx={{
                    width: "2rem !important",
                    height: "2rem",
                    color: "rgba(0, 0, 0, 0.6)",
                    "&:hover": {
                      color: "#333",
                    },
                  }}
                />
              </span>
            )}
          </label>
          <input
            type="file"
            id="avatar"
            style={{ display: "none" }}
            onChange={onChangeImg}
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
            Sign up
          </button>
        </form>
        <Box
          onClick={onClick}
          style={{
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
          Sign in
        </Box>
      </Box>
    </Box>
  );
}

Register.propTypes = {};

export default Register;
