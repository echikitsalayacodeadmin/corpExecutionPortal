import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";

const MasterPdfIndexModal = ({ open, handleClose, data }) => {
  if (data.length === 0) return null;

  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.replace(/_/g, " ").toUpperCase(),
    width: 150,
  }));

  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Master Pdf Index</DialogTitle>
      <DialogContent>
        <Box style={{ height: 600, width: "100%" }}>
          <CustomDataGridLayout rows={rows} columns={columns} pageSize={10} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MasterPdfIndexModal;
