import { Avatar, Box, Button } from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  colorBg,
  colorOuter,
  colorOuterActive,
  colorTxtBlur,
} from "../../../../constants";
import { AuthContext } from "../../../../Context";
import Message from "./Message";

function MessageBox({ message, friend }) {
  const { user } = useContext(AuthContext);
  const [scrollUp, setScrollUp] = useState(false);
  const msgBox = useRef();
  const subUserUId = `${"classes_" + user.uid.substring(5, 15)}`;
  const subFriendUId = `${"classes_" + friend.uid.substring(5, 15)}`;

  const createStyle = () => {
    const style = document.createElement("style");
    style.textContent = `
      .${subUserUId}+.${subFriendUId} .avatar {
        opacity: 1;
      }
      .${subFriendUId}+.${subUserUId} .avatar  {
        opacity: 1;
      }
      .${subFriendUId}:first-child .avatar {
        opacity: 1;
      }
      .${subUserUId}:first-child .avatar {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  };
  const scrollToBottom = () => {
    msgBox.current.scroll({
      top: msgBox.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    setScrollUp(false);
  };
  useMemo(() => {
    createStyle();
  }, [friend]);
  useEffect(() => {
    scrollToBottom();
    const onScoll = () => {
      if (msgBox.current) {
        msgBox.current.addEventListener("wheel", function (e) {
          if (msgBox.current.scrollTop + 700 < msgBox.current.scrollHeight) {
            setScrollUp(true);
          } else {
            setScrollUp(false);
          }
        });
      }
    };
    return () => {
      onScoll();
    };
  }, [message]);
  return (
    <div
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        flex: 1,
        position: "relative",
      }}
    >
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
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          padding: "0 0.8rem",
          color: `${colorTxtBlur}`,
        }}
        ref={msgBox}
      >
        {message &&
          Array.isArray(message) &&
          message.map((item, index) =>
            item.sendBy === user.uid ? (
              <Message
                key={index}
                item={item}
                photoURL={user.photoURL}
                reverse={true}
                className={subUserUId}
              />
            ) : (
              <Message
                key={index}
                item={item}
                photoURL={friend.photoURL}
                className={subFriendUId}
              />
            )
          )}
      </div>
    </div>
  );
}

MessageBox.propTypes = {};

export default MessageBox;
