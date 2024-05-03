import React, { Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Portal,
} from "@mui/material";

const ViewReportModal = ({ open, handleCloseModal, fileUrl, fileType }) => {
  return (
    <Fragment>
      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={open}
          onClose={handleCloseModal}
        >
          <DialogTitle>View File</DialogTitle>
          <DialogContent>
            <Box>
              {fileUrl && fileType === "pdf" && (
                <CustomPDFViewer pdfUrl={fileUrl} />
              )}
              {fileUrl && fileType === "image" && (
                <img src={fileUrl} alt="image" width="100%" />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {fileUrl && fileType === "image" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(fileUrl, "_blank");
                }}
              >
                Download
              </Button>
            )}

            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default ViewReportModal;
