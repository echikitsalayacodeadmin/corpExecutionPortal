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
import dayjs from "dayjs";

const RaiseTicketDialog = ({
  open,
  setOpen,
  selectedTicketType,
  userId = localStorage.getItem("USER_ID_CORP_SALES"),
  name = localStorage.getItem("USER_NAME_CORP_SALES"),
  mobile = localStorage.getItem("USER_MOBILE_CORP_SALES"),
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
    setFormValues({
      userId: userId,
      name: name,
      mobile: mobile,
      selectedTicketType: selectedTicketType,
      sessionType: "",
      company: "",
      date: dayjs(),
    });
  };

  const [formValues, setFormValues] = useState({
    userId: userId,
    name: name,
    mobile: mobile,
    selectedTicketType: selectedTicketType,
    sessionType: "",
    company: "",
    date: dayjs(),
  });

  console.log({ formValues });
  return (
    <Fragment>
      <Portal>
        <Dialog
          fullWidth={true}
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
                width: "100%",
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
            <Button
              disabled={
                isLoading || !(formValues.company && formValues.sessionType)
              }
              onClick={() => {
                setIsLoading(true);
                raiseTicket(formValues, handleClose);
              }}
              variant="contained"
              sx={{ width: 200 }}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ width: 200 }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default RaiseTicketDialog;
