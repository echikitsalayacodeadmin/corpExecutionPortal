import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../assets/customButtonWhite";
import { saveData } from "../../assets/corpServices";
import { BASE_URL } from "../../../assets/constants";

const MarkAsLostBtn = ({
  buttonWidth,
  ButtonBorderRadius,
  marginBlock,
  textAlign,
  textTransform,
  corpSalesId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Obj = {
    lost: true,
    lostReason: reason,
    corpSalesId: corpSalesId,
  };

  const handleSubmit = async () => {
    const url = BASE_URL + "corpSales/markAsLost";
    const result = await saveData(url, Obj);
    if (result && result.data) {
      console.log("SUCCESS POST", result.data);
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      setReason("");
      handleClose();
      navigate(-1);
    } else if (result && result.error) {
      console.log("ERROR POST", result.error);
      enqueueSnackbar("An Error Occured", {
        variant: "errro",
      });
    }
  };

  return (
    <Fragment>
      <Grid container sx={{ marginBlock: 2 }}>
        <Grid item xs={12} sx={{ textAlign: textAlign }}>
          <Button
            sx={{
              backgroundColor: "red",
              width: buttonWidth ? buttonWidth : 200,
              borderRadius: ButtonBorderRadius ? ButtonBorderRadius : null,
              height: "37px",
              marginBlock: marginBlock,
              ":hover": {
                backgroundColor: "#cc0000",
              },
            }}
            variant="contained"
            onClick={handleOpen}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "13px",
                lineHeight: "15px",
                color: "#FFFFFF",
                textTransform: textTransform,
              }}
            >
              Mark As Lost
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={handleClose}
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
              width: "365px",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              gutterBottom
              sx={{
                marginTop: "-30px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Mark As Lost
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Typography>Reason for mark as lost ?</Typography>
                <TextField
                  value={reason || ""}
                  onChange={(event) => {
                    setReason(event.target.value);
                  }}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Reason"
                  size="small"
                  error={reason === "" ? true : false}
                  helperText={reason !== "" ? "" : "Reason is Mandatory"}
                />
              </Grid>
              <Grid item xs={6} lg={6} sx={{ textAlign: "center" }}>
                <CustomButtonBlue
                  disabled={reason === "" ? true : false}
                  onClick={() => handleSubmit()}
                  title={"Submit"}
                />
              </Grid>
              <Grid item xs={6} lg={6} sx={{ textAlign: "center" }}>
                <CustomButtonWhite
                  disabled={reason === "" ? true : false}
                  onClick={() => handleClose()}
                  title={"Cancel"}
                  styles={{ borderColor: "red" }}
                  textColor="red"
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default MarkAsLostBtn;
