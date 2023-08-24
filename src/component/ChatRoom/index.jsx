import { Button, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colorOuter, colorTxtBlur } from "../../constants";
import { AuthContext } from "../../Context";
import ChatWindow from "./ChatWindow";
import SideBar from "./SideBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ChatRoom(props) {
  const [friend, setFriend] = useState();
  const [translate, setTranslate] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const getFriend = (childData) => {
    setFriend(childData);
    setTranslate(false);
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setTranslate(true);
    }
    const gridContainer = document.getElementById("grid_container");
    const swip = () => {
      let startX, moveX;
      gridContainer.addEventListener(
        "touchstart",
        function (e) {
          startX = e.touches[0].clientX;
        },
        { passive: false }
      );
      gridContainer.addEventListener(
        "touchmove",
        function (e) {
          moveX = e.touches[0].clientX;
        },
        { passive: false }
      );
      gridContainer.addEventListener(
        "touchend",
        function (e) {
          if (startX + 50 < moveX) {
            setTranslate(false);
          }
          if (startX - 50 > moveX) {
            setTranslate(true);
          }
        },
        { passive: false }
      );
    };
    return () => {
      swip();
    };
  }, []);
  useEffect(() => {
    const mobileWidth = 600;
    const clean = () => {
      window.addEventListener("resize", function (e) {
        if (this.window.innerWidth > mobileWidth) {
          setTranslate(false);
        }
      });
    };
    return () => {
      clean();
    };
  }, []);
  const translateTrue = () => {
    setTranslate(true);
  };
  const translateFalse = () => {
    setTranslate(false);
  };
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h3
        style={{
          height: "8%",
          margin: "0",
          fontSize: "2rem",
          color: `${colorTxtBlur}`,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Chat app
      </h3>
      <Grid
        id="grid_container"
        container
        sx={{
          height: "90%",
          position: "relative",
          overflow: "hidden",
          zIndex: 4,
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Grid
          item
          xs={12}
          sm={7}
          md={8}
          lg={8}
          px={1}
          sx={{
            height: "100%",
            width: "100%",
            position: { xs: "absolute", sm: "relative", md: "relative" },
            zIndex: 3,
            transform: `${translate ? "translateX(-85%)" : "translateX(0)"}`,
            transitionDuration: { xs: "0.7s", sm: "0s", md: "0s" },
          }}
        >
          <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            <Button
              type="button"
              sx={{
                position: "absolute",
                zIndex: "99999",
                top: "3%",
                right: "0%",
                color: `${colorTxtBlur}`,
                minWidth: "30px",
                height: "30px",
                borderRadius: "15%",
                display: { xs: "flex", sm: "none" },
                padding: "0",
                backgroundColor: `${colorOuter}`,
                border: `none`,
              }}
            >
              {translate ? (
                <ArrowForwardIosIcon onClick={translateFalse} />
              ) : (
                <ArrowBackIosNewIcon onClick={translateTrue} />
              )}
            </Button>
            <ChatWindow friend={friend} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          lg={4}
          px={1}
          sx={{
            height: "100%",
            width: { xs: "85%", sm: "100%", md: "100%" },
            position: { xs: "absolute", sm: "relative", md: "relative" },
            zIndex: 2,
          }}
        >
          <SideBar getFriend={getFriend} user={user} />
        </Grid>
      </Grid>
    </Box>
  );
}

ChatRoom.propTypes = {};

export default ChatRoom;
