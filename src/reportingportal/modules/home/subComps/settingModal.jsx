import {
  Autocomplete,
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Portal,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GenerateReport from "./generateReport";
import { ReportingContext } from "../../../global/context/context";

const SettingModal = ({
  openDialog,
  handleCloseDialog,
  employeeList,
  corpId,
  originalEmployeeList,
}) => {
  const { selectedReportData } = useContext(ReportingContext);

  return (
    <Portal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth={"xl"}
        fullWidth={true}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedReportData?.label
              ? `Settings for Creating ${selectedReportData?.label} Report`
              : "Settings"}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minHeight: "70vh" }}>
            <GenerateReport
              employeeList={employeeList
                .map((employee) => employee.empId)
                .join(",")}
              corpId={corpId}
              totalEmployees={employeeList?.length}
              originalEmployeeList={originalEmployeeList}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default SettingModal;
