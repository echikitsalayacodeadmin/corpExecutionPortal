import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Portal,
  Select,
} from "@mui/material";
import { Fragment, useState } from "react";
import TicketForm from "./ticketForm";
import { raiseTicket } from "../../../services/genericTicketingSystem";

const RaiseTicketDialog = ({ open, setOpen, selectedTicketType }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [formValues, setFormValues] = useState({ sessionType: "" });
  return (
    <Fragment>
      <Portal>
        <Dialog
          fullWidth={false}
          maxWidth={"xl"}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{selectedTicketType.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>Raise ticket for ....</DialogContentText>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                //width: "fit-content",
              }}
            >
              <TicketForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => raiseTicket(formValues)}>Save</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default RaiseTicketDialog;
