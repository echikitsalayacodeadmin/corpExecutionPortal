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
import RaiseTicketMainComp from "../raiseTicket/raiseTicketMainComp";

const RaiseTicketDialog = ({
  open,
  setOpen,
  selectedTicketType,
  userId = localStorage.getItem("USER_ID_CORP_SALES"),
  raisedByName = localStorage.getItem("USER_NAME_CORP_SALES"),
  raisedByMobile = localStorage.getItem("USER_MOBILE_CORP_SALES"),
  formData,
  companyList,
  sessionTypeList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
    setFormValues({
      userId: userId,
      raisedByName: raisedByName,
      raisedByMobile: raisedByMobile,
      selectedTicketType: selectedTicketType,
      sessionType: "",
      company: "",
      date: dayjs(),
    });
  };

  const [formValues, setFormValues] = useState({
    userId: userId,
    raisedByName: raisedByName,
    raisedByMobile: raisedByMobile,
    selectedTicketType: selectedTicketType,
    sessionType: "",
    company: "",
    date: dayjs(),
  });

  console.log({ formValues, selectedTicketType });

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
              <RaiseTicketMainComp
                formValues={formValues}
                setFormValues={setFormValues}
                selectedTicketType={selectedTicketType}
                formData={formData}
                companyList={companyList}
                sessionTypeList={sessionTypeList}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsLoading(true);
                raiseTicket(
                  formValues,
                  selectedTicketType,
                  handleClose,
                  formData
                );
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
