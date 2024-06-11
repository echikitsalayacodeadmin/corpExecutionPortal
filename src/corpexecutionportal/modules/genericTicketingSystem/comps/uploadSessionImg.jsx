import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../../../../assets/constants";
import { getData, uploadFile } from "../../../assets/corpServices";
import { useSnackbar } from "notistack";
import { SaveOutlined } from "@mui/icons-material";

const UploadSessionImg = ({ open, setOpen, corpId, ticketId, setFetch }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const [sessionPhotos, setSessionPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileSelection = ({ name, size, source, file }) => {
    const newFileData = { name, size, source, file };
    setSessionPhotos((prevPhotos) => [...prevPhotos, newFileData]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleImageDelete = (index) => {
    setSessionPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleFileUpload = async () => {
    setFetch(false);
    const url =
      BASE_URL +
      `org/uploadPhotos?corpId=${corpId}&corpUploadSubType=AWARENESS_SESSION&ticketId=${ticketId}&files=null`;

    const formData = new FormData();

    sessionPhotos.forEach((photo) => {
      formData.append("files", photo.file);
    });
    const result = await uploadFile(url, formData);
    if (result.error) {
      console.log(result.error);
    } else {
      enqueueSnackbar("Updated successfully.", {
        variant: "success",
      });
      setSessionPhotos([]);
      setFetch(true);
    }
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <UploadFile
          title="Upload"
          styles={{ height: "40px", borderRadius: "15px" }}
          onClick={() => {
            selectFiles({ accept: "*", multiple: true }, (filesArray) => {
              filesArray.forEach(handleFileSelection);
            });
          }}
        />

        <Button
          onClick={() => {
            handleFileUpload();
          }}
          variant="outlined"
          sx={{
            borderRadius: "15px",
            py: 1,
            px: 1,
            ml: 2,
            height: 40,
            fontSize: 14,
          }}
        >
          <SaveOutlined />
        </Button>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {sessionPhotos.map((item, index) => (
            <Box key={index} sx={{ position: "relative", display: "flex" }}>
              <img
                src={item.source}
                style={{
                  height: 70,
                  width: 70,
                  border: "1px solid #000",
                  marginInline: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpen(true);
                  setSelectedImage(item.source);
                }}
              />{" "}
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
                onClick={() => handleImageDelete(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
            sx={{ position: "absolute", right: 12, top: 5 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ width: "100%" }} />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UploadSessionImg;
