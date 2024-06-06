import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Portal,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const UploadFile = ({
  title,
  styles,
  formValues,
  setFormValues,
  property,
  onClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleImageClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Box>
        <Box>
          {formValues?.[property]?.source !== "" ? (
            <Box
              component={"img"}
              src={formValues?.[property]?.source}
              style={{ height: "70px", cursor: "pointer", width: "200px" }}
              onClick={handleImageClick} // Open modal on image click
            />
          ) : null}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: formValues?.[property]?.source !== "" ? null : "70px",
          }}
        >
          <Button
            size="small"
            sx={{
              py: 0.5,
              px: 2,
              height: 30,
              fontSize: 14,
              ...styles,
            }}
            onClick={onClick}
            variant="contained"
            startIcon={<AttachFileIcon sx={{ color: "#fff" }} />}
          >
            {title}
          </Button>
          {formValues?.[property].source !== "" ? (
            <Button
              onClick={() =>
                setFormValues({ ...formValues, [property]: { source: "" } })
              }
              variant="outlined"
              sx={{
                color: "red",
                marginLeft: "10px",
                height: "40px",
                borderRadius: "15px",
                borderColor: "red",
              }}
            >
              Remove
            </Button>
          ) : null}
        </Box>
      </Box>

      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <img
              src={formValues?.[property]?.source}
              alt="image"
              width="100%"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default UploadFile;
