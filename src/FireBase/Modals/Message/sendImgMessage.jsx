import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { db, storage } from "../../config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const sendIMG = async (boxChatId, uid, text, PlaceholderImg, img) => {
  const id = "message" + Date.now();
  const docRef = doc(db, "chats", boxChatId);

  let time;
  const PlaceholderStorageRef = ref(storage, uuidv4());
  const storageRef = ref(storage, uuidv4());
  uploadBytesResumable(PlaceholderStorageRef, PlaceholderImg).then(() => {
    getDownloadURL(PlaceholderStorageRef).then(async (PlaceholderURL) => {
      time = Timestamp.now();
      await updateDoc(docRef, {
        messages: arrayUnion({
          id: id,
          message: text,
          img: {
            low: PlaceholderURL,
            hight: "",
          },
          sendBy: uid,
          sendAt: time,
        }),
      });
      uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(docRef, {
            messages: arrayRemove({
              id: id,
              message: text,
              img: {
                low: PlaceholderURL,
                hight: "",
              },
              sendBy: uid,
              sendAt: time,
            }),
          });
          await updateDoc(docRef, {
            messages: arrayUnion({
              id: id,
              message: text,
              img: {
                low: PlaceholderURL,
                hight: downloadURL,
              },
              sendBy: uid,
              sendAt: time,
            }),
          });
        });
      });
    });
  });
};
export default sendIMG;
