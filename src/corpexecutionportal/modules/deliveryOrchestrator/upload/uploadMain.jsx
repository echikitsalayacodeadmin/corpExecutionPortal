import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { MACHINE_NUMBER, UPLOAD_SEQ } from "../../../assets/corpConstants";
import { useFileUpload } from "use-file-upload";
import { getData, updateData, uploadFile } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import RenderExpandableCells from "../../../../assets/globalDataGridLayout/renderExpandableCells";
import {
  downloadCsv,
  formatColumnName,
  sortArrayByDateTime,
} from "../../../../assets/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useSnackbar } from "notistack";
import ViewFilesModal from "./subComp/viewFilesModal";
import DetailedUploadedFileViewModal from "./subComp/detailedUploadedFileViewModal";
import MarkStatusBtn from "../subComp/markStatusBtn";
import {
  fetchAllTaskList,
  fetchSuperMasterData,
} from "../../../services/deliveryOrchestratorServices";
import { isDesktop, isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

const FileTypeUpload = ({
  data,
  fileType,
  selectFiles,
  selectedFiles,
  setSelectedFiles,
  handleSubmitFiles,
  masterDataConsize,
  corpId,
  handleStatusChange,
  showResult,
  setShowResult,
}) => {
  const [showSelectedFiles, setShowSelectedFiles] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  // const [masterDataConsize, setMasterDataConsize] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState({
    value: "",
    label: "",
  });
  const [processField, setProcessField] = useState({ label: "", value: "" });
  const handleProcessReport = (event, newValue, reason) => {
    setProcessField(newValue);
    if (reason === "clear") {
      setProcessField({ label: "", value: "" });
    }
  };

  const handleDeleteFile = (fileType, name) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = prevSelectedFiles[fileType.toUpperCase()].filter(
        (file) => file.name !== name
      );
      return {
        ...prevSelectedFiles,
        [fileType.toUpperCase()]: updatedFiles,
      };
    });
  };

  const [masterData, setMasterData] = useState([]);
  const getAllFilesWithFilter = async (uploadId) => {
    setIsLoading(true);
    const url = `https://apitest.uno.care/api/org/reporting/upload/reports?corpId=${corpId}&campCycleId=138858`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);
      setMasterData(response.data.filter((item) => item.uploadId === uploadId));
    } else {
      setIsLoading(false);
      setMasterData([]);
    }
  };

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

  const columns2 =
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
              key === "machineNo"
                ? 110
                : key === "date"
                ? 110
                : key === "time"
                ? 60
                : key === "totalFiles"
                ? 120
                : key === "matchedNames"
                ? 140
                : key === "unmatchedNames"
                ? 160
                : key === "tokenNotFound"
                ? 150
                : key === "duplicateFiles"
                ? 150
                : key === "failed"
                ? 70
                : key === "uploaded"
                ? 90
                : key === "processed"
                ? 100
                : key === "alreadyExistsInDB"
                ? 180
                : 200,
            align: "center",
            headerAlign: "center",
            renderCell,
          }))
      : [];

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
    <Box
      sx={{
        boxSizing: "border-box",
        background: "#FFFFFF",
        border: "0.5px solid #A6A6A6",
        borderRadius: 5,
        p: 2,
        gap: 10,
        mb: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid item lg={1} xs={12}>
          <Box
            sx={{
              paddingInline: "10px",
              border: "1px solid #000",
              borderRadius: "15px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>{fileType}</Typography>
          </Box>
        </Grid>
        <Grid item lg={1.5} xs={12}>
          <CustomAutocomplete
            label="Machine No"
            placeholder="Machine No"
            options={MACHINE_NUMBER}
            value={selectedMachine}
            onChange={(event, newValue, reason) => {
              setSelectedMachine(newValue);
              if (reason === "clear") {
                setSelectedMachine({
                  value: "",
                  label: "",
                });
              }
            }}
            required={true}
            asterickColor={"red"}
          />
        </Grid>
        <Grid
          item
          lg={1}
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            // disabled={selectedMachine.value === "" ? true : false}
            variant="contained"
            size="small"
            endIcon={<InsertDriveFileIcon />}
            sx={{ borderRadius: "15px", height: "40px" }}
            onClick={() =>
              selectFiles({ multiple: true, accept: "*" }, (files) => {
                setSelectedFiles((prevSelectedFiles) => ({
                  ...prevSelectedFiles,
                  [fileType.toUpperCase()]: [
                    ...(prevSelectedFiles[fileType.toUpperCase()] || []),
                    ...files,
                  ],
                }));
              })
            }
          >
            Select
          </Button>
          {/* {selectedMachine.value === "" && (
              <FormHelperText sx={{ color: "red" }}>
                Please Select Machine No
              </FormHelperText>
            )} */}
        </Grid>
        <Grid
          item
          lg={1}
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* {selectedFiles?.[fileType.toUpperCase()]?.length > 0 && (
            <Fragment> */}
          <Box
            sx={{
              paddingInline: "10px",
              border: "1px solid #000",
              borderRadius: "15px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              Total Files :{" "}
              {selectedFiles?.[fileType.toUpperCase()]?.length || 0}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={2}
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            disabled={
              selectedFiles?.[fileType.toUpperCase()]?.length > 0 ? false : true
            }
            endIcon={<InsertDriveFileIcon />}
            onClick={() => setShowSelectedFiles(true)}
            variant="contained"
            size="small"
            sx={{ borderRadius: "15px", height: "40px" }}
          >
            View Selected
          </Button>
          {/* </Fragment>
          )} */}
        </Grid>

        <Grid
          item
          lg={2.5}
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <CustomAutocomplete
            asterickColor={"red"}
            required={true}
            options={[
              { value: "EMP_ID", label: "Emp Id" },
              { value: "TOKEN_NUMBER", label: "Token Number" },
            ]}
            styles={{ width: "180px" }}
            label={"Processing Field"}
            placeholder="Processing Field"
            value={processField}
            onChange={handleProcessReport}
          />
          <Button
            endIcon={<InsertDriveFileIcon />}
            disabled={
              selectedFiles?.[fileType.toUpperCase()]?.length > 0 ? false : true
            }
            onClick={() =>
              handleSubmitFiles(
                fileType.toUpperCase(),
                selectedMachine.value,
                processField.value
              )
            }
            variant="contained"
            size="small"
            sx={{ borderRadius: "15px", height: "40px" }}
          >
            Upload
          </Button>
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <MarkStatusBtn
            notReq={true}
            selectedStatus={data.status}
            setSelectedStatus={(newValue) => {
              handleStatusChange(data.itemId, newValue);
            }}
          />
        </Grid>
        <Grid item lg={4.5} xs={12}></Grid>

        <Grid item xs={12} lg={12}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              sx={{
                backgroundColor: "#127DDD",
                ":hover": {
                  backgroundColor: "#1f63a1",
                },
              }}
              onClick={() => {
                fileType === "PFT"
                  ? setShowResult({ ...showResult, pft: !showResult.pft })
                  : fileType === "AUDIOMETRY"
                  ? setShowResult({
                      ...showResult,
                      audiometry: !showResult.audiometry,
                    })
                  : fileType === "ECG"
                  ? setShowResult({ ...showResult, ecg: !showResult.ecg })
                  : fileType === "BLOODTEST"
                  ? setShowResult({
                      ...showResult,
                      bloodtest: !showResult.bloodtest,
                    })
                  : setShowResult({ ...showResult, xray: !showResult.xray });
              }}
            >
              {showResult?.[fileType?.toLowerCase()] === false ? (
                <ExpandMoreIcon style={{ color: "#FFF" }} />
              ) : (
                <ExpandLessIcon style={{ color: "#FFF" }} />
              )}
            </IconButton>
            <Button
              onClick={() => {
                let csvContent = "";

                // Get fileTypeData based on the provided fileType
                const fileTypeData = data?.[`${fileType.toLowerCase()}Defect`];

                // Check if fileTypeData exists
                if (fileTypeData) {
                  // Add audiometryDefectStats column and value
                  csvContent += `${fileType.toLowerCase()}DefectStats\n`;

                  csvContent +=
                    fileTypeData?.[`${fileType.toLowerCase()}DefectStats`] +
                    "\n\n";
                  // Add audiometryDefectEmpStats column headers
                  csvContent += `${fileType.toLowerCase()}DefectEmpStats\n`;

                  const empStats =
                    fileTypeData?.[`${fileType.toLowerCase()}DefectEmpStats`];
                  if (empStats && empStats.length > 0) {
                    csvContent += Papa.unparse(empStats);
                    // const keys = Object.keys(empStats[0]);
                    // csvContent += keys.join("\t") + "\n";

                    // // Add audiometryDefectEmpStats data rows
                    // empStats.forEach((emp) => {
                    //   const values = keys.map((key) => emp[key]);
                    //   csvContent += values.join("\t") + "\n";
                    // });
                  }
                }

                const csvData = new Blob([csvContent], { type: "text/csv" });
                const csvUrl = window.URL.createObjectURL(csvData);
                const hiddenElement = document.createElement("a");
                hiddenElement.href = csvUrl;
                hiddenElement.target = "_blank";
                hiddenElement.download = `${fileType.toLowerCase()}Defect.csv`;
                hiddenElement.click();
              }}
              variant="contained"
              size="small"
              sx={{ borderRadius: "15px", height: "40px", marginLeft: "15px" }}
            >
              Get {fileType} Defects
            </Button>
          </Box>
          {showResult?.[fileType?.toLowerCase()] && (
            <>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Instant Result :-
                </Typography>
                {masterDataConsize.filter(
                  (item) => item.fileType === fileType.toUpperCase()
                ).length > 0 ? null : (
                  <Typography sx={{ marginLeft: "10px" }}>
                    No Files Uploaded Yet
                  </Typography>
                )}
              </Box>

              {masterDataConsize.filter(
                (item) => item.fileType === fileType.toUpperCase()
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
                      (item) => item.fileType === fileType.toUpperCase()
                    )}
                    rowHeight={30}
                    columns={columns2}
                    Gridheight={"44vh"}
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <ViewFilesModal
        fileType={fileType}
        open={showSelectedFiles}
        onClose={() => setShowSelectedFiles(false)}
        selectedFiles={selectedFiles?.[fileType.toUpperCase()]}
        handleDeleteFile={handleDeleteFile}
      />
      <DetailedUploadedFileViewModal
        open={openDialog}
        masterData={masterData}
        onClose={() => {
          setOpenDialog(false);
          setSelectedField("");
        }}
        selectedField={selectedField}
      />
    </Box>
  );
};

const UploadMain = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [showResult, setShowResult] = useState({
    pft: false,
    audiometry: false,
    bloodtest: false,
    ecg: false,
    xray: false,
  });
  const [selectedFiles, setSelectedFiles] = useState({});
  const [files, selectFiles] = useFileUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [masterDataConsize, setMasterDataConsize] = useState([]);

  const [reportingTask, setReportingTask] = useState([]);

  useEffect(() => {
    fetchAllTaskList(
      corpId,
      setIsLoading,
      setReportingTask,
      "UPLOADED",
      UPLOAD_SEQ
    );
  }, []);

  const [defects, setDefects] = useState([]);
  const fetchDefects = async () => {
    const url = BASE_URL + "task/defects?corpId=" + corpId;
    const result = await getData(url);
    if (result.data) {
      setDefects(result.data);
    } else {
      setDefects([]);
    }
  };

  const fetchInstantList = async () => {
    setIsLoading(true);
    const url = `https://apitest.uno.care/api/task/uploadfilesstatustracker?corpId=${corpId}`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);
      const newTemp = sortArrayByDateTime(response.data).map((item, index) => ({
        id: index,
        machineNo: item.machineNo,
        date: item.date,
        time: item.time,
        fileType: item.fileType,
        ...item,
        totalFiles: item.totalFiles,
        // totalFiles: item.totalFiles,
        // matchedNames: item.matchedNames,
        // unmatchedNames: item.unmatchedNames,
        // tokenNotFound: item.tokenNotFound,
        // duplicates: item.duplicates,
        // failed: item.failed,
        // uploaded: item.uploaded,
        // processed: item.processed,
        // uploadId: item.uploadId,
      }));
      setMasterDataConsize(newTemp);
    } else {
      setIsLoading(false);
    }
  };

  const [superMasterData, setSuperMasterData] = useState([]);

  useEffect(() => {
    fetchSuperMasterData(corpId, setIsLoading, setSuperMasterData);
    fetchInstantList();
  }, []);

  const reportingTaskNew = reportingTask.map((item, index) => ({
    ...item,
    pftDefect: {
      pftDefectStats: superMasterData.filter(
        (item) => item.pftToggle === true && item.pftStatus === "NOT_UPLOADED"
      ).length,
      pftDefectEmpStats: superMasterData
        .filter(
          (item) => item.pftToggle === true && item.pftStatus === "NOT_UPLOADED"
        )
        .map((item, index) => ({
          empId: item.empId,
          name: item.name,
          age: item.age,
          gender: item.gender,
          tokenNumber: item.tokenNumber,
          packageName: item.packageName,
          pftToggle: item.pftToggle,
          pftStatus: item.pftStatus,
        })),
    },

    audiometryDefect: {
      audiometryDefectStats: superMasterData.filter(
        (item) =>
          item.audiometryToggle === true &&
          item.audiometryStatus === "NOT_UPLOADED"
      ).length,
      audiometryDefectEmpStats: superMasterData
        .filter(
          (item) =>
            item.audiometryToggle === true &&
            item.audiometryStatus === "NOT_UPLOADED"
        )
        .map((item, index) => ({
          empId: item.empId,
          name: item.name,
          age: item.age,
          gender: item.gender,
          tokenNumber: item.tokenNumber,
          packageName: item.packageName,
          audiometryToggle: item.audiometryToggle,
          audiometryStatus: item.audiometryStatus,
        })),
    },

    ecgDefect: {
      ecgDefectStats: superMasterData.filter(
        (item) => item.ecgToggle === true && item.ecgStatus === "NOT_UPLOADED"
      ).length,
      ecgDefectEmpStats: superMasterData
        .filter(
          (item) => item.ecgToggle === true && item.ecgStatus === "NOT_UPLOADED"
        )
        .map((item, index) => ({
          empId: item.empId,
          name: item.name,
          age: item.age,
          gender: item.gender,
          tokenNumber: item.tokenNumber,
          packageName: item.packageName,
          ecgToggle: item.ecgToggle,
          ecgStatus: item.ecgStatus,
        })),
    },

    bloodtestDefect: {
      bloodtestDefectStats: superMasterData.filter(
        (item) =>
          item.bloodToggle === true && item.bloodStatus === "NOT_UPLOADED"
      ).length,
      bloodtestDefectEmpStats: superMasterData
        .filter(
          (item) =>
            item.bloodToggle === true && item.bloodStatus === "NOT_UPLOADED"
        )
        .map((item, index) => ({
          empId: item.empId,
          name: item.name,
          age: item.age,
          gender: item.gender,
          tokenNumber: item.tokenNumber,
          packageName: item.packageName,
          bloodToggle: item.bloodToggle,
          bloodStatus: item.bloodStatus,
        })),
    },

    xrayDefect: {
      xrayDefectStats: superMasterData.filter(
        (item) => item.xrayToggle === true && item.srayStatus === "NOT_UPLOADED"
      ).length,
      xrayDefectEmpStats: superMasterData
        .filter(
          (item) =>
            item.xrayToggle === true && item.xrayStatus === "NOT_UPLOADED"
        )
        .map((item, index) => ({
          empId: item.empId,
          name: item.name,
          age: item.age,
          gender: item.gender,
          tokenNumber: item.tokenNumber,
          packageName: item.packageName,
          xrayToggle: item.xrayToggle,
          xrayStatus: item.xrayStatus,
        })),
    },
  }));

  const handleSubmitFiles = async (fileType, machineNo, processField) => {
    const campCycleId = "138858";
    setIsLoading(true);
    let formData = new FormData();
    Object.keys(selectedFiles).forEach((fileType) => {
      selectedFiles[fileType].forEach((file, index) => {
        formData.append(`files`, file.file);
      });
    });
    const url =
      BASE_URL +
      `task/uploadFiles?corpId=${corpId}&fileType=${fileType}&machineNo=${machineNo}&orgReportProcessingField=${processField}`;
    const result = await uploadFile(url, formData);
    if (result?.error) {
      enqueueSnackbar("An error occured!", {
        variant: "error",
      });
      setIsLoading(false);
    } else {
      console.log({ result });
      console.log({ SUCCESSResult: result?.data });
      enqueueSnackbar("Successfully Uploaded!", {
        variant: "success",
      });
      setShowResult({
        ...showResult,
        [fileType?.replace(/_/g, "")?.toLowerCase()]: true,
      });
      setSelectedFiles([]);
      setIsLoading(false);
      fetchInstantList();
    }
  };

  const handleStatusChange = async (itemId, newValue) => {
    const updateReportingTask = reportingTask.map((item, index) =>
      item.itemId === itemId ? { ...item, status: newValue } : item
    );
    setReportingTask(updateReportingTask);

    const itemIndex = reportingTask.findIndex((item) => item.itemId === itemId);

    const updatedItem = { ...updateReportingTask[itemIndex], status: newValue };
    const url = BASE_URL + `task/item`;
    const response = await updateData(url, updatedItem);

    if (response.error) {
      enqueueSnackbar("An Error Occurred!", { variant: "error" });
    } else {
      enqueueSnackbar("Status Updated Successfully!", { variant: "success" });
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
      <MainPageLayoutWithBack title="Upload">
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            backgroundColor: "#F5F5F5",
            minHeight: "80vh",
            borderRadius: 5,
          }}
        >
          <Box sx={{ p: 2 }}>
            {reportingTaskNew
              .filter((val) => val.itemId !== "printStatus")
              .map((obj, index) => (
                <FileTypeUpload
                  key={index}
                  data={obj}
                  fileType={obj.itemName
                    ?.replace(/\s/g, "")
                    ?.trim()
                    ?.toUpperCase()}
                  selectFiles={selectFiles}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  handleSubmitFiles={handleSubmitFiles}
                  masterDataConsize={masterDataConsize}
                  corpId={corpId}
                  handleStatusChange={handleStatusChange}
                  showResult={showResult}
                  setShowResult={setShowResult}
                />
              ))}
          </Box>
        </Container>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default UploadMain;
