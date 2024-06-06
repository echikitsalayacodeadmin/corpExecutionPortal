import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Paper,
  Portal,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";
import { fetchHealthRegisterData } from "../../services/healthRegisterService";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import CustomPDFViewer from "../../../assets/customPDFViewer";
import { formatColumnName, getFileType } from "../../../assets/utils";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";
import dayjs from "dayjs";

const HealthRegisterMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchHealthRegisterData(corpId, setIsLoading, setMasterData);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const handleViewFile = (url) => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns2 =
    masterData.length > 0
      ? Object.keys(masterData[0]).map((key) => {
          return {
            field: key,
            headerName: formatColumnName(key),
            width: key === "name" ? 200 : 170,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
              const isUrl =
                params?.value !== null &&
                typeof params?.value === "string" &&
                params?.value.match(/^https?:\/\/\S+/);
              return isUrl ? (
                <Button
                  onClick={() => {
                    handleViewFile(params.value);
                    setFileUrl(params.value);
                    setFileType(getFileType(params.value));
                  }}
                >
                  View
                </Button>
              ) : typeof params?.value === "boolean" &&
                params?.value !== null ? (
                <Typography
                  sx={{
                    fontSize: "15px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.value === true
                    ? "Yes"
                    : params.value === false
                    ? "No"
                    : ""}
                </Typography>
              ) : (
                <RenderExpandableCells {...params} />
              );
            },
          };
        })
      : [];

  const filteredData = useMemo(() => {
    return masterData
      ?.filter((item) =>
        searchedEmployee !== null
          ? item?.name === searchedEmployee?.name &&
            item?.empCode === searchedEmployee?.empCode
          : true
      )
      ?.filter((item) => {
        const testDate = dayjs(item?.testDate).format("YYYY-MM-DD");
        const vitalsCreatedDate = new Date(testDate);
        if (fromDate && toDate) {
          const withinDateRange =
            vitalsCreatedDate >= new Date(fromDate) &&
            vitalsCreatedDate <= new Date(toDate);

          return withinDateRange;
        } else if (fromDate) {
          const withinDateRange =
            vitalsCreatedDate >= new Date(fromDate) &&
            vitalsCreatedDate <= new Date(fromDate);

          return withinDateRange;
        } else {
          return true;
        }
      });
  }, [masterData, searchedEmployee, fromDate, toDate]);

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
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: "78vh",
            paddingBlock: "10px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <CustomAutocomplete
                options={masterData}
                label="Search Employee"
                placeholder="Search Employee"
                value={searchedEmployee}
                getOptionLabel={(employee) =>
                  employee?.empCode + " " + employee?.name
                }
                onChange={(event, newValue, reason) => {
                  setSearchedEmployee(newValue);

                  if (reason === "clear") {
                    setSearchedEmployee(null);
                  }
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <GlobalDateLayout
                initialDate={fromDate}
                setDate={setFromDate}
                label={"From Date"}
                disableFuture={true}
              />
              <GlobalDateLayout
                initialDate={toDate}
                setDate={setToDate}
                label={"To Date"}
                disableFuture={true}
              />
            </Grid>
          </Grid>
          <CustomDataGridLayout
            disableRowSelectionOnClick={true}
            disableSelectionOnClick={true}
            checkboxSelection={false}
            hideFooterPagination={false}
            rows={filteredData}
            rowHeight={30}
            columns={columns2}
            Gridheight={"71vh"}
          />
        </Paper>
      </Box>

      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={openModal}
          onClose={handleCloseModal}
        >
          <DialogTitle>View File</DialogTitle>
          <DialogContent>
            <Box>
              {fileUrl && fileType === "pdf" && (
                <CustomPDFViewer pdfUrl={fileUrl} />
              )}
              {fileUrl && fileType === "image" && (
                <img src={fileUrl} alt="image" width="100%" />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {fileUrl && fileType === "image" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(fileUrl, "_blank");
                }}
              >
                Download
              </Button>
            )}

            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default HealthRegisterMain;
