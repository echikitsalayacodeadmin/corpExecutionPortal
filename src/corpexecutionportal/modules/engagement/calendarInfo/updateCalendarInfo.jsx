import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteData,
  getData,
  updateData,
  updateDataFile,
} from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { useSnackbar } from "notistack";
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";

const extractFirstDate = (dateRange) => {
  if (!dateRange) {
    return null;
  }
  if (dateRange.includes(" to ")) {
    const dates = dateRange.split(" to ");
    return dates[0];
  }
  return dateRange;
};

const UpdateCalendarInfo = () => {
  const [files, selectFiles] = useFileUpload();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [calendarList, setCalendarList] = useState([]);
  const getCalendarList = async () => {
    const url = BASE_URL + `org/orgconfig/list?orgConfigType=HEALTH_DAYS`;
    const result = await getData(url);
    if (result.error) {
      setCalendarList([]);
    } else {
      setCalendarList(result.data);
      console.log({ days: result.data.map((item) => item.name) });
    }
  };

  useEffect(() => {
    getCalendarList();
  }, []);

  const [calendarDetail, setCalendarDetail] = useState({
    id: "",
    name: "",
    date: null,
    imageUrl: "",
  });

  const handleUpdated = async () => {
    setIsLoading(true);
    const formData = new FormData();
    {
      calendarDetail.id ? formData.append("id", calendarDetail.id) : null;
    }
    {
      calendarDetail.name ? formData.append("name", calendarDetail.name) : null;
    }
    {
      calendarDetail.date
        ? formData.append("date", calendarDetail?.date)
        : null;
    }

    formData.append("orgConfigType", "HEALTH_DAYS");

    {
      calendarDetail.imageUrl.file
        ? formData.append("file", calendarDetail?.imageUrl?.file)
        : null;
    }

    const url = BASE_URL + `org/orgrconfig/update`;
    const result = await updateDataFile(url, formData);
    if (result.error) {
      console.log(result.error);
      setIsLoading(false);
    } else {
      enqueueSnackbar("Updated successfully.", {
        variant: "success",
      });
      setIsLoading(false);
      setCalendarDetail({
        id: "",
        name: "",
        date: null,
        imageUrl: "",
      });
      setSelectedCalendar("");
      getCalendarList();
    }
  };

  const handleDeleteCalenderDay = async () => {
    const url = BASE_URL + `org/orgconfig/delete?id=${selectedCalendar.id}`;
    const result = await deleteData(url);
    if (result.error) {
      enqueueSnackbar("An error occured.", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Deleted successfully.", {
        variant: "success",
      });
      setSelectedCalendar("");
      setCalendarDetail({
        id: "",
        name: "",
        date: null,
        imageUrl: "",
      });
      getCalendarList();
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
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CustomAutocomplete
            label="Select Day"
            placeholder={"Select Day"}
            options={calendarList}
            value={selectedCalendar}
            getOptionLabel={(option) => option.name || ""}
            onChange={(event, newValue, reason) => {
              setSelectedCalendar(newValue);
              setCalendarDetail({
                ...newValue,
                date: extractFirstDate(newValue?.date),
                imageUrl: { source: newValue?.fileUrl || "" },
              });

              if (reason === "clear") {
                setSelectedCalendar("");
                setCalendarDetail({
                  id: "",
                  name: "",
                  date: null,
                  imageUrl: "",
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Select Day"
            placeholder="Select Day"
            size="small"
            fullWidth
            value={calendarDetail.name || ""}
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
            gap: 3,
          }}
        >
          <CustomButtonBlue
            disabled={selectedCalendar ? false : true}
            title="Save"
            onClick={() => {
              handleUpdated();
            }}
          />
          <CustomButtonBlue
            disabled={selectedCalendar ? false : true}
            styles={{
              backgroundColor: "red",
              ":hover": {
                backgroundColor: "red",
              },
            }}
            title="Delete"
            onClick={() => {
              handleDeleteCalenderDay();
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UpdateCalendarInfo;
