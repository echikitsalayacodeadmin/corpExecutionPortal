import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Portal,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

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

  console.log({ photourl: formValues?.[property] });

  return (
    <Fragment>
      <Box>
        {formValues?.[property]?.source && (
          <Box
            component={"img"}
            src={formValues?.[property]?.source}
            style={{ height: "70px", cursor: "pointer", width: "200px" }}
            onClick={handleImageClick} // Open modal on image click
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop:
              formValues?.[property]?.source !== "" ||
              formValues?.[property]?.source !== undefined
                ? null
                : "70px",
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
          {formValues?.[property].source && (
            <IconButton
              onClick={() =>
                setFormValues({ ...formValues, [property]: { source: "" } })
              }
              variant="outlined"
              sx={{
                color: "red",
                position: "absolute",
                marginLeft: 22,
                height: "40px",
                borderRadius: "15px",
                borderColor: "red",
                marginTop: -20,
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
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
