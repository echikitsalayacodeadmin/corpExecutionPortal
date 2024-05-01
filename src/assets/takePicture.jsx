import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Portal,
  Stack,
} from "@mui/material";
import React, { useState, useRef, Fragment } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadDocuments from "./uploadDocuments";
import { uploadData } from "../campportal/assets/campServices";
import Webcam from "react-webcam";
import { useSnackbar } from "notistack";

const TakePicture = ({
  empId,
  url,
  formValues,
  setFormValues,
  label,
  property,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
  };

  const getImageFileObject = async (imageFile) => {
    fetch(imageFile)
      .then((res) => res.blob())
      .then((val) => {
        var file = new File([val], property + "my_image.png", {
          type: "image/png",
          lastModified: new Date().getTime(),
        });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        saveImage(formData);
        console.log({ filesdasdasda: file });
      });
  };

  const saveImage = async (data) => {
    const image = await uploadData(url, data);

    if (image.error) {
      console.log("error");
      enqueueSnackbar("Failed to upload!", {
        variant: "error",
      });
    } else {
      const data = image.data;
      console.log({ success: data });
      //setFormValues({ id: 0 });
      //setFormValues(data);

      let newFormValues = { ...formValues };
      newFormValues[property] = data[property];
      newFormValues["vaccines"] = data["vaccines"];
      setFormValues(newFormValues);
      enqueueSnackbar("Uploaded successfully.", {
        variant: "success",
      });
      handleClose();
    }
  };

  //console.log({ imagesdfas: camera.current });

  const videoConstraintsFacing = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const videoConstraintsFacingOut = {
    facingMode: { exact: "environment" },
  };

  const [isFacing, setIsFacing] = useState(true);
  const [videoConstraints, setVideoConstraints] = useState(
    videoConstraintsFacing
  );
  return (
    <Fragment>
      <Box
        sx={{
          flex: 1,
          display: { lg: "flex", xs: "none" },
          width: "60%",
        }}
      >
        <Button
          startIcon={<PhotoCameraIcon sx={{ color: "#fff" }} />}
          size="small"
          fullWidth
          variant="contained"
          onClick={handleClickOpen}
        >
          {label}
        </Button>
      </Box>

      <Box
        sx={{
          display: { lg: "none", xs: "flex" },
          width: "90%",
          justifyContent: "center",
        }}
      >
        <UploadDocuments
          title={label}
          url={url}
          handleClose={handleClose}
          formValues={formValues}
          setFormValues={setFormValues}
          property={property}
        />
      </Box>

      <Portal>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          //TransitionComponent={Transition}
        >
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              {image ? (
                <Fragment>
                  <img src={image} alt="Taken photo" width="100%" />
                </Fragment>
              ) : (
                <Webcam ref={camera} videoConstraints={videoConstraints} />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              display="flex"
              justifyContent="center"
              alignItems="center"
              spacing={{ lg: 3, xs: 1 }}
            >
              {image ? (
                <Button
                  size="small"
                  sx={{
                    py: 0.5,
                    px: 1,
                    height: { lg: 30, xs: 20 },
                    fontSize: { lg: 14, xs: 7 },
                  }}
                  variant="contained"
                  onClick={() => getImageFileObject(image)}
                >
                  Upload
                </Button>
              ) : (
                <Stack direction="row" spacing={{ lg: 2, xs: 1 }}>
                  <Button
                    size="small"
                    sx={{
                      py: 0.5,
                      px: 1,
                      height: { lg: 30, xs: 20 },
                      fontSize: { lg: 14, xs: 7 },
                    }}
                    variant="contained"
                    onClick={() => {
                      if (isFacing) {
                        setVideoConstraints(videoConstraintsFacingOut);
                        setIsFacing(false);
                      } else {
                        setVideoConstraints(videoConstraintsFacing);
                        setIsFacing(true);
                      }
                    }}
                  >
                    Switch Camera
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      py: 0.5,
                      px: 1,
                      height: { lg: 30, xs: 20 },
                      fontSize: { lg: 14, xs: 7 },
                    }}
                    variant="contained"
                    onClick={() => setImage(camera.current.getScreenshot())}
                  >
                    Capture
                  </Button>
                </Stack>
              )}
              <UploadDocuments
                url={url}
                handleClose={handleClose}
                formValues={formValues}
                setFormValues={setFormValues}
                property={property}
              />
              <Button
                size="small"
                sx={{
                  py: 0.5,
                  px: 1,
                  height: { lg: 30, xs: 20 },
                  fontSize: { lg: 14, xs: 7 },
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default TakePicture;
