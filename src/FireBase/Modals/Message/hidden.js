import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../config";

const hidden = async (boxChatId, message) => {
  try {
    const ref = doc(db, "chats", boxChatId);

    await updateDoc(ref, {
      messages: arrayRemove(message),
    });
  } catch (error) {}
};

export default hidden;
