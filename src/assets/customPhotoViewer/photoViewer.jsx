import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Portal,
} from "@mui/material";
import { Fragment, useState } from "react";
import CustomPDFViewer from "./customPDFViewer";
import DownloadIcon from "@mui/icons-material/Download";
import { getUrlExtension } from "../utils";

export const PhotoViewer = ({ url, open, setOpen, handleClose }) => {
  const handleDownload = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };
  return (
    <Fragment>
      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            {getUrlExtension(url) === "pdf" ? (
              <CustomPDFViewer pdfUrl={url} />
            ) : (
              <img src={url} alt="image" width="100%" />
            )}
          </DialogContent>
          <DialogActions>
            {getUrlExtension(url) !== "pdf" && (
              <IconButton
                onClick={() => {
                  handleDownload(url);
                }}
              >
                <DownloadIcon sx={{ color: "#127DDD" }} />
              </IconButton>
            )}
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};
