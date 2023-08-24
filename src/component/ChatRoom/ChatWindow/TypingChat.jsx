import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {
  colorOuter,
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
} from "../../../constants";

function ChatWindow({ sendText, sendTextAndImg }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();
  const ref = useRef();
  const onChangeImg = (e) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setImg(e.target.files[0]);
    setPreview(preview);
  };
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [img]);
  const sendMessage = () => {
    if (img) {
      if (ref.current) {
        const WIDTH = ref.current.naturalWidth;
        const HEIGHT = ref.current.naturalHeight;
        const encoder = 0.01;
        let canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        let cx = canvas.getContext("2d");
        cx.drawImage(ref.current, 0, 0, WIDTH, HEIGHT);
        const new_img = canvas.toDataURL("image/jpeg", encoder);
        const file = urlTofile(new_img);
        sendTextAndImg(file, img, text);
      }
    } else if (text) {
      sendText(text);
    }
    setText("");
    setImg(null);
  };
  const keyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const urlTofile = (url) => {
    let arr = url.split(",");
    const mine = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];
    let dataString = atob(data);
    let n = dataString.length;
    let dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataString.charCodeAt(n);
    }
    const file = new File([dataArr], "avatrt.jpg", { type: mine });
    return file;
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
        {img ? (
          <img
            ref={ref}
            id="img_img"
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            src={preview}
            alt="img"
          />
        ) : (
          <AddAPhotoIcon sx={{ fontSize: "0.9rem" }} />
        )}
      </label>
      <input
        id="img"
        type="file"
        style={{ display: "none" }}
        onChange={onChangeImg}
      />
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
