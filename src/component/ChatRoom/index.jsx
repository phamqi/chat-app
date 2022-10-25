import { Button, Grid } from "@mui/material";
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
  console.log("chat room render");
  const [friend, setFriend] = useState();
  const [translate, setTranslate] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const getFriend = (childData) => {
    setFriend(childData);
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
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
          e.preventDefault();
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
      console.log(translate);
    };
    return () => {
      swip();
    };
  }, []);
  useEffect(() => {
    const clean = () => {
      window.addEventListener("resize", function (e) {
        setTranslate(false);
      });
    };
    return () => {
      clean();
    };
  });
  const onTranslate = () => {
    setTranslate(!translate);
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
        <Button
          onClick={onTranslate}
          type="button"
          sx={{
            position: "absolute",
            zIndex: "99999",
            bottom: "50%",
            right: "0%",
            color: `${colorTxtBlur}`,
            minWidth: "35px",
            height: "35px",
            borderRadius: "10%",
            display: { xs: "flex", sm: "none", md: "none" },
            padding: "0",
            backgroundColor: `${colorOuter}`,
            boxShadow: `0 0 1px  ${colorTxtBlur}`,
          }}
        >
          {translate ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </Button>
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
          <ChatWindow friend={friend} />
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
