import { Box } from "@mui/system";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { colorInner, colorOuter, colorTxtBlur } from "../../../constants";
import { AuthContext } from "../../../Context";
import { db, storage } from "../../../FireBase/config";
import CardItem from "../CardItem";
import EmptyFriendSelect from "./EmptyFriendSelect";
import MessageBox from "./MessageBox";
import TypingChat from "./TypingChat";

function ChatWindow({ friend }) {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const sendText = async (text) => {
    try {
      await updateDoc(doc(db, "chats", friend[0]), {
        message: arrayUnion({
          id: uuid(),
          text: text,
          sendBy: user.uid,
          sendAt: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userFriends", friend[1].infor.uid), {
        [friend[0] + ".lastMessage"]: {
          sendBy: user.uid,
          message: text,
          date: serverTimestamp(),
        },
      });
      await updateDoc(doc(db, "userFriends", user.uid), {
        [friend[0] + ".lastMessage"]: {
          sendBy: user.uid,
          message: text,
          date: serverTimestamp(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const sendTextAndImg = async (text, img) => {
    try {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", friend[0]), {
              message: arrayUnion({
                id: uuid(),
                text: text,
                img: downloadURL,
                sendBy: user.uid,
                sendAt: Timestamp.now(),
              }),
            });
            await updateDoc(doc(db, "userFriends", friend[1].infor.uid), {
              [friend[0] + ".lastMessage"]: {
                message: "Image ",
                date: serverTimestamp(),
              },
            });
            await updateDoc(doc(db, "userFriends", user.uid), {
              [friend[0] + ".lastMessage"]: {
                message: "Image ",
                date: serverTimestamp(),
              },
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getMessage = () => {
      const clean = onSnapshot(doc(db, "chats", friend[0]), (doc) => {
        setMessage(doc.data().message);
      });
      return () => {
        clean();
      };
    };
    friend && getMessage();
  }, [friend]);
  return (
    <Box
      sx={{
        backgroundColor: `${colorInner}`,
        height: "100%",
        width: "100%",
        borderRadius: "8px",
        display: "flex",
      }}
    >
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
              <CardItem user={friend[1].infor} />
            </Box>
            <MessageBox message={message} friend={friend[1].infor} />
            <TypingChat sendText={sendText} sendImg={sendTextAndImg} />
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
