import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../config";

const updateLastMessage = async (friendUid, uid, text) => {
  await updateDoc(doc(db, "friends", uid), {
    [friendUid + ".lastMessage"]: {
      message: text,
      sendAt: Timestamp.now(),
    },
  });
  await updateDoc(doc(db, "friends", friendUid), {
    [uid + ".lastMessage"]: {
      message: text,
      sendAt: Timestamp.now(),
    },
  });
};

export default updateLastMessage;

// await updateDoc(doc(db, "userFriends", friend.infor.uid), {
//   [friend.id + ".lastMessage"]: {
//     message: "Image ",
//     date: serverTimestamp(),
//   },
// });
// await updateDoc(doc(db, "userFriends", user.uid), {
//   [friend.id + ".lastMessage"]: {
//     message: "Image ",
//     date: serverTimestamp(),
//   },
// });
