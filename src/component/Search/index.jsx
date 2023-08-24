import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputBase } from "@mui/material";
import React, { memo, useState } from "react";
import {
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
  EmptySearchMsg,
} from "../../../../constants";
import CardItem from "../../CardItem";
import {
  Friend,
  NewFriend,
  NullSearch,
  SkeletonSearch,
  YourSelf,
} from "./SearchItem";
import { SearchUser, addFriend } from "../../../../FireBase";
import { useMemo } from "react";

function Sibar({ friendList, onSelectFriend, user }) {
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [searchShow, setSearchShow] = useState(false);

  const Search = async (search) => {
    setSearchShow(true);
    setSearch(search);
    const data = await SearchUser(search);
    setDataSearch(data);
    console.log("data in search", data, dataSearch);
  };

  const closeSearch = () => {
    setDataSearch([]);
    setSearchShow(false);
    setSearch("");
  };
  const handleAddFriend = (item) => {
    addFriend(item, user);
    closeSearch();
  };
  const handleSelectFriend = (friend) => {
    onSelectFriend(friend);
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
          dataSearch.length > 1 ? (
            dataSearch?.map((item) => (
              <NewFriend
                key={item.uid}
                item={item}
                addFriend={handleAddFriend}
              />
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
export default memo(Sibar);
