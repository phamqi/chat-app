import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";

import {
  colorOuterActive,
  colorDisplayName,
  colorDelete,
  colorTxtBlur,
} from "../../../../constants";
import { LazyLoad } from "../../../LazyImg";
import { formatISO, format } from "date-fns";
import DialogImg from "../DialogImg";

Message.propTypes = {};

function Message({
  item,
  className,
  photoURL,
  displayName,
  reverse = false,
  hiddenMessage,
  handleShowDialog,
}) {
  const [loaded, setLoaded] = useState(false);

  const formatTime = (seconds) => {
    if (seconds) {
      const time = formatISO(new Date(seconds * 1000), {
        representation: "time",
      }).split(":");
      const result = time[0] + ":" + time[1];
      return result;
    }
  };
  const formatDate = (seconds) => {
    if (seconds) {
      const date = format(new Date(seconds * 1000), "dd-MM-yyyy");
      const time = formatISO(new Date(seconds * 1000), {
        representation: "time",
      }).split(":");
      const result = date + " " + time[0] + ":" + time[1];
      return result;
    }
  };

  return (
    <li
      className={className}
      key={item.id}
      style={{
        position: "relative",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        border: 0,
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: `${reverse ? "row-reverse" : "row"}`,
          padding: "0 8px 0",
          borderRadius: "0",
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
          <div
            onClick={() => {
              handleShowDialog(item);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: `${reverse ? "row-reverse" : "row"}`,
              }}
            >
              <Avatar
                className="avatar"
                src={photoURL}
                sx={{ width: "3rem", height: "3rem" }}
              />
              <Box
                sx={{
                  width: "50%",
                  minWidth: "18rem",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ display: "flex", position: "relative" }}>
                  <Box
                    className="send_at_time"
                    sx={{
                      padding: "0 8px",
                      fontSize: "0.7rem",
                      fontWeight: 300,
                      opacity: 0,
                      position: "absolute",
                      right: "-3rem",
                      top: "1rem",
                    }}
                  >
                    {formatTime(item.sendAt.seconds)}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: `${reverse ? "flex-end" : "flex-start"}`,
                      padding: `${reverse ? "0  16px 0 0 " : "0  0 0 16px"}`,
                    }}
                  >
                    <Box
                      sx={{
                        color: `${colorDisplayName}`,
                        fontWeight: "600",
                        display: "flex",
                        flexDirection: `${reverse ? "row-reverse" : "row"}`,
                        alignItems: "flex-end",
                      }}
                      className="active"
                    >
                      <span>{displayName}</span>
                      <Box
                        className=""
                        sx={{
                          padding: "0 8px",
                          fontSize: "0.8rem",
                          fontWeight: 400,
                          color: `${colorTxtBlur}`,
                        }}
                      >
                        {formatDate(item.sendAt.seconds)}
                      </Box>
                    </Box>
                    <LazyLoad
                      style={{ width: "100%", marginTop: "8px" }}
                      src={`${item.img.low}`}
                      lazy={`${item.img.hight ? item.img.hight : item.img.low}`}
                      alt="img"
                      className="img_send"
                    />
                    <Box
                      sx={{
                        padding: "3px 0",
                      }}
                    >
                      {item?.message}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: `${reverse ? "row-reverse" : "row"}`,
              alignItems: "center",
            }}
          >
            <Box>
              <Avatar
                className="avatar"
                src={photoURL}
                sx={{ width: "3rem", height: "3rem" }}
              />
              <Box
                className="send_at_time"
                sx={{
                  padding: "0 8px",
                  fontSize: "0.7rem",
                  fontWeight: 300,
                  opacity: 0,
                }}
              >
                {formatTime(item.sendAt.seconds)}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: `${reverse ? "flex-end" : "flex-start"}`,
                padding: `${reverse ? "0  16px 0 0 " : "0  0 0 16px"}`,
                height: "fit-content",
              }}
            >
              <Box
                sx={{
                  color: `${colorDisplayName}`,
                  fontWeight: "600",
                  alignItems: "center",
                  flexDirection: `${reverse ? "row" : "row-reverse"}`,
                }}
                className="active"
              >
                <Box
                  className=""
                  sx={{
                    padding: "0 8px",
                    fontSize: "0.8rem",
                    fontWeight: 400,
                    color: `${colorTxtBlur}`,
                  }}
                >
                  {formatDate(item.sendAt.seconds)}
                </Box>
                <span> {displayName}</span>
              </Box>
              <Box
                sx={{
                  padding: "3px 0",
                }}
              >
                {item?.message}
              </Box>
            </Box>
          </Box>
        )}
        {reverse && (
          <Box
            className="hidden_message"
            sx={{
              marginTop: "auto",
              cursor: "pointer",
              opacity: 0,
              ":hover": {
                color: `${colorDelete}`,
              },
            }}
            onClick={() => hiddenMessage(item)}
          >
            <DeleteIcon />
          </Box>
        )}
      </Box>
    </li>
  );
}

export default Message;
