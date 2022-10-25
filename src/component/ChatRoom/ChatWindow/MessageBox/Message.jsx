import { Avatar, Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { colorOuterActive } from "../../../../constants";

Message.propTypes = {};

function Message({ item, className, photoURL, reverse = false }) {
  return (
    <Box
      className={className}
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        flexDirection: `${reverse ? "row-reverse" : "row"}`,
        padding: "5px",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: `${colorOuterActive}`,
        },
      }}
    >
      {item.img ? (
        <>
          <Avatar
            className="avatar"
            src={photoURL}
            sx={{ width: "2rem", height: "2rem", opacity: 1 }}
          />
          <Box
            sx={{
              width: "50%",
              padding: "8px",
              borderRadius: "8px 0px 8px 8px ",
              overflow: "hidden",
            }}
          >
            <img style={{ width: "100%" }} src={`${item.img}`} alt="img" />
            {item.text}
          </Box>
        </>
      ) : (
        <>
          <Avatar
            className="avatar"
            src={photoURL}
            sx={{ width: "2rem", height: "2rem", opacity: 0 }}
          />
          <Box
            sx={{
              padding: "0 8px",
              borderRadius: "8px 0px 8px 8px ",
            }}
          >
            {item.text}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Message;
