import { Box } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colorOuter, colorTxtBlur } from "../../../constants";
import { db } from "../../../FireBase/config";
import Wall from "../Wall";
import ListFriend from "./ListFriend";
import Search from "./Search";
import UserInfo from "./UserInfo";

function Sibar({ getFriend, user }) {
  const navaigate = useNavigate();
  const [dataSearch, setDataSearch] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [loadingFriend, setLoadingFriend] = useState(true);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navaigate("/login");
      })
      .catch((error) => {
        console.log("sibar err", error);
      });
  };
  const rsData = () => {
    setDataSearch([]);
    setLoadingSearch(true);
  };
  const handleSearch = async (search) => {
    try {
      const q = query(
        collection(db, "users"),
        where("searchName", "==", search)
      );
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDataSearch(data);
      setLoadingSearch(false);
    } catch (error) {}
  };
  const addFriend = async (item) => {
    const id = user.uid + item.uid;
    try {
      const res = await getDoc(doc(db, "chats", id));
      if (!res.exists()) {
        Promise.all([
          await setDoc(doc(db, "chats", id), { message: [] }),
          await updateDoc(doc(db, "userFriends", user.uid), {
            [id + ".infor"]: {
              uid: item.uid,
              displayName: item.displayName,
              photoURL: item.photoURL,
            },
            [id + ".lastMessage"]: {
              message: "",
              date: serverTimestamp(),
            },
          }),
          await updateDoc(doc(db, "userFriends", item.uid), {
            [id + ".infor"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [id + ".lastMessage"]: {
              message: "",
              date: serverTimestamp(),
            },
          }),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getFriends = () => {
      const clean = onSnapshot(doc(db, "userFriends", user.uid), (doc) => {
        setFriendList(doc.data());
        setLoadingFriend(false);
      });
      return () => {
        clean();
      };
    };
    user && getFriends();
  }, [user]);
  const selectFriend = (item) => {
    getFriend(item);
  };

  return (
    <Box
      sx={{
        backgroundColor: `${colorOuter}`,
        borderRadius: "8px",
        height: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <UserInfo user={user} handleLogout={handleLogout} />
      <Wall text={"Search"} bgColor={colorOuter} txtColor={colorTxtBlur} />
      <Search
        dataSearch={dataSearch}
        loadingSearch={loadingSearch}
        onSearch={handleSearch}
        onAddFriend={addFriend}
        rsData={rsData}
        friendList={friendList && Object.entries(friendList)}
        selectFriend={selectFriend}
      />
      <Wall text={"List friend"} bgColor={colorOuter} txtColor={colorTxtBlur} />
      <ListFriend
        friendList={friendList && Object.entries(friendList)}
        selectFriend={selectFriend}
        loading={loadingFriend}
      />
    </Box>
  );
}
export default memo(Sibar);
