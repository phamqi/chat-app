import { Box } from "@mui/material";
import React from "react";
import { colorTxtBlur, SearchNullMsg } from "../../../../../constants";

export default function NullSearch() {
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
  );
}
