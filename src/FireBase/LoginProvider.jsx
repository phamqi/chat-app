import {
  getAdditionalUserInfo,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./config";
import createKeyWords from "./Modals/createKeyWords";

export default function LoginProvider(provider) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          if (result.user) {
            const { isNewUser } = getAdditionalUserInfo(result);
            if (isNewUser) {
              await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                displayName: result.user.displayName,
                searchName: createKeyWords(result.user.displayName),
                email: result.user.email,
                photoURL: result.user.photoURL,
              });
              await setDoc(doc(db, "friends", result.user.uid), {});
              await setDoc(doc(db, "chats", result.user.uid), {
                messages: [],
              });
            }
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {});
}
