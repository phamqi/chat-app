import {
  getAdditionalUserInfo,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

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
                searchName: result.user.displayName.toLowerCase(),
                email: result.user.email,
                photoURL: result.user.photoURL,
              });
              await setDoc(doc(db, "userFriends", result.user.uid), {});
              await setDoc(
                doc(db, "chats", result.user.uid, "messages", result.user.uid),
                {
                  message: "Get started",
                  sendBy: "admin",
                  sendAt: serverTimestamp(),
                  hidden: false,
                }
              );
            }
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {});
}
