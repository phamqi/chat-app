import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { debugErrorMap, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdW3v631QYuZgcfcyTu9DJaBZx_ER5Ptg",
  authDomain: "chat-app-6a513.firebaseapp.com",
  projectId: "chat-app-6a513",
  storageBucket: "chat-app-6a513.appspot.com",
  messagingSenderId: "556615991852",
  appId: "1:556615991852:web:9a47d1202f36e87aa04789",
  measurementId: "G-Z0VTPN82SG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app, { errorMap: debugErrorMap });
const storage = getStorage(app);
export { app, analytics, db, auth, storage };
