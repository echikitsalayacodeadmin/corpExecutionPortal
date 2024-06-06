import {
  Box,
  Grid,
  IconButton,
  Modal,
  Portal,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ReportingContext } from "../../../global/context/context";
import { useSnackbar } from "notistack";
import CustomButtonWhite from "../../../../assets/customButtonWhite";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { BASE_URL } from "../../../../assets/constants";
import { deleteData } from "../../../assets/reportingServices";

const DeleteSequenceModal = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { handleCloseDialog, openDialog } = useContext(ReportingContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteSequence = async () => {
    const url = BASE_URL + `org/reporting/sequence/${corpId}`;
    const result = await deleteData(url);
    if (result.data) {
      console.log("SUCCESS", result.data);
      enqueueSnackbar("Successfully Deleted!", {
        variant: "success",
      });
      handleCloseDialog();
    } else {
      console.log("ERROR", result.error);
      enqueueSnackbar("An error occured!", {
        variant: "error",
      });
    }
  };
  return (
    <Portal>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openDialog}
        onClose={() => handleCloseDialog()}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(187, 187, 187, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: "15px",
            width: "265px",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => handleCloseDialog()}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "13px",
              lineHeight: "15px",
              color: "#000000",
              marginTop: "-25px",
              marginBottom: "10px",
            }}
          >
            Confirm!
          </Typography>

          <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
            <Grid item xs={12} lg={12}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#000000",
                }}
              >
                Do you want to Delete the current Sequence ?
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <CustomButtonBlue
                onClick={() => {
                  handleDeleteSequence();
                }}
                title="Yes"
              />
            </Grid>
            <Grid
              item
              xs={6}
              lg={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CustomButtonWhite
                onClick={() => handleCloseDialog()}
                title="No"
                styles={{
                  borderWidth: "1px solid",
                  borderColor: "red",
                  "&:hover": {
                    borderColor: "red",
                  },
                }}
                textColor={"red"}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Portal>
  );
};

export default DeleteSequenceModal;
