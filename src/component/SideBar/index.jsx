import CloseIcon from "@mui/icons-material/Close";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { Avatar, Box } from "@mui/material";
import { getAuth, signOut, updatePassword } from "firebase/auth";
import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addFriend, getFriends } from "../../../FireBase";
import { auth } from "../../../FireBase/config";
import { colorOuter, colorTxtBlur } from "../../../constants";
import Wall from "../Wall";
import ListFriend from "./ListFriend";
import Search from "./Search";
import UserInfo from "./UserInfo";

function Sibar({ getFriend, user }) {
  const navigate = useNavigate();
  const [dataSearch, setDataSearch] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [loadingFriend, setLoadingFriend] = useState(true);
  const [loadingUpdatePsw, setLoadingUpdatePsw] = useState(false);
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
    if (user) {
      const friends = getFriends(user.uid);
      setFriendList(friends);
      setLoadingFriend(false);
      console.log("alo", friends);
    }
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
          loadingSearch={loadingSearch}
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
        <ListFriend
          friendList={friendList}
          selectFriend={selectFriend}
          loading={loadingFriend}
        />
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
export default memo(Sibar);
