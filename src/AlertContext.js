import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

export const AlertContext = createContext();
export default function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    open: false,
    severity: "info",
    message: "",
  });
  const handleClose = () => {
    setAlert({ open: false });
  };
  const handleAlert = (severity, message) => {
    setAlert({ open: true, severity: severity, message: message });
  };
  return (
    <>
      <Snackbar
        open={alert.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          color={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <AlertContext.Provider value={handleAlert}>
        {children}
      </AlertContext.Provider>
    </>
  );
}
