import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Portal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { getData, saveData } from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import {
  formatColumnName,
  getColumnWidth,
  getFileType,
  getUniqueArrayFromFields,
  sortArrayByDateTime,
} from "../../../../assets/utils";
import CustomPDFViewer from "../../../../assets/customPDFViewer";
import RenderExpandableCells from "../../../../assets/globalDataGridLayout/renderExpandableCells";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { FILE_TYPE } from "../../../assets/reportingConstants";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { isDesktop } from "react-device-detect";
import DetailedUploadedFileViewModal from "./detailedUploadedFileViewModal";

const AllFilesNew = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  selectedFileType,
  handleSelectFileType,
  processReportBtn,
}) => {
  const _storedData = (() => {
    try {
      return (
        JSON.parse(localStorage.getItem("SAVED_S3_ALL_FILES_FILTERS")) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  useEffect(() => {
    setMatchingStatus(_storedData.matchingStatus || { value: "", label: "" });
    setUploadedStatus(_storedData.uploadedStatus || { value: "", label: "" });
    setFromDate(_storedData?.fromDate || null);
    setToDate(_storedData?.toDate || null);
    setTimeField(_storedData?.timeField || { value: "", label: "" });
  }, []);

  const [timeList, setTimeList] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleViewFiles = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    setIsLoading(true);
    const url =
      BASE_URL +
      `org/reporting/upload/reports?corpId=${corpId}&campCycleId=${
        campCycleId || ""
      }`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);

      setMasterData(response?.data);
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      setMasterData([]);
    }
  };

  useEffect(() => {
    handleViewFiles();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const handleViewFile = (url) => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [processField, setProcessField] = useState({ label: "", value: "" });

  const handleProcessReport = (event, newValue, reason) => {
    setProcessField(newValue);
    if (reason === "clear") {
      setProcessField({ label: "", value: "" });
    }
  };

  const proccessReport = async () => {
    setIsLoading(true);
    const url =
      BASE_URL +
      `org/reporting/processUploadedReports?corpId=${corpId}&fileType=${
        selectedFileType.value || ""
      }`;
    const response = await saveData(url);
    if (response.data) {
      setIsLoading(false);

      enqueueSnackbar("Processed successfully.", {
        variant: "success",
      });
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const columns2 =
    masterData?.length > 0
      ? Object.keys(masterData[0])
          ?.filter(
            (key) => key !== "isActive" && key !== "id" && key !== "corpId"
          )
          ?.map((key) => {
            return {
              field: key,
              headerName: formatColumnName(key),
              width: getColumnWidth(key),
              align:
                key === "empName" ||
                key === "nameInReport" ||
                key === "fileName"
                  ? "left"
                  : "center",
              headerAlign:
                key === "empName" ||
                key === "nameInReport" ||
                key === "fileName"
                  ? "left"
                  : "center",
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

  const [matchingStatus, setMatchingStatus] = React.useState({
    value: "",
    label: "",
  });

  const handleChangeMatchingStatus = (event, newValue, reason) => {
    setMatchingStatus(newValue);
    if (reason === "clear") {
      setMatchingStatus({
        value: "",
        label: "",
      });
    }
  };

  const [uploadedStatus, setUploadedStatus] = React.useState({
    value: "",
    label: "",
  });

  const handleChangeUploadedStatus = (event, newValue, reason) => {
    setUploadedStatus(newValue);

    if (reason === "clear") {
      setUploadedStatus({
        value: "",
        label: "",
      });
    }
  };
  const [timeField, setTimeField] = React.useState({
    value: "",
    label: "",
  });

  const handleChangeTimeField = (event, newValue, reason) => {
    setTimeField(newValue);

    if (reason === "clear") {
      setTimeField({
        value: "",
        label: "",
      });
    }
  };
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const filteredData = useMemo(() => {
    return masterData?.filter(
      (item) =>
        (uploadedStatus?.value === "" ||
          item?.orgReportUploadStatus === uploadedStatus?.value) &&
        (selectedFileType?.value === "" ||
          item?.orgEmployeeFileType === selectedFileType?.value) &&
        (matchingStatus?.value === "" ||
          item?.matching === matchingStatus?.value) &&
        (timeField?.value === "" || item?.time === timeField?.value) &&
        (fromDate && toDate
          ? new Date(item?.date) >= new Date(fromDate) &&
            new Date(item?.date) <= new Date(toDate)
          : fromDate
          ? new Date(item?.date) >= new Date(fromDate) &&
            new Date(item?.date) <= new Date(fromDate)
          : true)
    );
  }, [
    masterData,
    uploadedStatus,
    selectedFileType,
    matchingStatus,
    fromDate,
    toDate,
    timeField,
  ]);

  useEffect(() => {
    const savedFilter = {
      uploadedStatus,
      matchingStatus,
      fromDate,
      toDate,
      timeField,
    };
    localStorage.setItem(
      "SAVED_S3_ALL_FILES_FILTERS",
      JSON.stringify(savedFilter)
    );
  }, [uploadedStatus, matchingStatus, fromDate, toDate, timeField]);

  const [showOverallStats, setShowOverallStats] = useState(false);

  const [masterDataConsize, setMasterDataConsize] = useState([]);
  const [totalConsizeDefects, setTotalConsizeDefects] = useState([]);
  const fetchInstantList = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    setIsLoading(true);
    const url =
      BASE_URL +
      `task/uploadfilesstatustracker?corpId=${corpId}&campCycleId=${
        campCycleId || ""
      }`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);
      const newTemp = sortArrayByDateTime(
        response.data.uploadedFileDetailsVMS
      ).map((item, index) => ({
        id: index,
        machineNo: item.machineNo,
        date: item.date,
        time: item.time,
        fileType: item.fileType,
        ...item,
        totalFiles: item.totalFiles,
      }));
      setMasterDataConsize(newTemp);
      setTotalConsizeDefects(
        response.data.totalUploadedFileDetailsVMS.map((item, index) => ({
          id: index,
          date: item.date,
          time: item.time,
          fileType: item.fileType,
          ...item,
        }))
      );
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstantList();
  }, []);

  const renderCell = (params) => {
    const handleClick = (field) => {
      getAllFilesWithFilter(params.row.uploadId);
      setOpenDialog(true);
      setSelectedField(field);
    };

    const renderClickableTypography = (text, field) => (
      <Typography
        onClick={() => handleClick(field)}
        sx={{ color: "#127DDD", cursor: "pointer" }}
      >
        {text || ""}
      </Typography>
    );

    switch (params.field) {
      case "uploaded":
        return renderClickableTypography(params.row.uploaded, "UPLOADED");
      case "matchedNames":
        return renderClickableTypography(
          params.row.matchedWithName,
          "MATCHING"
        );
      case "unmatchedNames":
        return renderClickableTypography(
          params.row.unmatchedNames,
          "NAME_NOT_MATCHING"
        );
      case "duplicateFiles":
        return renderClickableTypography(
          params.row.duplicateFiles,
          "DUPLICATE_FILE"
        );
      case "tokenNotFound":
        return renderClickableTypography(
          params.row.tokenNotFound,
          "TOKEN_NOT_FOUND"
        );
      case "failed":
        return renderClickableTypography(params.row.failed, "FAILED");
      case "processed":
        return renderClickableTypography(params.row.processed, "PROCESSED");
      case "alreadyExistsInDB":
        return renderClickableTypography(
          params.row.alreadyExistsInDB,
          "ALREADY_EXISTS_DB"
        );
      default:
        return <RenderExpandableCells {...params} />;
    }
  };

  const columnsOverAllStats =
    masterDataConsize.length > 0
      ? Object.keys(masterDataConsize[0])
          .filter(
            (key) =>
              !["id", "uploadId", "fileType", "percentFailed"].includes(key)
          )
          .map((key) => ({
            field: key,
            headerName: formatColumnName(key),
            width:
              {
                machineNo: 110,
                date: 110,
                time: 60,
                totalFiles: 120,
                matchedNames: 140,
                unmatchedNames: 160,
                tokenNotFound: 150,
                duplicateFiles: 150,
                failed: 70,
                uploaded: 90,
                processed: 100,
                alreadyExistsInDB: 180,
              }[key] || 200,
            align: "center",
            headerAlign: "center",
            renderCell,
          }))
      : [];

  const columnsFinalStats =
    totalConsizeDefects.length > 0
      ? Object.keys(totalConsizeDefects[0])
          .filter((key) => !["fileType", "id"].includes(key))
          .map((key) => ({
            field: key,
            headerName: formatColumnName(key),
            width:
              {
                date: 110,
                time: 60,
                matchedNames: 140,
                unmatchedNames: 160,
                tokenNotFound: 150,
                duplicateFiles: 150,
                failed: 70,
                uploaded: 90,
                processed: 100,
                totalFiles: 110,
                alreadyExistsInDB: 180,
              }[key] || 200,
            align: "center",
            headerAlign: "center",
          }))
      : [];

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
    <Fragment>
      <Grid
        container
        spacing={1}
        sx={{ marginBlock: 0.5, alignItems: "center" }}
      >
        <Grid item xs={12} lg={3} sx={{ display: "flex", gap: "20px" }}>
          <Chip
            variant={showOverallStats ? "filled" : "outlined"}
            label="Show Overall Stats"
            onClick={() => {
              setShowOverallStats(true);
            }}
          />

          <Chip
            variant={showOverallStats ? "outlined" : "filled"}
            label="Show Detailed Stats"
            onClick={() => {
              setShowOverallStats(false);
            }}
          />
        </Grid>
        {showOverallStats === false ? null : (
          <Grid item xs={12} lg={3}>
            <CustomAutocomplete
              options={FILE_TYPE}
              label={"Select File Type"}
              placeholder="Search File Type"
              value={selectedFileType}
              onChange={handleSelectFileType}
            />
          </Grid>
        )}
      </Grid>
      {showOverallStats ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Instant Result :-
            </Typography>
            {masterDataConsize.filter(
              (item) => item.fileType === selectedFileType?.value?.toUpperCase()
            ).length > 0 ? null : (
              <Typography sx={{ marginLeft: "10px" }}>
                No Files Uploaded Yet
              </Typography>
            )}
          </Box>

          {masterDataConsize.filter(
            (item) => item.fileType === selectedFileType?.value?.toUpperCase()
          ).length > 0 && (
            <Box
              sx={{
                mb: 1,
              }}
            >
              <CustomDataGridLayout
                styles={{
                  // width: isDesktop ? "1240px" : "100%",
                  backgroundColor: "#e7f2fb",
                  borderRadius: "15px",
                }}
                disableRowSelectionOnClick={true}
                disableSelectionOnClick={true}
                checkboxSelection={false}
                hideFooterPagination={false}
                rows={masterDataConsize.filter(
                  (item) =>
                    item.fileType === selectedFileType?.value?.toUpperCase()
                )}
                rowHeight={30}
                columns={columnsOverAllStats}
                Gridheight={"35vh"}
              />
            </Box>
          )}
          <Typography sx={{ fontWeight: "bold" }}>
            Final Instant Result :-
          </Typography>
          {totalConsizeDefects.filter(
            (item) => item.fileType === selectedFileType?.value?.toUpperCase()
          ).length > 0 && (
            <Box
              sx={{
                mb: 1,
              }}
            >
              <CustomDataGridLayout
                styles={{
                  // width: isDesktop ? "1240px" : "100%",
                  backgroundColor: "#e7f2fb",
                  borderRadius: "15px",
                }}
                disableRowSelectionOnClick={true}
                disableSelectionOnClick={true}
                checkboxSelection={false}
                hideFooterPagination={false}
                rows={totalConsizeDefects.filter(
                  (item) =>
                    item.fileType === selectedFileType?.value?.toUpperCase()
                )}
                rowHeight={30}
                columns={columnsFinalStats}
                Gridheight={"24vh"}
              />
            </Box>
          )}
        </>
      ) : (
        <>
          <Grid container spacing={1} sx={{ marginBlock: 0.5 }}>
            <Grid item xs={12} lg={2}>
              <CustomAutocomplete
                options={[
                  { value: "MATCHING", label: "Matching" },
                  { value: "NAME_NOT_MATCHING", label: "Name Not Matching" },
                  { value: "ID_NOT_MATCHING", label: "Id Not Matching" },
                  { value: "NAME_NOT_FOUND", label: "Name Not Found" },
                  { value: "DID_NOTHING", label: "Did Nothing" },
                  { value: "ID_NOT_FOUND", label: "Id Not Found" },
                  { value: "EXCEPTION_OCURRED", label: "Exception Occured" },
                  { value: "NAME_NOT_IN_REPORT", label: "Name Not In Report" },
                ]}
                label={"Filter Matching Status"}
                placeholder="Filter Matching Status"
                value={matchingStatus}
                onChange={handleChangeMatchingStatus}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <CustomAutocomplete
                options={FILE_TYPE}
                label={"Select File Type"}
                placeholder="Search File Type"
                value={selectedFileType}
                onChange={handleSelectFileType}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <GlobalDateLayout
                initialDate={fromDate}
                setDate={setFromDate}
                label={"From Date"}
                disableFuture={true}
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <GlobalDateLayout
                initialDate={toDate}
                setDate={setToDate}
                label={"To Date"}
                disableFuture={true}
              />
            </Grid>
            <Grid item xs={12} lg={1.5}>
              <CustomAutocomplete
                options={
                  getUniqueArrayFromFields(filteredData, "time")?.map(
                    (item, index) => ({
                      label: item,
                      value: item,
                    })
                  ) || []
                }
                label={"Time"}
                placeholder="Time"
                value={timeField}
                onChange={handleChangeTimeField}
              />
            </Grid>
            <Grid item xs={12} lg={2.5}>
              <CustomAutocomplete
                options={[
                  { value: "UPLOADED", label: "Uploaded" },
                  { value: "PROCESSED", label: "Processed" },
                  { value: "FAILED", label: "Failed" },
                ]}
                label={"Uploaded Status"}
                placeholder="Uploaded Status"
                value={uploadedStatus}
                onChange={handleChangeUploadedStatus}
              />
            </Grid>

            {processReportBtn && (
              <Grid item xs={12} lg={2.5}>
                <Button
                  onClick={() => {
                    proccessReport();
                  }}
                  // disabled={processField?.value === "" ? true : false}
                  variant="contained"
                  size="small"
                >
                  Process Report
                </Button>
                {(processField?.value === "" ||
                  selectedFileType.value === "") && (
                  <FormHelperText
                    sx={{ fontSize: "10px", color: "red", m: 0, p: 0 }}
                  >
                    Please Select File Type and Processing Field
                  </FormHelperText>
                )}
              </Grid>
            )}
          </Grid>
          <CustomDataGridLayout
            disableRowSelectionOnClick={true}
            disableSelectionOnClick={true}
            checkboxSelection={false}
            hideFooterPagination={false}
            rows={filteredData}
            rowHeight={30}
            columns={columns2}
            Gridheight={isDesktop ? "49vh" : "100%"}
          />
        </>
      )}
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

      <DetailedUploadedFileViewModal
        open={openDialog}
        masterData={masterData}
        onClose={() => {
          setOpenDialog(false);
          setSelectedField("");
        }}
        selectedField={selectedField}
      />
    </Fragment>
  );
};

export default AllFilesNew;
