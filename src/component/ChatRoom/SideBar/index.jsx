import { Box } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { memo, useContext, useEffect, useState } from "react";

import { AlertContext } from "../../../AlertContext";
import { addFriend } from "../../../FireBase";
import { db } from "../../../FireBase/config";
import { colorOuter, colorTxtBlur } from "../../../constants";
import Wall from "../Wall";
import ListFriend from "./ListFriend";
import Search from "./Search";
import UserInfo from "./UserInfo";

function Sidebar({ getFriend, user, logout }) {
  const handleAlert = useContext(AlertContext);
  const [friendList, setFriendList] = useState([]);
  const [loadingFriend, setLoadingFriend] = useState(true);

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    const clean = async () => {
      try {
        onSnapshot(doc(db, "friends", user.uid), (doc) => {
          if (doc.data() !== undefined) {
            const data = Object.values(doc.data());
            setFriendList(data);
            setLoadingFriend(false);
          } else {
            setLoadingFriend(false);
          }
        });
      } catch (error) {
        handleAlert("error", error.message);
      }
    };
    return () => {
      user && clean();
    };
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
        {user && (
          <>
            <Box
              sx={{
                cursor: "pointer",
                position: "sticky",
                top: 0,
                backgroundColor: `${colorOuter}`,
                zIndex: 1,
              }}
            >
              <UserInfo user={user} handleLogout={handleLogout} />
            </Box>

            <Wall
              text={"Search"}
              bgColor={colorOuter}
              txtColor={colorTxtBlur}
            />
            <Search
              onAddFriend={addFriend}
              friendList={friendList && friendList}
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
              user={user}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
export default memo(Sidebar);
