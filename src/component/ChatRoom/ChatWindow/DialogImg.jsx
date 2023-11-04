import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  colorInner,
  colorOuter,
  colorOuterActive,
  colorTxt,
  colorTxtBlur,
} from "../../../constants";

function DialogImg({ item, showDialog, closeDialog }) {
  const [loading, setLoading] = useState(false);
  const [errorImg, setErrorImg] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.onload = function () {
        setLoading(true);
      };
      ref.current.onerror = function () {
        setErrorImg(true);
      };
    }
  }, [item]);
  return (
    <Dialog
      open={showDialog && !errorImg}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            maxWidth: "unset",
            borderRadius: "8px",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "fit-content",
          height: "fit-content",
          padding: "4px",
          borderRadius: "12px",
        }}
      >
        <CloseIcon
          onClick={closeDialog}
          sx={{
            position: "absolute",
            top: "0.6rem",
            right: "0.6rem",
            padding: "0.2rem",
            color: `${colorTxtBlur}`,
            cursor: "pointer",
            borderRadius: "25%",
            "&:hover": {
              color: `${colorOuterActive}`,
              backgroundColor: `${colorTxtBlur}`,
            },
          }}
        />
        <img
          ref={ref}
          src={loading ? item?.img?.hight : item?.img?.low}
          alt="img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

DialogImg.propTypes = {};

export default DialogImg;
