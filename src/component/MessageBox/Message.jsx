import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box } from "@mui/material";
import React from "react";

import { colorOuterActive } from "../../../../constants";
import { LazyLoad } from "../../../LazyImg";
import { formatISO } from "date-fns";

Message.propTypes = {};

function Message({
  item,
  className,
  photoURL,
  reverse = false,
  hiddenMessage,
}) {
  const formatTime = (seconds) => {
    if (seconds) {
      const result = formatISO(new Date(seconds * 1000), {
        representation: "time",
      }).split(":");
      const time = result[0] + ":" + result[1];
      return time;
    }
  };
  return (
    <>
      {item.hidden ? (
        <Box
          className={className}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: `${reverse ? "row-reverse" : "row"}`,
            padding: "5px",
            borderRadius: "4px",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <>
            <Avatar
              className="avatar"
              src={photoURL}
              sx={{ width: "2rem", height: "2rem", opacity: 0.5 }}
            />
            <Box
              sx={{
                padding: "0 8px",
                borderRadius: "8px 0px 8px 8px ",
                opacity: 0.5,
                flex: 1,
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Deleted message
            </Box>
          </>
        </Box>
      ) : (
        <Box
          className={className}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: `${reverse ? "row-reverse" : "row"}`,
            padding: "5px",
            borderRadius: "4px",
            position: "relative",
            justifyContent: "space-between",
            "&:hover": {
              backgroundColor: `${colorOuterActive}`,
            },
            "&:hover .hidden_message": {
              opacity: 1,
            },
            "&:hover .send_at_time": {
              opacity: 1,
            },
          }}
        >
          {item.img ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: `${reverse ? "row-reverse" : "row"}`,
              }}
            >
              <Avatar
                className="avatar"
                src={photoURL}
                sx={{ width: "2rem", height: "2rem", opacity: 1 }}
              />
              <Box
                sx={{
                  width: "50%",
                  padding: "8px",
                  borderRadius: "8px 0px 8px 8px ",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <LazyLoad
                    style={{ width: "100%" }}
                    src={`${item.img.low}`}
                    lazy={`${item.img.hight ? item.img.hight : item.img.low}`}
                    alt="img"
                    className="img_send"
                  />
                  <Box
                    className="send_at_time"
                    sx={{
                      padding: "0 8px",
                      borderRadius: "8px 0px 8px 8px ",
                      fontSize: "0.7rem",
                      fontWeight: 300,
                      opacity: 0,
                    }}
                  >
                    {formatTime(item.sendAt.seconds)}
                  </Box>
                </Box>
                {item.message}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: `${reverse ? "row-reverse" : "row"}`,
              }}
            >
              <Avatar
                className="avatar"
                src={photoURL}
                sx={{ width: "2rem", height: "2rem", opacity: 0 }}
              />
              <Box
                sx={{
                  padding: "0 8px",
                  borderRadius: "8px 0px 8px 8px ",
                }}
              >
                {item && item.message}
              </Box>
              <Box
                className="send_at_time"
                sx={{
                  padding: "0 8px",
                  borderRadius: "8px 0px 8px 8px ",
                  fontSize: "0.7rem",
                  fontWeight: 300,
                  opacity: 0,
                }}
              >
                {formatTime(item.sendAt.seconds)}
              </Box>
            </Box>
          )}
          {reverse ? (
            <Box
              className="hidden_message"
              sx={{
                marginTop: "auto",
                cursor: "pointer",
                opacity: 0,
                ":hover": {
                  color: "#dd6368",
                },
              }}
              onClick={() => hiddenMessage(item.id)}
            >
              <DeleteIcon />
            </Box>
          ) : (
            ""
          )}
        </Box>
      )}
    </>
  );
}

export default Message;
