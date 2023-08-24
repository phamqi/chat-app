import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import React, { memo, useEffect, useState } from "react";

import { colorOuter, colorTxtBlur } from "../../../../constants";

function ScrollToBottom({ loading, message }) {
  const [scrollUp, setScrollUp] = useState(false);
  const [msg, setMsg] = useState(null);
  const scrollToBottom = () => {
    msg.scroll({
      top: msg.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    setScrollUp(false);
  };
  useEffect(() => {
    if (msg) {
      scrollToBottom();
    }
    const onScoll = () => {
      const msgBox = document.querySelector("#msg_box");
      setMsg(msgBox);
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
    //
    return () => {
      onScoll();
    };
  }, [msg, loading, message]);
  return (
    <Button
      onClick={scrollToBottom}
      type="button"
      sx={{
        position: "absolute",
        zIndex: "99999",
        bottom: "9%",
        right: "9%",
        color: `${colorTxtBlur}`,
        minWidth: "35px",
        height: "35px",
        borderRadius: "50%",
        display: `${scrollUp ? "flex" : "none"}`,
        padding: "0",
        backgroundColor: `${colorOuter}`,
        boxShadow: `0 0 1px  ${colorTxtBlur}`,
      }}
    >
      <ExpandMoreIcon />
    </Button>
  );
}

ScrollToBottom.propTypes = {};

export default memo(ScrollToBottom);
