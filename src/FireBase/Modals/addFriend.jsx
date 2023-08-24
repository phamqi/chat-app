import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

const addFriend = async (item, user) => {
  if (item) {
    try {
      const res = await getDoc(doc(db, `chats/${user.uid}`));
      const resFriend = await getDoc(doc(db, `chats/${item.uid}`));
      if (res.exists()) {
        await updateDoc(doc(db, `chats/${user.uid}`), {
          [item.uid]: {
            uid: item.uid,
            displayName: item.displayName,
            photoURL: item.photoURL,
            lastMessage: {
              sendBy: user.uid,
              message: "hello",
              date: serverTimestamp(),
            },
          },
        });
        await updateDoc(doc(db, `chats/${item.uid}`), {
          [user.uid]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastMessage: {
              sendBy: user.uid,
              message: "hello",
              date: serverTimestamp(),
            },
          },
        });
      } else {
        await setDoc(doc(db, `chats/${user.uid}`), {
          [item.uid]: {
            uid: item.uid,
            displayName: item.displayName,
            photoURL: item.photoURL,
            lastMessage: {
              sendBy: user.uid,
              message: "hello",
              date: serverTimestamp(),
            },
          },
        });
        if (resFriend) {
          await updateDoc(doc(db, `chats/${item.uid}`), {
            [user.uid]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              lastMessage: {
                sendBy: user.uid,
                message: "hello",
                date: serverTimestamp(),
              },
            },
          });
        } else {
          await setDoc(doc(db, `chats/${item.uid}`), {
            [user.uid]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              lastMessage: {
                sendBy: user.uid,
                message: "hello",
                date: serverTimestamp(),
              },
            },
          });
        }
      }
    } catch (error) {
      console.log("add friend", error);
    }
  }
};

export default addFriend;
