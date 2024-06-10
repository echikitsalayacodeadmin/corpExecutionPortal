import React, { Fragment, useState } from "react";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { Box, CircularProgress, Grid, TextField } from "@mui/material";
import { saveData, uploadFile } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";

const SessionInfoAdd = () => {
  const [files, selectFiles] = useFileUpload();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionDetail, setSessionDetail] = useState({
    sessionName: "",
    description: "",
    duration: "",
    impact: "",
    isActive: true,
    imageUrl: "",
  });

  const handleAdd = async () => {
    setIsLoading(true);
    const formData = new FormData();
    sessionDetail.id ? formData.append("id", sessionDetail.id) : null;

    sessionDetail.sessionName
      ? formData.append("sessionName", sessionDetail.sessionName)
      : null;

    sessionDetail.description
      ? formData.append("description", sessionDetail?.description)
      : null;

    sessionDetail?.duration
      ? formData.append("duration", sessionDetail?.duration)
      : null;

    sessionDetail?.impact
      ? formData.append("impact", sessionDetail?.impact)
      : null;

    sessionDetail?.isActive
      ? formData.append("isActive", sessionDetail?.isActive)
      : null;

    sessionDetail.imageUrl.file
      ? formData.append("file", sessionDetail.imageUrl.file)
      : null;

    const url = BASE_URL + `org/awarenessSessions/add`;
    const result = await uploadFile(url, formData);
    if (result.error) {
      setIsLoading(false);
      console.log(result.error);
    } else {
      setIsLoading(false);
      enqueueSnackbar("Added successfully.", {
        variant: "success",
      });
      setSessionDetail({
        sessionName: "",
        description: "",
        duration: "",
        impact: "",
        isActive: true,
        imageUrl: "",
      });
    }
  };

  console.log({ sessionDetail });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Fragment>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Session Name"
            placeholder="Session Name"
            size="small"
            fullWidth
            value={sessionDetail.sessionName}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                sessionName: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Session Duration"
            placeholder="Session Duration"
            size="small"
            fullWidth
            value={sessionDetail.duration}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                duration: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Session Impact"
            placeholder="Session Impact"
            size="small"
            fullWidth
            value={sessionDetail.impact}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                impact: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UploadFile
            title="Upload Icon"
            styles={{ height: "40px", borderRadius: "15px" }}
            formValues={sessionDetail}
            setFormValues={setSessionDetail}
            property={"imageUrl"}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                const filedata = { name, size, source, file };
                setSessionDetail((prevSessionDetail) => ({
                  ...prevSessionDetail,
                  imageUrl: filedata, // or source if you prefer
                }));
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            multiline
            minRows={5}
            label="Session Description"
            placeholder="Session Description"
            size="small"
            fullWidth
            value={sessionDetail.description}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                description: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButtonBlue
            disabled={sessionDetail.sessionName ? false : true}
            title="Save"
            onClick={() => {
              handleAdd();
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SessionInfoAdd;
