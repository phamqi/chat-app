import { Box } from "@mui/system";
import React from "react";

function Wall({ text, bgColor, txtColor }) {
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        borderTop: `1px solid ${txtColor}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1",
        heitgh: "0",
        marginTop: "0.7rem",
        marginBottom: "0.5rem",
        opacity: 0.8,
      }}
    >
      <span
        style={{
          padding: "2px 4px",
          backgroundColor: `${bgColor}`,
          color: `${txtColor}`,
          borderRadius: "8px",
          fontSize: "0.8rem",
          marginTop: "-0.8rem",
        }}
      >
        {text}
      </span>
    </Box>
  );
}

Wall.propTypes = {};

export default Wall;
