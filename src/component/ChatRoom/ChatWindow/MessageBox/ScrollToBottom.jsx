import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";

import {
  colorBg,
  colorOuter,
  colorOuterActive,
  colorTxtBlur,
} from "../../../../constants";

function ScrollToBottom({ loading }) {
  const [scrollUp, setScrollUp] = useState(false);
  const ref = useRef();
  const scrollToBottom = () => {
    ref.current?.scrollIntoView();
    setScrollUp(false);
  };
  useEffect(() => {
    const onScroll = () => {
      const msgBox = document.querySelector("#msg_box");
      if (msgBox) {
        msgBox.addEventListener("wheel", function (e) {
          if (msgBox.scrollTop + 700 < msgBox.scrollHeight) {
            setScrollUp(true);
          } else {
            setScrollUp(false);
          }
        });
      }
    };
    return () => {
      onScroll();
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [loading]);
  return (
    <div>
      <Button
        onClick={scrollToBottom}
        type="button"
        sx={{
          minWidth: "0",
          position: "fixed",
          zIndex: "99999",
          bottom: "13rem",
          right: "2rem",
          color: `${colorTxtBlur}`,
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          display: `${scrollUp ? "flex" : "none"}`,
          padding: "0",
          backgroundColor: `${colorOuter}`,
          boxShadow: `0 0 1px  ${colorTxtBlur}`,
          "&:hover": {
            backgroundColor: `${colorBg}`,
          },
        }}
      >
        <ExpandMoreIcon />
      </Button>
      <div ref={ref}></div>
    </div>
  );
}

ScrollToBottom.propTypes = {};

export default memo(ScrollToBottom);
