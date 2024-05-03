import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Portal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const ViewFilesModal = ({
  open,
  onClose,
  selectedFiles,
  handleDeleteFile,
  fileType,
}) => {
  const renderDialogTitle = () => (
    <DialogTitle>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: "17px",
          lineHeight: "15px",
          color: "#000000",
          marginTop: "-25px",
          marginBottom: "10px",
        }}
      >
        Selected Files
      </Typography>
    </DialogTitle>
  );

  const gridItemStyle = { textAlign: "center", paddingLeft: "20px" };

  return (
    <Portal>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        {renderDialogTitle()}
        <DialogContent>
          <Box sx={{ overflowY: "scroll", padding: 1 }}>
            {selectedFiles?.map((file, index) => (
              <Grid
                container
                display="flex"
                key={file.name}
                alignItems="center"
                sx={{ borderBottom: "1px solid #ccc", padding: "5px 0px" }}
              >
                <Grid item xs={1} lg={1}>
                  <Typography>{index + 1}</Typography>
                </Grid>
                <Grid item xs={6} lg={6} sx={gridItemStyle}>
                  <Typography>{file.name}</Typography>
                </Grid>
                <Grid item xs={5} lg={5}>
                  <IconButton
                    onClick={() =>
                      handleDeleteFile(fileType?.toUpperCase(), file.name)
                    }
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default ViewFilesModal;
