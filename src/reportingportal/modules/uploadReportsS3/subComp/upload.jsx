import React, { useState, useCallback, useEffect, Fragment } from "react";
import {
  Box,
  Paper,
  LinearProgress,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Portal,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import axios from "axios";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { FILE_TYPE } from "../../../assets/reportingConstants";
import { fetchCorps } from "../../../services/selectCorpServices";
import { uploadFile } from "../../../assets/reportingServices";
import CloseIcon from "@mui/icons-material/Close";

const DropzoneContainer = styled("div")({
  border: () => `2px dashed #127DDD`,
  borderRadius: () => "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
  background: () => "lightblue",
  height: () => "55vh",
  outline: "none",
  cursor: "pointer",
});

const Upload = ({
  selectedFileType,
  handleSelectFileType,
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [showSelectedFiles, setShowSelectedFiles] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log({ acceptedFiles });
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  console.log({ files });

  const handleDeleteFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitFiles = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    setIsLoading(true);
    let formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    const url =
      BASE_URL +
      `org/reporting/s3/uploadFiles?files=string&corpId=${corpId}&fileType=${
        selectedFileType?.value
      }&campCycleId=${campCycleId || ""}`;
    const result = await uploadFile(url, formData);
    console.log({ result });
    if (result?.error) {
      enqueueSnackbar("An error occured!", {
        variant: "error",
      });
      setIsLoading(false);
    } else {
      enqueueSnackbar("Successfully Uploaded!", {
        variant: "success",
      });
      setFiles([]);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Fragment>
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Fragment>
    );
  }

  return (
    <Box sx={{ marginBlock: 1 }}>
      <Grid container spacing={2} marginBlock={1}>
        <Grid item xs={12} lg={3}>
          <CustomAutocomplete
            options={FILE_TYPE}
            label={"Select File Type"}
            placeholder="Search File Type"
            value={selectedFileType}
            onChange={handleSelectFileType}
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <CustomButtonBlue
            disabled={files.length === 0 ? true : false}
            onClick={() => handleSubmitFiles()}
            title="Upload"
          />
        </Grid>
        <Grid item xs={6} lg={2}>
          <CustomButtonBlue
            disabled={files.length === 0 ? true : false}
            onClick={() => setShowSelectedFiles(!showSelectedFiles)}
            title="View Selected Files"
          />
        </Grid>

        {files.length > 0 ? (
          <Grid item xs={10} lg={3}>
            <Box
              sx={{
                padding: "10px",
                borderRadius: "15px",
                border: "1px solid lightgrey",
                marginLeft: "20px",
              }}
            >
              <Typography
                sx={{ textAlign: "center", color: "#000", fontWeight: "400" }}
              >
                Total Selected Files: {files.length}
              </Typography>
            </Box>
          </Grid>
        ) : null}
      </Grid>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography sx={{ textAlign: "center" }}>
          Drag 'n' drop some files here, or click to select files
        </Typography>
      </DropzoneContainer>

      <Portal>
        <Dialog
          open={showSelectedFiles}
          onClose={() => setShowSelectedFiles(!showSelectedFiles)}
          maxWidth={"xl"}
          fullWidth={true}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => setShowSelectedFiles(!showSelectedFiles)}
              >
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
          <DialogContent>
            <Box sx={{ overflowY: "scroll", padding: 1 }}>
              {files.map((file, index) => (
                <Grid
                  container
                  display="flex"
                  key={file.name}
                  alignItems="center"
                  sx={{
                    borderBottom: "1px solid #ccc",
                    padding: "5px 0px",
                  }}
                >
                  <Grid item xs={1} lg={1} sx={{ textAlign: "center" }}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={6} lg={6} sx={{ paddingLeft: "20px" }}>
                    <Typography>{file.name}</Typography>
                  </Grid>
                  <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => handleDeleteFile(file.name)}
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
    </Box>
  );
};

export default Upload;
