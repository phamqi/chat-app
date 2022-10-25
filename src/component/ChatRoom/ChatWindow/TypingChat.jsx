import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import React, { useRef, useState } from "react";
import {
  colorOnBg,
  colorOuter,
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
} from "../../../constants";

function ChatWindow({ sendText, sendImg }) {
  const [text, setText] = useState("");
  const img = useRef();
  const sendMessage = () => {
    if (text) {
      sendText(text);
    }
    if (img.current.files[0]) {
      sendImg(text, img.current.files[0]);
    }
    setText("");
    img.current.value = null;
  };
  const keyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        padding: "0.5rem 0.8rem",
        borderTop: `3px solid ${colorOuter}`,
      }}
    >
      <label
        htmlFor="img"
        style={{
          padding: "8px",
          boxSizing: "border-box",
          height: "calc(1.75rem + 2px + 0.7rem )",
          aspectRatio: "1/1",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${colorOuterActive}`,
          marginRight: "5px",
          color: `${colorTxtBlur}`,
          cursor: "pointer",
        }}
      >
        <AddAPhotoIcon sx={{ fontSize: "0.9rem" }} />
      </label>
      <input ref={img} id="img" type="file" style={{ display: "none" }} />
      <input
        style={{
          flex: 1,
          color: `${colorTxt}`,
          border: " none",
          outline: "none",
          backgroundColor: `${colorOuterActive}`,
          padding: "0.35rem 0.8rem",
          borderRadius: "1.2rem",
          fontSize: "1rem",
          boxSizing: "border-box",
          lineHeight: "1.75",
          width: "100%",
        }}
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={keyDown}
      />
      <button
        style={{
          padding: "8px",
          boxSizing: "border-box",
          height: "calc(1.75rem + 2px + 0.7rem )",
          aspectRatio: "1/1",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${colorOuterActive}`,
          marginLeft: "5px",
          border: "none",
          color: `${colorTxtBlur}`,
          cursor: "pointer",
        }}
        onClick={sendMessage}
      >
        <SendIcon sx={{ transform: "translateX(0.2rem)" }} />
      </button>
    </Box>
  );
}
ChatWindow.propTypes = {};
export default ChatWindow;
