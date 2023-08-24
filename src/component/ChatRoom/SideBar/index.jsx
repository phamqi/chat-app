import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { Avatar, Box, Skeleton } from "@mui/material";
import { getAuth, signOut, updatePassword } from "firebase/auth";
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
import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { colorOuter, colorTxtBlur } from "../../../constants";
import { auth, db } from "../../../FireBase/config";
import Wall from "../Wall";
import ListFriend from "./ListFriend";
import Search from "./Search";
import UserInfo from "./UserInfo";
import { SearchUser, addFriend, getFriends } from "../../../FireBase";

function Sidebar({ getFriend, user }) {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState([]);
  const [loadingFriend, setLoadingFriend] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [edit, setEdit] = useState(true);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const clean = async () => {
      if (user) {
        const friends = await getFriends(user.uid);
        setFriendList(friends);
        console.log("friends", friends);
        setLoadingFriend(false);
      }
    };
    return () => {
      clean();
    };
  }, [user]);
  const selectFriend = (item) => {
    getFriend(item);
  };
  const show = () => {
    setShowInfo(true);
  };
  const input_display_name = useRef();
  const Edit = () => {
    if (input_display_name) {
      setEdit(false);
      input_display_name.current.focus();
    }
  };
  const SaveEdit = () => {
    if (input_display_name.current.value) {
      setEdit(true);
      const user = auth.currentUser;
      const newPassword = input_display_name.current.value;
      updatePassword(user, newPassword)
        .then(() => {
          setEdit(false);
        })
        .catch((error) => {
          console.log("update pws", error);
        });
    } else {
      alert("Please enter display name");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: `${colorOuter}`,
        borderRadius: "8px",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
        zIndex: 4,
      }}
    >
      <Box
        sx={{
          borderRadius: "8px",
          height: "100%",
          boxSizing: "border-box",
          overflowX: "hidden",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <div
          onClick={show}
          style={{
            cursor: "pointer",
            position: "sticky",
            top: 0,
            backgroundColor: `${colorOuter}`,
            zIndex: 1,
          }}
        >
          <UserInfo user={user} handleLogout={handleLogout} />
        </div>

        <Wall text={"Search"} bgColor={colorOuter} txtColor={colorTxtBlur} />
        <Search
          onAddFriend={addFriend}
          friendList={friendList && Object.entries(friendList)}
          onSelectFriend={selectFriend}
          user={user}
        />
        <Wall
          text={"List friend"}
          bgColor={colorOuter}
          txtColor={colorTxtBlur}
        />
        {/* <ListFriend
          friendList={friendList}
          selectFriend={selectFriend}
          loading={loadingFriend}
        /> */}
      </Box>
      {user && (
        <Box
          sx={{
            display: `${showInfo ? "flex" : "none"}`,
            width: "100%",
            borderRadius: "8px",
            height: "100%",
            boxSizing: "border-box",
            overflowX: "hidden",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0,
            animation: "show-info 0.7s linear",
            backgroundColor: `${colorOuter}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "20%",
                display: "flex",
                position: "relative",
                flexDirection: "column",
              }}
            >
              <CloseIcon
                sx={{
                  position: "absolute",
                  right: "0.25rem",
                  top: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowInfo(false)}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                  height: "auto",
                  backgourndImage: `url(${user.photoURL})`,
                  backgourndSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Avatar
                  src={user.photoURL}
                  sx={{
                    width: "4rem",
                    height: "4rem",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  position: "relative",
                  padding: "0.5rem",
                }}
              >
                <input
                  ref={input_display_name}
                  id="input_display_name"
                  placeholder="Display name"
                  style={{
                    width: "100%",
                    height: "fit-content",
                    fontSize: "1.2rem",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: `${colorTxtBlur}`,
                    border: "none",
                    cursor: `${edit ? "default" : "revert"}`,
                    padding: "2px 0px 2px 8px",
                    boxSizing: "border-box",
                  }}
                  value={user.displayName}
                  readOnly={edit}
                />
                <button
                  style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    color: `${colorTxtBlur}`,
                    cursor: "pointer",
                  }}
                >
                  {edit ? (
                    <CreateOutlinedIcon onClick={Edit} />
                  ) : (
                    <SaveAsOutlinedIcon onClick={SaveEdit} />
                  )}
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default memo(Sidebar);
