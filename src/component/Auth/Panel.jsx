import { Box, Button } from "@mui/material";
import React from "react";

export default function Panel({ onCLick, text }) {
  return (
    <Box
      sx={{
        flex: "1",
        height: "100%",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "space-between", sm: "center" },
          alignItems: "center",
          height: "100%",
          padding: { xs: "0 16px", sm: "1.5rem" },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "25vh", sm: "fit-content" },
          }}
        >
          <h1>{text.h1}</h1>
        </Box>

        <Box
          sx={{
            flexShrink: "0",
            height: { xs: "25vh", sm: "fit-content" },
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            " > p": {
              textAlign: "center",
            },
          }}
        >
          <p>{text.p}</p>
          <Button
            onClick={onCLick}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.875",
              lineHight: "1.75",
              padding: "5px 15px",
              textTransform: "uppercase",
              width: "8rem",
              fontWeight: "500",
              color: "#fff",
              cursor: "pointer",
              margin: "1.5rem 0",
              backgroundColor: "transparent",
              border: "2px solid  #fff",
              borderRadius: "8px",
              "&:hover": {
                color: "#333",
                backgroundColor: "#fff",
              },
            }}
          >
            {text.btn}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
