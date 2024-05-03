import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../../../assets/constants";
import { getData, uploadFile } from "../../../../../../assets/corpServices";
import GlobalDateLayout from "../../../../../../../assets/globalDateLayout/globalDateLayout";

const Form21Upload = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [form21Data, setForm21Data] = useState({});
  const [date, setDate] = useState(new Date()?.toISOString().split("T")[0]);

  const fetchForm21Data = async () => {
    const url =
      BASE_URL +
      `org/corpUploadStatusTracker?corpId=${corpId}&corpUploadType=FORM_21`;
    const employees = await getData(url, "");

    if (employees.error) {
      console.log(employees.error);
    } else {
      setForm21Data(employees.data?.listOfForm21);
    }
  };

  useEffect(() => {
    fetchForm21Data();
  }, [corpId]);

  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    }

    setIsLoading(true);
    const propertyName = "file";
    const updatedFormData = new FormData();
    updatedFormData.append(propertyName, file);
    const url =
      BASE_URL +
      `org/corpUpload?corpId=${corpId}&corpUploadType=FORM_21&formCreateDate=${date}`;

    const result = await uploadFile(url, updatedFormData);

    if (result.data) {
      setIsLoading(false);
      console.log("SUCCESS");
      enqueueSnackbar("Successfully Uploaded!", {
        variant: "success",
      });
      fetchForm21Data();
    } else {
      setIsLoading(false);
      console.log("ERROR");
      enqueueSnackbar("An error Occured!", {
        variant: "error",
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
      <Box sx={{ marginBlock: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={3}>
            <GlobalDateLayout
              label="Select Date"
              setDate={setDate}
              initialDate={date}
              disableFuture={true}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                paddingInline: "10px",
                paddingBlock: "2px",
                border: "1px solid #777777",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <Button
                sx={{ m: 0, p: "5px" }}
                size="small"
                color="primary"
                onClick={(e) => handleUpload(e)}
              >
                Upload File
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>

        <Box
          sx={{
            paddingInline: "20px",
            paddingBlock: "10px",
            overflowY: "scroll",
            maxHeight: "55vh",
            borderRadius: "15px",
            border: "1px solid #666",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          {form21Data && form21Data.length > 0 ? (
            form21Data.map((item, index) => (
              <Grid container key={index} spacing={1}>
                <Grid item xs={6} lg={2}>
                  <Button
                    variant="contained"
                    onClick={() => window.open(item.reportURL, "_blank")}
                    sx={{ marginBlock: "10px" }}
                  >
                    PDF {index + 1}
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={10}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {item.formCreatedDate}
                </Grid>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBlock: 20,
              }}
            >
              <Typography
                variant="body1"
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                No data found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default Form21Upload;
