import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Portal,
} from "@mui/material";
import React from "react";
import CustomPDFViewer from "../../../../assets/customPDFViewer";
import { BrowserView, MobileView } from "react-device-detect";
import CustomPDFViewerMobile from "../../../../assets/customPDFViewerMobile";

const PdfViewerModal = ({ pdfUrl, open, handleClose }) => {
  return (
    <Portal>
      <Dialog
        fullWidth={true}
        maxWidth={false}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <Box>
            <BrowserView>
              <CustomPDFViewer pdfUrl={pdfUrl} />
            </BrowserView>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Portal>
  );
};

export default PdfViewerModal;
