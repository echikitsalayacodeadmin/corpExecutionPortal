import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { getData, updateData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";

const GetSessionImg = ({
  open,
  setOpen,
  corpId,
  ticketId,
  fetch,
  setFetch,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const handleGetPhotos = async () => {
    const url =
      BASE_URL +
      `org/photos?corpId=${corpId}&corpUploadSubType=AWARENESS_SESSION&ticketId=${ticketId}`;

    const result = await getData(url);
    if (result.error) {
      console.log(result.error);
      setPhotos([]);
    } else {
      const temp = result.data.map((item) => ({
        id: item.id,
        source: item.photosUrl,
      }));
      console.log({ temp });
      setPhotos(temp);
    }
  };

  useEffect(() => {
    handleGetPhotos();
  }, [fetch]);

  console.log({ fetch });

  const handleImageDelete = async (id) => {
    const url = BASE_URL + `org/photos?Id=${id}`;
    const result = await updateData(url, "");
    if (result.error) {
      enqueueSnackbar("Failed to delete!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Successfully Updated", {
        variant: "success",
      });
      handleGetPhotos();
    }
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {photos.length > 0 ? (
          photos.map((item, index) => (
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
                onClick={() => handleImageDelete(item.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography>No Photos Uploaded yet</Typography>
        )}
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

export default GetSessionImg;
