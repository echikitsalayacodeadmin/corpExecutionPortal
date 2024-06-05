import { Box, CircularProgress, Grid, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import LocationList from "./subComp/locationList";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import { BASE_URL } from "../../../assets/constants";
import { updateData } from "../../assets/corpServices";
import { useSnackbar } from "notistack";

const UpdateLocationMain = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [currentSelectedLocation, setCurrentSelectedLocation] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const handleUpdateLocation = async () => {
    setFetch(true);
    setIsLoading(true);
    const url =
      BASE_URL +
      `corpSales/locations/edit?updatedLocationName=${updatedLocation}&originalLocationName=${currentSelectedLocation}`;
    const result = await updateData(url, "");
    if (result.error) {
      enqueueSnackbar("Failed to update location!", {
        variant: "error",
      });
      setIsLoading(false);
      setFetch(false);
    } else {
      enqueueSnackbar("Successfully Updated!", {
        variant: "success",
      });
      setIsLoading(false);
      setFetch(false);
      setUpdatedLocation("");
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
      <MainPageLayoutWithBack title="Update Location">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <LocationList
              setSelectedLocation={setCurrentSelectedLocation}
              fetch={fetch}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              label="Enter Updated Location Name"
              placeholder="Enter Updated Location Name"
              fullWidth
              size="small"
              value={updatedLocation}
              onChange={(e) => {
                setUpdatedLocation(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButtonBlue
              title="Save"
              onClick={() => {
                handleUpdateLocation();
              }}
            />
          </Grid>
        </Grid>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default UpdateLocationMain;
