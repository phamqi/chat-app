import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import { colorTxtBlur } from "../../../constants";

function EmptyFriend(props) {
  return (
    <Box
      sx={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "55%", sm: "40%", md: "30%" },
          aspectRatio: "2/1",
          justifyContent: "space-between",
          alignItems: "center",
          color: `${colorTxtBlur}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <AutoAwesomeOutlinedIcon
            sx={{
              height: "2rem",
              width: "2rem",
              color: `yellow`,
              marginTop: "auto",
            }}
          />
          <ModeCommentOutlinedIcon
            sx={{
              height: "5rem",
              width: "5rem",
              color: `${colorTxtBlur}`,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
          <AddReactionOutlinedIcon
            sx={{
              height: "2rem",
              width: "2rem",
              color: `green`,
              marginBottom: "auto",
            }}
          />
        </Box>
        <h5>Waiting on friends</h5>
      </Box>
    </Box>
  );
}

EmptyFriend.propTypes = {};

export default EmptyFriend;
