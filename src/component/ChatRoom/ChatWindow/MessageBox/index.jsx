import { format } from "date-fns";
import { doc, limit, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, {
  Fragment,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box } from "@mui/material";
import { AuthContext } from "../../../../Context";
import { hidden } from "../../../../FireBase";
import { db } from "../../../../FireBase/config";
import { colorInner, colorTxtBlur } from "../../../../constants";
import Wall from "../../Wall";
import Message from "./Message";
import ScrollToBottom from "./ScrollToBottom";
import createStyle from "./createStyles";
import DialogImg from "../DialogImg";

function MessageBox({ message, friend }) {
  const { user } = useContext(AuthContext);
  const [showDialog, setShowDialog] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const classesUser = `${"classes_" + user.uid.substring(5, 15)}`;
  const classesFriend = `${"classes_" + friend?.uid.substring(5, 15)}`;

  useMemo(() => {
    if (friend?.uid !== user.uid) {
      createStyle(classesUser, classesFriend);
    }
  }, [classesUser, classesFriend]);
  const hiddenMessage = (item) => {
    hidden(friend.boxId, item);
  };
  const formatDate = (seconds) => {
    const date = format(new Date(seconds * 1000), "dd-MM-yyyy").split("-");
    const result = `${date[0]} tháng ${date[1]} năm ${date[2]}`;
    return result;
  };
  const date = (seconds, index) => {
    if (index === 0) {
      const result = formatDate(seconds);
      return (
        <Wall text={result} bgColor={colorInner} txtColor={colorTxtBlur} />
      );
    }
    if (
      index > 0 &&
      Math.floor(seconds / 100000) !==
        Math.floor(message[index - 1].sendAt.seconds / 100000)
    ) {
      const result = formatDate(seconds);
      return (
        <Wall text={result} bgColor={colorInner} txtColor={colorTxtBlur} />
      );
    } else {
      return "";
    }
  };
  const onShowDialog = (item) => {
    setShowDialog(true);
    setShowItem(item);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          overflowY: "scroll",
          overflowX: "hidden",
          overflowAnchor: "none",
          padding: "0",
          color: `${colorTxtBlur}`,
          boxSizing: "border-box",
        }}
        id="msg_box"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-end",
            position: "relative",
            overflowAnchor: "none",
            minHeight: "100%",
            WebkitBoxPack: "end",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              overflow: "hidden",
              margin: 0,
              padding: 0,
              border: 0,
            }}
          >
            {message.length > 0 &&
              Array.isArray(message) &&
              message.map((item, index) => (
                <Fragment key={item.id}>
                  {date(item?.sendAt?.seconds, index)}
                  {item.sendBy === user.uid ? (
                    <Message
                      item={item}
                      photoURL={user.photoURL}
                      displayName={user.displayName}
                      reverse={true}
                      className={classesUser}
                      hiddenMessage={hiddenMessage}
                      handleShowDialog={onShowDialog}
                    />
                  ) : (
                    <Message
                      item={item}
                      photoURL={friend.photoURL}
                      displayName={friend.displayName}
                      className={classesFriend}
                      handleShowDialog={onShowDialog}
                    />
                  )}
                </Fragment>
              ))}
          </ul>
          <ScrollToBottom loading={message} />
        </Box>
      </Box>
      <DialogImg
        item={showItem}
        showDialog={showDialog}
        closeDialog={closeDialog}
      />
    </Box>
  );
}

MessageBox.propTypes = {};

export default memo(MessageBox);
