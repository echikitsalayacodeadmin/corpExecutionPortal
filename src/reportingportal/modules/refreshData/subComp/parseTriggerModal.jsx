import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Portal,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { handleRefreshColumns } from "../../../services/refreshColumnHeader";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomButtonWhite from "../../../../assets/customButtonWhite";
import { useSnackbar } from "notistack";
import { ReportingContext } from "../../../global/context/context";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { BASE_URL } from "../../../../assets/constants";
import { saveData } from "../../../assets/reportingServices";

const ParseTriggerModal = ({
  open,
  handleClose,
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFileType, setSelectedFileType] = useState(null);
  const handleParseTrigger = async () => {
    if (selectedFileType !== null) {
      const Obj = {
        corpId: corpId,
        orgEmployeeFileType: selectedFileType?.value,
      };
      const url = BASE_URL + "org/parseReports";
      const result = await saveData(url, Obj);
      if (result.data) {
        setSelectedFileType(null);
        enqueueSnackbar("Successfully Saved", {
          variant: "success",
        });
        handleClose();
      } else {
        enqueueSnackbar(`${result.error.response.data.message}`, {
          variant: "error",
        });
      }
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
            <IconButton onClick={() => handleClose()}>
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
            Select File Type
          </Typography>

          <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
            <Grid item xs={12} lg={12}>
              <CustomAutocomplete
                options={[
                  { label: "Eye Test", value: "EYE_TEST" },
                  { label: "Ecg", value: "ECG" },
                  { label: "Audiometry", value: "AUDIOMETRY" },
                  { label: "Blood test", value: "BLOODTEST" },
                  { label: "Pft", value: "PFT" },
                  { label: "Urine", value: "URINETEST" },
                ]}
                value={selectedFileType}
                onChange={(event, newValue, reason) => {
                  setSelectedFileType(newValue);

                  if (reason === "clear") {
                    setSelectedFileType(null);
                  }
                }}
                placeholder={"Select File Type"}
                label={"Select File type"}
              />
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
                disabled={selectedFileType === null ? true : false}
                title="Save"
                onClick={() => handleParseTrigger()}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Portal>
  );
};

export default ParseTriggerModal;
