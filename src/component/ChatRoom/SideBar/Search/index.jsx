import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputBase } from "@mui/material";
import React, { Fragment, memo, useContext, useState } from "react";
import { AlertContext } from "../../../../AlertContext";
import { SearchUser, addFriend } from "../../../../FireBase";
import {
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
} from "../../../../constants";
import {
  Friend,
  NewFriend,
  NullSearch,
  SkeletonSearch,
  YourSelf,
} from "./SearchItem";

function Search({ friendList, onSelectFriend, user }) {
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [searchShow, setSearchShow] = useState(false);

  const handleAlert = useContext(AlertContext);
  const Search = async (search) => {
    setSearchShow(true);
    setSearch(search);
    const data = await SearchUser(search);
    setDataSearch(data);
  };
  const closeSearch = () => {
    setDataSearch([]);
    setSearchShow(false);
    setSearch("");
  };
  const AddFriend = (item) => {
    addFriend(item, user);
    closeSearch();
  };
  const onSelect = (item) => {
    try {
      if (item.uid === !user.uid) {
        const result = friendList.filter((i) => i.uid === item.uid);
        onSelectFriend(result[0]);
      } else {
        onSelectFriend(item);
      }
    } catch (error) {
      handleAlert("error", error.message);
    }
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
          onChange={(e) => Search(e.target.value)}
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
        {dataSearch ? (
          dataSearch.length > 0 ? (
            dataSearch?.map((item) => (
              <Fragment key={item.uid}>
                {item.uid === user?.uid ? (
                  <YourSelf item={item} onSelect={onSelect} />
                ) : friendList.find((i) => i.uid === item.uid) ? (
                  <Friend item={item} onSelect={onSelect} />
                ) : (
                  <NewFriend key={item.uid} item={item} addFriend={AddFriend} />
                )}
              </Fragment>
            ))
          ) : (
            <NullSearch />
          )
        ) : (
          <SkeletonSearch />
        )}
      </Box>
    </Box>
  );
}
export default memo(Search);
