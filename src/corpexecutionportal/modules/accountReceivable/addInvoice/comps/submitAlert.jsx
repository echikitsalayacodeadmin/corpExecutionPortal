import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";

const SubmitAlert = ({ disableClick }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Button
        variant="contained"
        size="small"
        sx={{ minWidth: 140 }}
        onClick={handleClickOpen}
      >
        Save
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to save changes.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            type="submit"
            autoFocus
            disabled={disableClick}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default SubmitAlert;
