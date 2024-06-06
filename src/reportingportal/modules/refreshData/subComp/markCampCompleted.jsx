import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Portal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { BASE_URL } from "../../../../assets/constants";
import { updateData } from "../../../assets/reportingServices";
import { useSnackbar } from "notistack";

const MarkCampCompleted = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [campCompleted, setCampCompleted] = useState("");
  const handleChange = (event) => {
    setCampCompleted(event.target.value);
  };

  const handleSave = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    const url =
      BASE_URL +
      `org/campcycle/status?campCycleId=${campCycleId}&isCampComplete=${
        campCompleted === "Yes" ? true : campCompleted === "No" ? false : ""
      }&updateVitalsStatus=true`;

    const result = await updateData(url, "");
    if (result?.data) {
      console.log({ SUCCESS: result?.data });
      enqueueSnackbar("Successfully Submitted", {
        variant: "success",
      });
    } else {
      console.log({ SUCCESS: result?.data });
      enqueueSnackbar(`${result?.error?.response?.data?.message}`, {
        variant: "error",
      });
    }
    handleClose();
  };
  return (
    <Portal>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={() => handleClose()}
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
            <IconButton
              onClick={() => {
                handleClose();
                setCampCompleted("");
              }}
            >
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
            Mark Camp Completed
          </Typography>

          <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
            <Grid item xs={12} lg={12}>
              <RadioGroup
                name="isCampCompleted"
                value={campCompleted}
                onChange={handleChange}
              >
                <Typography>
                  Is Camp Completed For This Corp ?{" "}
                  {`( With generating/uploading of all the reports )`}{" "}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    value={"Yes"}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={"No"}
                    control={<Radio />}
                    label="No"
                  />
                </Box>
              </RadioGroup>
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomButtonBlue
                disabled={campCompleted === "" ? true : false}
                title="Save"
                onClick={() => handleSave()}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Portal>
  );
};

export default MarkCampCompleted;
