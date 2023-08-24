import { Box } from "@mui/material";
import React from "react";
import { colorOuterActive, colorTxtBlur } from "../../../../../constants";
import CardItem from "../../../CardItem";
function Friend({ infor, id, lastMessage, onSelectFriend }) {
  const handleSelectFriend = () => {
    onSelectFriend({ id: id, infor: infor });
  };
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
      <CardItem user={infor} lastMessage={lastMessage} />
    </Box>
  );
}

Friend.propTypes = {};

export default Friend;
