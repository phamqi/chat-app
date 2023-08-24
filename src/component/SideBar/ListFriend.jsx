import { Box, Skeleton } from "@mui/material";
import React, { memo } from "react";
import { colorOuterActive, colorTxt, colorTxtBlur } from "../../../constants";
import CardItem from "../CardItem";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";

function Sidebar({ selectFriend, friendList, loading }) {
  console.log("abc", friendList);
  const random = Math.floor(Math.random() * (6 - 3) + 3);
  return (
    <Box sx={{ padding: "8px 16px" }}>
      {loading ? (
        Array.from(new Array(random)).map((x, index) => (
          <Box
            key={index}
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
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", flex: 1, mx: 1 }}
            />
          </Box>
        ))
      ) : friendList && friendList.length > 0 ? (
        friendList
          .sort((a, b) => b[1].lastMessage.date - a[1].lastMessage.date)
          .map((item) => (
            <Box
              key={item[0]}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderRadius: "8px",
                padding: "8px",
                color: `${colorTxtBlur}`,
                "&:hover": {
                  cursor: "pointer",
                  color: `${colorTxt}`,
                  backgroundColor: `${colorOuterActive}`,
                },
              }}
              onClick={() =>
                selectFriend({ id: item[0], infor: item[1].infor })
              }
            >
              <CardItem
                user={item[1].infor}
                lastMessage={item[1].lastMessage && item[1].lastMessage}
              />
            </Box>
          ))
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: `${colorTxtBlur}`,
            flexWrap: "wrap",
          }}
        >
          <SentimentDissatisfiedOutlinedIcon
            sx={{ width: "2rem", height: "2rem" }}
          />
          <h5 style={{ margin: "0 0.5rem" }}>You are alone</h5>
        </Box>
      )}
    </Box>
  );
}
export default memo(Sidebar);