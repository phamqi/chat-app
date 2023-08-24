import { Box } from "@mui/system";
import {
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { colorInner, colorOuter, colorTxtBlur } from "../../../constants";
import { AuthContext } from "../../../Context";
import { db, storage } from "../../../FireBase/config";
import Loading from "../../Loading";
import CardItem from "../CardItem";
import DialogImg from "./DialogImg";
import EmptyFriendSelect from "./EmptyFriendSelect";
import MessageBox from "./MessageBox";
import TypingChat from "./TypingChat";

function ChatWindow({ friend }) {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const sendText = async (text) => {
    try {
      const id = "messsage" + Date.now();
      await setDoc(doc(db, `chats/${friend.id}/messages`, id), {
        id: id,
        message: text,
        sendBy: user.uid,
        sendAt: serverTimestamp(),
        hidden: false,
      });
      await updateDoc(doc(db, "userFriends", friend.infor.uid), {
        [friend.id + ".lastMessage"]: {
          sendBy: user.uid,
          message: text,
          date: serverTimestamp(),
        },
      });
      await updateDoc(doc(db, "userFriends", user.uid), {
        [friend.id + ".lastMessage"]: {
          sendBy: user.uid,
          message: text,
          date: serverTimestamp(),
        },
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const sendTextAndImg = async (PlaceholderImg, img, text) => {
    try {
      setLoading(true);
      const id = "messsage" + Date.now();
      const PlaceholderStorageRef = ref(storage, uuid());
      const storageRef = ref(storage, uuid());
      uploadBytesResumable(PlaceholderStorageRef, PlaceholderImg).then(() => {
        getDownloadURL(PlaceholderStorageRef).then(async (PlaceholderURL) => {
          await setDoc(doc(db, "chats", friend.id, "messages", id), {
            id: id,
            message: text,
            sendBy: user.uid,
            sendAt: serverTimestamp(),
            hidden: false,
            img: {
              low: PlaceholderURL,
              hight: "",
            },
          });
          setLoading(false);
        });
      });
      uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", friend.id, "messages", id), {
            "img.hight": downloadURL,
          });
        });
      });
      await updateDoc(doc(db, "userFriends", friend.infor.uid), {
        [friend.id + ".lastMessage"]: {
          message: "Image ",
          date: serverTimestamp(),
        },
      });
      await updateDoc(doc(db, "userFriends", user.uid), {
        [friend.id + ".lastMessage"]: {
          message: "Image ",
          date: serverTimestamp(),
        },
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const onHiddenMessage = async (id) => {
    try {
      await updateDoc(doc(db, "chats", friend.id, "messages", id), {
        hidden: true,
      });
    } catch (error) {}
  };
  useEffect(() => {
    const getMessage = () => {
      onSnapshot(
        query(collection(db, `chats/${friend.id}/messages`), limit(30)),
        where("id", "=", friend.id),
        (snapshot) => {
          setMessage(
            snapshot.docs.map((doc) => {
              return { ...doc.data() };
            })
          );
        }
      );
    };
    friend && getMessage();
  }, [friend, message]);
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
              <CardItem user={friend.infor} />
            </Box>
            <MessageBox
              message={message}
              friend={friend.infor}
              onHiddenMessage={onHiddenMessage}
            />
            <TypingChat sendText={sendText} sendTextAndImg={sendTextAndImg} />
            <DialogImg />
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
