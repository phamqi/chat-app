import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "../../config";

const sendText = async (boxChatId, uid, text) => {
  const id = "message" + Date.now();
  const ref = doc(db, "chats", boxChatId);

  await updateDoc(ref, {
    messages: arrayUnion({
      id: id,
      message: text,
      sendBy: uid,
      sendAt: Timestamp.now(),
    }),
  });
};

export default sendText;
