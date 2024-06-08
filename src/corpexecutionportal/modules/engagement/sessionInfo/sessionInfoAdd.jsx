import React, { Fragment, useState } from "react";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { Box, CircularProgress, Grid, TextField } from "@mui/material";
import { saveData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";

const SessionInfoAdd = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionDetail, setSessionDetail] = useState({
    sessionName: "",
    description: "",
    duration: "",
    impact: "",
  });

  const handleAdd = async () => {
    setIsLoading(true);
    const url = BASE_URL + `org/awarenessSessions/add`;
    const result = await saveData(url, sessionDetail);
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
      });
    }
  };

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
