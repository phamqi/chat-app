import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context";
import { colorOuter, colorTxtBlur } from "../../constants";
import ChatWindow from "./ChatWindow";
import SideBar from "./SideBar";

function ChatRoom(props) {
  const [friend, setFriend] = useState();
  const [translate, setTranslate] = useState(false);
  const navigate = useNavigate();
  const value = useContext(AuthContext);
  const getFriend = (childData) => {
    setFriend(childData);
    setTranslate(false);
  };
  useEffect(() => {
    if (!value.user) {
      navigate("/auth");
    }
  }, [value.user]);
  const addEvents = (gridContainer) => {
    try {
      if (gridContainer) {
        let start, move;
        if (window.innerWidth < 600) {
          gridContainer.ontouchstart = function (e) {
            start = e.touches[0].clientX;
          };
          gridContainer.ontouchmove = function (e) {
            move = e.touches[0].clientX;
          };
          gridContainer.ontouchend = function () {
            if (start + 50 < move) {
              setTranslate(false);
            }
            if (start - 50 > move) {
              setTranslate(true);
            }
          };
        } else {
          setTranslate(false);
          gridContainer.ontouchend = function () {};
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    const gridContainer = document.getElementById("grid_container");
    addEvents(gridContainer);
    const clean = () => {
      window.addEventListener("resize", function (e) {
        addEvents(gridContainer);
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
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "1400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
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
          lg={9}
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
                zIndex: "999",
                top: "1.3rem",
                right: "0",
                color: `${colorTxtBlur}`,
                minWidth: "30px",
                height: "30px",
                display: { xs: "flex", sm: "none" },
                padding: "0",
                backgroundColor: "transparent",
                border: `none`,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: `${colorOuter}`,
                },
              }}
            >
              {translate ? (
                <ArrowForwardIosIcon
                  onClick={translateFalse}
                  sx={{ margin: "4px" }}
                />
              ) : (
                <ArrowBackIosNewIcon
                  onClick={translateTrue}
                  sx={{ margin: "4px" }}
                />
              )}
            </Button>
            <ChatWindow friend={friend} user={value.user} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          lg={3}
          px={1}
          sx={{
            height: "100%",
            width: { xs: "85%", sm: "100%", md: "100%" },
            position: { xs: "absolute", sm: "relative", md: "relative" },
            zIndex: 2,
          }}
        >
          <SideBar
            getFriend={getFriend}
            logout={value.logout}
            user={value.user}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

ChatRoom.propTypes = {};

export default ChatRoom;
