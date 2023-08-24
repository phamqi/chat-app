import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button } from "@mui/material";
import React, { memo } from "react";

import { colorTxt, colorTxtBlur } from "../../../constants";
import CardItem from "../CardItem";
function UserInfo({ handleLogout, user }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px ",
        borderRadius: "8px 8px 0 0",
        boxSizing: "border-box",
        color: `${colorTxtBlur}`,
      }}
    >
      <CardItem user={user} />
      <Box>
        <Button
          onClick={handleLogout}
          sx={{
            minWidth: 0,
            color: `${colorTxtBlur}`,
            "&:hover": { color: `${colorTxt}` },
          }}
        >
          <LogoutIcon />
        </Button>
      </Box>
    </Box>
  );
}
export default memo(UserInfo);
