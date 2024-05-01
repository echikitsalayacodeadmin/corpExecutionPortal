import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Portal,
} from "@mui/material";
import { Fragment, useState } from "react";

export const PhotoViewer = ({ url, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <img src={url} alt="image" width="100%" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};
