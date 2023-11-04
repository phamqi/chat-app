import React from "react";
import { Box } from "@mui/material";
import { colorOuterActive, colorTxtBlur } from "../../../../../constants";
import CardItem from "../../../CardItem";

export default function YourSelf({ item, onSelect }) {
  const convertInfo = { ...item, displayName: item.displayName + " (You)" };
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
      <CardItem item={convertInfo} />
    </Box>
  );
}
