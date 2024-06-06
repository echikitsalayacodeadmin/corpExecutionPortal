import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Modal,
  Portal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../../../../assets/constants";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { saveData } from "../../../assets/orgAnalysisServices";
import { useSnackbar } from "notistack";

const MarkStatusModal = ({ open, handleClose, corpId, data }) => {
  const { enqueueSnackbar } = useSnackbar();
  console.log({ data });
  useEffect(() => {
    setRemark(data?.healthStatusRemarks || "");
    setSelectedMarkStatus(data?.healthStatusInternal || "");
  }, [data]);

  const [remark, setRemark] = React.useState("");
  const [selectedMarkStatus, setSelectedMarkStatus] = React.useState("");
  const handleSelectMarkStatus = (event) => {
    setSelectedMarkStatus(event.target.value);
  };

  const handleMarkStatus = async () => {
    const Obj = {
      corpId: corpId,
      healthStatusInternal: selectedMarkStatus,
      oeveId: data?.oeveId,
      healthStatusRemarks: remark,
    };
    console.log({ Obj });
    const url = BASE_URL + "org/analysis/markAsUnhealthy";

    const result = await saveData(url, Obj);
    if (result.data) {
      enqueueSnackbar("Successfully Marked!!", {
        variant: "success",
      });
      setSelectedMarkStatus("");
      setRemark("");
      handleClose();
    } else {
      enqueueSnackbar("An Error Occured!", {
        variant: "error",
      });
    }
  };

  console.log({ remark, selectedMarkStatus });

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
            backgroundColor: "rgba(187, 187, 187, 0.4)",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: "15px",
            width: "340px",
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
            Mark Status!
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Select Health Status
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleSelectMarkStatus}
                  value={selectedMarkStatus}
                >
                  <Box sx={{ display: "flex" }}>
                    <FormControlLabel
                      value="FIT"
                      control={<Radio />}
                      label="FIT"
                    />
                    <FormControlLabel
                      value="UNFIT"
                      control={<Radio />}
                      label="UNFIT"
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                multiline
                maxRows={4}
                sx={{
                  minHeight: "100px",
                  background: "#fff",
                  color: "#127DDD",
                  fontWeight: "500",
                  fontSize: "13px",
                  lineHeight: " 15px",
                  "& input::placeholder": {
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: "13px",
                    lineHeight: " 15px",
                  },
                }}
                fullWidth
                label="Remark"
                variant="outlined"
                placeholder={"Remark"}
                size="small"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CustomButtonBlue
                disabled={selectedMarkStatus === "" ? true : false}
                title={"Save"}
                onClick={() => handleMarkStatus()}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Portal>
  );
};

export default MarkStatusModal;
