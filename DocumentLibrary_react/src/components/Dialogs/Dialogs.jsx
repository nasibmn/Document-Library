import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/DocumnentSlicer";
import { Snackbar, Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DialogsStyle from "./Dialogs-styled";

const Dialogs = () => {
  const dispatch = useDispatch();
  const { document, isSuccess, isError, isLoading, message } = useSelector(
    ({ docs }) => docs
  );
  return (
    <>
      <DialogsStyle isError={isError} isSuccess={isSuccess} />
      {/* all page loadings................ */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* all alert and notificatoins................. */}
      <Snackbar
        className="snackbar"
        open={(isSuccess && message) || (isError && message)}
        onClose={() => dispatch(reset())}
        autoHideDuration={7000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(reset())}
          variant="outlined"
          severity={document?.status || (isError && "error") || message?.status}
          className="snackbar-alert"
        >
          {document?.message || message?.message || message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dialogs;
