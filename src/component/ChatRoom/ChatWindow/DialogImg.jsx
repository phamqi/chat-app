import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { colorTxtBlur } from "../../../constants";

function DialogImg(props) {
  const [img, setImg] = useState();
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const imgs = document.querySelectorAll(".img_send");
    imgs.forEach((item) => {
      item.addEventListener("click", function (e) {
        setShowDialog(true);
        const lazyLoad = item.getAttribute("lazy-load");
        setImg(lazyLoad);
      });
    });
  });
  const onCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <Box
      sx={{
        display: `${showDialog ? "flex" : "none"}`,
        position: "absolute",
        top: "0",
        left: "0",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "fit-content",
          height: "fit-content",
          padding: "2px",
          borderRadius: "8px",
          border: `1px solid ${colorTxtBlur}`,
        }}
      >
        <CloseIcon
          onClick={onCloseDialog}
          sx={{
            position: "absolute",
            top: "0.4rem",
            right: "0.4rem",
            color: `${colorTxtBlur}`,
          }}
        />
        <img
          src={img ? img : ""}
          alt="img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </Box>
    </Box>
  );
}

DialogImg.propTypes = {};

export default DialogImg;
