import { Box } from "@mui/material";
import React from "react";
import { colorOuterActive, colorTxtBlur } from "../../../../../constants";
import CardItem from "../../../CardItem";
function Friend({ item, onSelect }) {
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
      onClick={() => {
        onSelect(item);
      }}
    >
      <CardItem item={item} />
    </Box>
  );
}

Friend.propTypes = {};

export default Friend;
