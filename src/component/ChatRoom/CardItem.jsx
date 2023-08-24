import { Avatar, Box } from "@mui/material";
import React, { memo } from "react";

function Card({ user, lastMessage }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Avatar
        src={user && user.photoURL}
        alt="avatar"
        sx={{ height: "50px", width: "50px" }}
      ></Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: "0 0.5rem",
          height: "50px",
        }}
      >
        <span style={{ fontSize: "1rem", fontWeight: 500 }}>
          {user && user.displayName}
        </span>
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            userSelect: "none",
            wordWrap: "break-word",
            whiteSpace: "normal",
            overflow: "hidden",
            display: "-webkit-box",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            lineHeight: 1.2,
            height: "1.2rem",
          }}
        >
          {/* {lastMessage
            ? lastMessage && lastMessage.sendBy
              ? lastMessage.sendBy === user.uid
                ? lastMessage.message
                : `You: ` + lastMessage.message
              : lastMessage.message
            : ""} */}
        </p>
      </Box>
    </Box>
  );
}
export default memo(Card);
