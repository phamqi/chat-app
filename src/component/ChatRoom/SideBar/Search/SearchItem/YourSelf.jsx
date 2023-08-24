import React from "react";
import { Box } from "@mui/material";
import { colorOuterActive, colorTxtBlur } from "../../../../../constants";
import CardItem from "../../../CardItem";

export default function YourSelf({ item, onSelectFriend }) {
  const handleSelectFriend = () => {
    onSelectFriend({ id: item.uid, infor: item });
  };

  const convertInfor = { ...item, displayName: item.displayName + " (You)" };
  return (
    <Box
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
      onClick={handleSelectFriend}
    >
      <CardItem user={convertInfor} lastMessage={"Private message"} />
    </Box>
  );
}
