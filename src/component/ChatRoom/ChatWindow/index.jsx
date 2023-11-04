import { Box } from "@mui/system";
import { doc, onSnapshot } from "firebase/firestore";

import React, { useEffect, useState } from "react";

import { sendIMG, sendText, updateLastMessage } from "../../../FireBase";
import { db } from "../../../FireBase/config";
import { colorInner, colorOuter, colorTxtBlur } from "../../../constants";
import Loading from "../../Loading";
import CardItem from "../CardItem";
import EmptyFriendSelect from "./EmptyFriendSelect";
import MessageBox from "./MessageBox";
import TypingChat from "./TypingChat";

import { query } from "firebase/database";

function ChatWindow({ friend, user }) {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const boxChatID = friend?.uid === user?.uid ? user?.uid : friend?.boxId;
  const sendTextAndImg = async (text, PlaceholderImg, img) => {
    setLoading(true);
    try {
      sendIMG(boxChatID, user.uid, text, PlaceholderImg, img);
      if (friend.uid !== user.uid) {
        updateLastMessage(friend.uid, user.uid, "Hình ảnh");
      }
      setLoading(false);
    } catch (error) {}
  };
  const sendTextMsg = (text) => {
    if (text) {
      try {
        sendText(boxChatID, user.uid, text);
        if (friend.uid !== user.uid) {
          updateLastMessage(friend.uid, user.uid, text);
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    const clean = async () => {
      const boxChatID = friend.uid === user.uid ? user.uid : friend.boxId;
      const q = query(doc(db, "chats", boxChatID));
      // const q = query(doc(db, "chats", friend.boxId), where("1", "==", "1"));
      onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.data() !== undefined) {
          setMessage(querySnapshot.data().messages);
        } else {
        }
      });
    };

    // const clean = async () => {
    //   onSnapshot(
    //     query(doc(db, "chats", friend.boxId), limit(10)),
    //     (snapshot) => {
    //       const messagesData = snapshot.docs.map((doc) => doc.data().message);
    //       console.log("snapshot.docs", snapshot);
    //       setMessage(messagesData)w;
    //     }
    //   );
    // };

    // const clean = async () => {
    //   onSnapshot(doc(db, "chats", friend.boxId), (doc) => {
    //     setMessage(doc.data().messages);
    //   });
    // };
    friend && clean();
  }, [friend]);
  return (
    <Box
      sx={{
        backgroundColor: `${colorInner}`,
        height: "100%",
        width: "100%",
        borderRadius: "8px",
        display: "flex",
        position: "relative",
      }}
    >
      {loading && <Loading color={colorTxtBlur} />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {friend ? (
          <>
            <Box
              sx={{
                color: `${colorTxtBlur}`,
                padding: "0.8rem",
                borderBottom: `3px solid ${colorOuter}`,
              }}
            >
              <CardItem item={friend} />
            </Box>
            <MessageBox message={message} friend={friend} />
            <TypingChat
              sendTextAndImg={sendTextAndImg}
              sendText={sendTextMsg}
            />
          </>
        ) : (
          <EmptyFriendSelect />
        )}
      </Box>
    </Box>
  );
}

ChatWindow.propTypes = {};

export default ChatWindow;
