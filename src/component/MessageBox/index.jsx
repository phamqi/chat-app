import { formatISO, formatRelative, fromUnixTime } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  memo,
  useState,
} from "react";

import { colorInner, colorOuter, colorTxtBlur } from "../../../../constants";
import { AuthContext } from "../../../../Context";
import { db } from "../../../../FireBase/config";
import Wall from "../../Wall";
import Message from "./Message";
import ScrollToBottom from "./ScrollToBottom";
import { Box } from "@mui/material";

function MessageBox({ message, friend, onHiddenMessage }) {
  console.log("message in Message Box", message);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
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
  useMemo(() => {
    createStyle();
  }, [friend]);
  const hiddenMessage = (id) => {
    onHiddenMessage(id);
  };
  const date = (seconds, index) => {
    if (index === 0) {
      const date = formatISO(new Date(seconds * 1000), {
        representation: "date",
      });
      return <Wall text={date} bgColor={colorInner} txtColor={colorTxtBlur} />;
    }
    if (
      index > 0 &&
      Math.floor(seconds / 100000) !==
        Math.floor(message[index - 1].sendAt.seconds / 100000)
    ) {
      const date = formatISO(new Date(seconds * 1000), {
        representation: "date",
      });
      return <Wall text={date} bgColor={colorInner} txtColor={colorTxtBlur} />;
    } else {
      return "";
    }
  };
  return (
    <Box
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        flex: 1,
        position: "relative",
      }}
    >
      <ScrollToBottom loading={message} />
      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          padding: "0 0.8rem",
          color: `${colorTxtBlur}`,
        }}
        id="msg_box"
      >
        {message &&
          Array.isArray(message) &&
          message.map((index, item) => (
            <>
              {date(item.sendAt.seconds, index)}
              {item.sendBy === user.uid ? (
                <Message
                  key={item.id}
                  item={item}
                  photoURL={user.photoURL}
                  reverse={true}
                  className={subUserUId}
                  hiddenMessage={hiddenMessage}
                />
              ) : (
                <Message
                  key={item.id}
                  item={item}
                  photoURL={friend.photoURL}
                  className={subFriendUId}
                />
              )}
            </>
          ))}
      </Box>
    </Box>
  );
}

MessageBox.propTypes = {};

export default memo(MessageBox);
