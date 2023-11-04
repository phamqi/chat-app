import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button } from "@mui/material";
import React from "react";
import {
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
} from "../../../../../constants";
import CardItem from "../../../CardItem";

function NewFriend({ item, addFriend }) {
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
      <CardItem item={item} />
      <Button
        type="button"
        aria-label="add-friend"
        onClick={() => {
          addFriend(item);
        }}
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

NewFriend.propTypes = {};

export default NewFriend;
