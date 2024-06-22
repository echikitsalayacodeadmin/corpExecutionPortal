import React, { Fragment, useState } from "react";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { Box, CircularProgress, Grid, TextField } from "@mui/material";
import {
  saveData,
  updateDataFile,
  uploadFile,
} from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";

const CalendarInfoAdd = () => {
  const [files, selectFiles] = useFileUpload();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [calendarDetail, setCalendarDetail] = useState({
    name: "",
    imageUrl: "",
    date: "",
  });

  const handleAdd = async () => {
    setIsLoading(true);
    const formData = new FormData();

    calendarDetail.name ? formData.append("name", calendarDetail.name) : null;

    calendarDetail.date ? formData.append("date", calendarDetail?.date) : null;

    formData.append("orgConfigType", "HEALTH_DAYS");

    calendarDetail.imageUrl.file
      ? formData.append("file", calendarDetail.imageUrl.file)
      : null;

    const url = BASE_URL + `org/orgconfig/add`;
    const result = await uploadFile(url, formData);
    if (result.error) {
      setIsLoading(false);
      console.log(result.error);
    } else {
      setIsLoading(false);
      enqueueSnackbar("Added successfully.", {
        variant: "success",
      });
      setCalendarDetail({
        name: "",
        imageUrl: "",
        date: "",
      });
    }
  };

  console.log({ calendarDetail });

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
            label="Day Name"
            placeholder="Day Name"
            size="small"
            fullWidth
            value={calendarDetail.name}
            onChange={(e) => {
              setCalendarDetail({
                ...calendarDetail,
                name: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <GlobalDateLayout
            label="Day Date"
            formValues={calendarDetail}
            setFormValues={setCalendarDetail}
            property={"date"}
            initialDate={calendarDetail.date}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UploadFile
            title="Upload Icon"
            styles={{ height: "40px", borderRadius: "15px" }}
            formValues={calendarDetail}
            setFormValues={setCalendarDetail}
            property={"imageUrl"}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                const filedata = { name, size, source, file };
                setCalendarDetail((prevcalendarDetail) => ({
                  ...prevcalendarDetail,
                  imageUrl: filedata, // or source if you prefer
                }));
              })
            }
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
            disabled={calendarDetail.name ? false : true}
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

export default CalendarInfoAdd;
