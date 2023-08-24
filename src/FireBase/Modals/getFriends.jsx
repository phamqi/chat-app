import { doc, getDoc } from "firebase/firestore";

import { db } from "../config";

const getFriends = async (uid) => {
  const docRef = doc(db, "chats", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Object.values(docSnap.data());
  }
};
export default getFriends;
