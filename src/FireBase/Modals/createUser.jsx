import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import createKeyWords from "./createKeyWords";

const createUser = async (displayName, email, password, img) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const storageRef = ref(storage, displayName.trim() + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          Promise.all([
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            }),
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              searchName: createKeyWords(displayName),
              email,
              photoURL: downloadURL,
            }),
            await setDoc(doc(db, "friends", res.user.uid), {}),
            await setDoc(doc(db, "chats", res.user.uid), {
              messages: [],
            }),
          ]);
        });
      }
    );
  } catch (error) {}
};
export default createUser;
