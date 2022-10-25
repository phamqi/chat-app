import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputBase, Skeleton } from "@mui/material";
import React, { memo, useState } from "react";
import {
  colorOuter,
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
  EmptySearchMsg,
  SearchNullMsg,
} from "../../../constants";
import CardItem from "../CardItem";

function Sibar({
  onSearch,
  loadingSearch,
  dataSearch,
  onAddFriend,
  rsData,
  friendList,
  selectFriend,
}) {
  const [search, setSearch] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const Search = () => {
    if (!search) {
      alert(`${EmptySearchMsg}`);
    } else {
      onSearch(search.toLowerCase());
      setSearchShow(true);
    }
  };
  const onEnter = (e) => {
    if (e.key == "Enter") {
      Search();
    }
  };
  const closeSearch = () => {
    rsData();
    setSearchShow(false);
    setSearch("");
  };
  const addFriend = (item) => {
    onAddFriend(item);
    closeSearch();
  };
  return (
    <Box sx={{ padding: "8px 16px" }}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "8px",
          backgroundColor: `${colorOuterActive}`,
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: `${colorTxtBlur}`,
          }}
          placeholder="Enter email..."
          inputProps={{ "aria-label": "search " }}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onEnter}
          value={search}
        />
        {searchShow ? (
          <Button
            type="button"
            sx={{
              p: "10px",
              color: `${colorTxtBlur}`,
              "&:hover": { color: `${colorTxt}` },
            }}
            aria-label="search"
            onClick={closeSearch}
          >
            <CloseIcon />
          </Button>
        ) : (
          <Button
            type="button"
            sx={{
              p: "10px",
              color: `${colorTxtBlur}`,
              "&:hover": { color: `${colorTxt}` },
            }}
            aria-label="search"
            onClick={Search}
          >
            <SearchIcon />
          </Button>
        )}
      </Box>
      <Box sx={{ display: `${searchShow ? "block" : "none"}` }}>
        {loadingSearch ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              backgroundColor: `${colorOuterActive}`,
              borderRadius: "8px",
              padding: "8px 0px 8px 8px",
              marginTop: "16px",
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", flex: 1, mx: 1 }}
            />
          </Box>
        ) : dataSearch && dataSearch.length > 0 ? (
          dataSearch.map((item) => {
            if (friendList && friendList.length > 0) {
              const index = friendList.findIndex(
                (el) => el[1].infor.uid === item.uid
              );
              if (index >= 0) {
                return (
                  <Box
                    key={item.uid}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      padding: "8px",
                      marginTop: "16px",
                      color: `${colorTxtBlur}`,
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: `${colorOuterActive}`,
                      },
                    }}
                    onClick={() => selectFriend(friendList[index])}
                  >
                    <CardItem
                      user={friendList[index][1].infor}
                      lastMessage={
                        friendList[index][1].lastMessage &&
                        friendList[index][1].lastMessage.message
                      }
                    />
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={item.uid}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      padding: "8px",
                      marginTop: "16px",
                      color: `${colorTxtBlur}`,
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: `${colorOuterActive}`,
                      },
                    }}
                  >
                    <CardItem user={item} />
                    <Button
                      type="button"
                      aria-label="add-friend"
                      onClick={() => addFriend(item)}
                      sx={{
                        minWidth: 0,
                        color: `${colorTxtBlur}`,
                        "&:hover": { color: `${colorTxt}` },
                      }}
                    >
                      <PersonAddIcon />
                    </Button>
                  </Box>
                );
              }
            } else {
              return (
                <Box
                  key={item.uid}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "8px",
                    padding: "8px",
                    marginTop: "16px",
                    color: `${colorTxtBlur}`,
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: `${colorOuterActive}`,
                    },
                  }}
                >
                  <CardItem user={item} />
                  <Button
                    type="button"
                    aria-label="add-friend"
                    onClick={() => addFriend(item)}
                    sx={{
                      minWidth: 0,
                      color: `${colorTxtBlur}`,
                      "&:hover": { color: `${colorTxt}` },
                    }}
                  >
                    <PersonAddIcon />
                  </Button>
                </Box>
              );
            }
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px",
              padding: "8px",
              marginTop: "16px",
              color: `${colorTxtBlur}`,
            }}
          >
            <h5
              style={{
                width: "100%",
                height: "40px",
                textAlign: "center",
                margin: 0,
              }}
            >
              {SearchNullMsg}
            </h5>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default memo(Sibar);
