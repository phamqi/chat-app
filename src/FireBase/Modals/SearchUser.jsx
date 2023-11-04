import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../config";

const SearchUser = async (search) => {
  const q = query(
    collection(db, "users"),
    where("searchName", "array-contains", search)
  );
  let data = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      displayName: doc.data().displayName,
      photoURL: doc.data().photoURL,
      uid: doc.data().uid,
    });
  });
  return data;
};
export default SearchUser;
