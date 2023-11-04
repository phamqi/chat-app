import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { db } from "../config";
import { startMessage } from "../../constants";

const addFriend = async (item, user) => {
  if (item) {
    const chatBoxId = uuidv4();
    try {
      await setDoc(doc(db, "chats", chatBoxId), {
        messages: [],
      });
      const res = await getDoc(doc(db, `friends/${user.uid}`));
      const resFriend = await getDoc(doc(db, `friends/${item.uid}`));

      if (res && resFriend) {
        await updateDoc(doc(db, `friends/${user.uid}`), {
          [item.uid]: {
            uid: item.uid,
            displayName: item.displayName,
            photoURL: item.photoURL,
            boxId: chatBoxId,
            lastMessage: {
              sendBy: item.uid,
              message: `${startMessage} ${item.displayName}`,
              sendAt: serverTimestamp(),
            },
          },
        });

        await updateDoc(doc(db, `friends/${item.uid}`), {
          [user.uid]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            boxId: chatBoxId,
            lastMessage: {
              sendBy: user.uid,
              message: `${startMessage} ${user.displayName}`,
              sendAt: serverTimestamp(),
            },
          },
        });
      }
    } catch (error) {}
  }
};

export default addFriend;
