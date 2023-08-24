import { Box, Skeleton } from "@mui/material";
import React from "react";
import { colorOuterActive } from "../../../../../constants";
export default function SkeletonSearch() {
  return (
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
      <Skeleton variant="text" sx={{ fontSize: "1rem", flex: 1, mx: 1 }} />
    </Box>
  );
}
