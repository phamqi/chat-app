import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {
  colorBg,
  colorDelete,
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
    e.target.value = null;
  };
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const sendMessage = () => {
    if (img) {
      if (ref.current) {
        const WIDTH = ref.current.naturalWidth;
        const HEIGHT = ref.current.naturalHeight;
        const encoder = 0;
        let canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        let cx = canvas.getContext("2d");
        cx.drawImage(ref.current, 0, 0, WIDTH, HEIGHT);
        const new_img = canvas.toDataURL("image/jpg", encoder);
        const file = urlToFile(new_img);
        sendTextAndImg(text, file, img);
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
  const urlToFile = (url) => {
    let arr = url.split(",");
    const mine = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];
    let dataString = atob(data);
    let n = dataString.length;
    let dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataString.charCodeAt(n);
    }
    const file = new File([dataArr], "avatar.jpg", { type: mine });
    return file;
  };
  return (
    <Box sx={{ padding: "16px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: `${colorOuterActive}`,
          borderRadius: "8px",
        }}
      >
        {img && (
          <Box
            sx={{
              backgroundColor: "transparent",
              borderBottom: `1px #9ea1a557 solid`,
              padding: "16px",
            }}
          >
            <Box
              sx={{
                backgroundColor: `${colorBg}`,
                padding: "8px",
                borderRadius: "4px",
                width: "fit-content",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: `${colorOuter}`,
                  width: "fit-content",
                  transform: "translate(7.5rem, -1rem)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: `1px  ${colorOuter} solid `,
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    padding: "4px",
                    "&:hover": {
                      backgroundColor: `${colorOuterActive}`,
                    },
                  }}
                >
                  <label
                    htmlFor="img"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <CreateOutlinedIcon sx={{ color: `${colorTxtBlur}` }} />
                  </label>
                </Box>
                <Box
                  sx={{
                    padding: "4px",
                    "&:hover": {
                      backgroundColor: `${colorOuterActive}`,
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    setImg(null);
                  }}
                >
                  <CloseIcon sx={{ color: `${colorDelete}` }} />
                </Box>
              </Box>
              <img
                ref={ref}
                id="img_img"
                style={{ width: "10rem", height: "auto", borderRadius: "4px" }}
                src={preview}
                alt="img"
              />
              <Box
                sx={{
                  color: `${colorTxt}`,
                  margin: "0.5rem 0",
                  width: "10rem",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  lineHeight: "1.125rem",
                  fontSize: "0.8rem",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                }}
              >
                {img.name}
              </Box>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
          }}
        >
          <label
            htmlFor="img"
            style={{
              padding: "8px",
              boxSizing: "border-box",
              height: "calc(1.75rem + 2px + 0.7rem )",
              aspectRatio: "1/1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              color: `${colorTxtBlur}`,
              cursor: "pointer",
            }}
          >
            <AddAPhotoIcon sx={{ fontSize: "0.9rem" }} />
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
              backgroundColor: "transparent",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              color: `${colorTxtBlur}`,
              cursor: "pointer",
            }}
            onClick={sendMessage}
          >
            <SendIcon sx={{ transform: "translateX(0.2rem)" }} />
          </button>
        </Box>
      </Box>
    </Box>
  );
}
ChatWindow.propTypes = {};
export default ChatWindow;
