import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading({ color, width }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        sx={{ width: `${width}px`, aspectRatio: "1/1", color: `${color}` }}
      />
    </Box>
  );
}

Loading.propTypes = {};

export default Loading;
