import { Avatar, Box } from "@mui/material";
import React, { memo } from "react";

function Card({ item, lastMessage }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Avatar
        src={item?.photoURL}
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
          {item?.displayName}
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
          {lastMessage
            ? lastMessage.sendBy === item.uid
              ? lastMessage.message
              : `Bạn: ${lastMessage.message}`
            : "Private message"}
        </p>
      </Box>
    </Box>
  );
}
export default memo(Card);
