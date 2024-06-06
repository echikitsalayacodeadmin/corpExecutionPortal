import {
  Box,
  Grid,
  IconButton,
  Modal,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ReportingContext } from "../../../global/context/context";
import { useSnackbar } from "notistack";
import CustomButtonWhite from "../../../../assets/customButtonWhite";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { BASE_URL } from "../../../../assets/constants";
import { deleteData, updateData } from "../../../assets/reportingServices";

const EditModal = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  editDetail,
  setOpen,
  open,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [employeeId, setEmployeeId] = useState("");
  useEffect(() => {
    setEmployeeId(editDetail.empId);
  }, [editDetail]);
  const handleSubmit = async () => {
    const Obj = {
      seqId: editDetail.seqId,
      empId: employeeId,
      corpId: corpId,
    };
    const url = BASE_URL + `org/reporting/sequence`;
    const result = await updateData(url, Obj);
    if (result.data) {
      console.log("SUCCESS", result.data);
      enqueueSnackbar("Successfully Updated EmpId!", {
        variant: "success",
      });
      setOpen(false);
    } else {
      console.log("ERROR", result.error);
      enqueueSnackbar(`${result.error.response.data.message}`, {
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
        open={open}
        onClose={() => setOpen(false)}
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
            <IconButton onClick={() => setOpen(false)}>
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
            Edit Employee ID
          </Typography>

          <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
            <Grid item xs={12} lg={12}>
              <TextField
                label={"EmployeeId"}
                placeholder={"EmployeeId"}
                fullWidth
                size="small"
                value={employeeId || ""}
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
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
                onClick={() => {
                  handleSubmit();
                }}
                title="Save"
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Portal>
  );
};

export default EditModal;
