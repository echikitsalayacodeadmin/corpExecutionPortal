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
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomButtonBlue from "../../../../assets/customButtonBlue";

const SelectedEmployeesModal = ({
  openDialog,
  handleCloseDialog,
  selectedEmpList,
  setSelectedEmpList,
  setSelectedRows,
}) => {
  const handleDelete = (index) => {
    const updatedList = [...selectedEmpList];
    updatedList.splice(index, 1);
    setSelectedEmpList(updatedList);
  };
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
            <Typography variant="h3">Selected Employees</Typography>
            <CustomButtonBlue
              title={"Set These Emp For Creating Report"}
              onClick={() => setSelectedRows(selectedEmpList)}
            />
            <CustomButtonBlue
              title={"Clear List"}
              onClick={() => setSelectedEmpList([])}
            />
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
            {selectedEmpList.length > 0 ? (
              <Grid
                container
                sx={{
                  marginTop: "10px",
                  padding: "5px 0px",
                }}
              >
                <Grid item lg={4} xs={4}>
                  <Typography>Emp ID</Typography>
                </Grid>
                <Grid item lg={8} xs={8}>
                  <Typography>Emp Name</Typography>
                </Grid>
              </Grid>
            ) : null}
            {selectedEmpList.map((item, index) => (
              <Box key={item?.empId} sx={{ marginTop: "5px" }}>
                <Grid
                  container
                  sx={{
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Grid item lg={4} xs={4}>
                    <Typography>{item?.empId}</Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography>{item?.name}</Typography>
                  </Grid>
                  <Grid item lg={2} xs={2}>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default SelectedEmployeesModal;
