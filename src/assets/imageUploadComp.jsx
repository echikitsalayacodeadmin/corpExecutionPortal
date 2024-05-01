import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Portal,
  Stack,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { PhotoViewer } from "./photoViewer";
import TakePicture from "./takePicture";
import Profile from "../assets/images/profile.png";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "./constants";
import { updateData } from "../campportal/assets/campServices";

function getUrlExtension(url) {
  try {
    return url.match(/^https?:\/\/.*[\\\/][^\?#]*\.([a-zA-Z0-9]+)\??#?/)[1];
  } catch (ignored) {
    return false;
  }
}

const ImageUploadComp = ({
  formValues,
  setFormValues,
  url,
  label,
  property,
  deleteURL,
}) => {
  const [imageURL, setImageURL] = useState(formValues[property]);

  useEffect(() => {
    setImageURL(formValues[property]);
  }, [formValues]);

  const [open, setOpen] = useState(false);

  const deleteImage = async (url) => {
    const response = await updateData(url, "");

    if (response.error) {
      console.log({ error: response.error });
    } else {
      console.log({ success: response.data });
      handleCloseDelete();
      setImageURL(null);
    }
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <Fragment>
      <PhotoViewer url={imageURL} open={open} setOpen={setOpen} />
      <Stack
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Box sx={{ height: 90 }}>
          {imageURL && deleteURL && (
            <Box
              sx={{
                position: "absolute",
                ml: 10,
                zIndex: 999,
                //background: "#fff",
                //height: 22,
                //width: 22,
              }}
            >
              <IconButton
                sx={{ background: "lightgray" }}
                onClick={handleClickOpenDelete}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>

              <Portal>
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                  <DialogTitle>{"Delete Report"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Are you sure?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDelete}>No</Button>
                    <Button onClick={() => deleteImage(deleteURL)} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Portal>
            </Box>
          )}
          {imageURL ? (
            getUrlExtension(imageURL).toLowerCase() === "pdf" ? (
              <Button onClick={() => window.open(imageURL)}>
                <PictureAsPdfIcon sx={{ fontSize: 100 }} />
              </Button>
            ) : (
              <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
                <img
                  src={`${imageURL}?${Date.now()}`}
                  height="90"
                  width="120"
                  alt="profile"
                />
              </Box>
            )
          ) : (
            <img src={Profile} height="80" width="80" />
          )}
        </Box>

        <TakePicture
          empId={formValues?.empId}
          formValues={formValues}
          setFormValues={setFormValues}
          url={url}
          label={label}
          property={property}
        />
      </Stack>
    </Fragment>
  );
};

export default ImageUploadComp;
