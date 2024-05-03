import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../../global/templates/mainPageLayoutWithBack";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isMobile } from "react-device-detect";
import { useSnackbar } from "notistack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useParams } from "react-router-dom";
import { getData, updateData } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";
import { fetchAllTaskList } from "../../../../services/deliveryOrchestratorServices";
import MarkStatusBtn from "../../subComp/markStatusBtn";
import SequenceComp from "./subComp/sequenceComp";
import MasterPdfComp from "./subComp/masterPdfComp";
import {
  CustomTypography,
  CustomTypographyBold,
} from "../../../../../assets/customTypography";
import DeleteSequenceModal from "./subComp/deleteSequenceModal";
import { sortDataByDateTime } from "../../../../../assets/utils";
import Form21Index from "./subComp/form21Index";

const generateSummaryCSV = (data) => {
  let csvContent = `Test Name,Problems(count),Done,Expected,Tech Done\n`;
  for (const testName in data) {
    const testData = data[testName];
    csvContent += `${testName},${testData.problems.length},${testData.done},${testData.expected},${testData.techDone}\n`;
  }
  return csvContent;
};

const generateProblemsCSV = (data) => {
  let csvContent = "";

  for (const [testName, testData] of Object.entries(data)) {
    // Destructuring
    if (testData.problems.length > 0) {
      csvContent += `${testName}\n`;
      csvContent += `empId,name,token\n`;
      csvContent += testData.problems
        .map((problem) => `${problem.empId},${problem.name},${problem.token}\n`)
        .join("");
      csvContent += "\n"; // Add newline for separation
    }
  }

  return csvContent;
};

const generateCombinedCSV = (data) => {
  const summaryContent = generateSummaryCSV(data);
  const problemsContent = generateProblemsCSV(data);
  let combinedContent = `${summaryContent}\n\n`; // Add two newlines for spacing
  combinedContent += problemsContent;
  return combinedContent;
};

const ReportingMain = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [reportingTaskList, setReportingTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTaskList(corpId, setIsLoading, setReportingTaskList, "REPORTING");
  }, []);

  const [masterPdfList, setMasterPdfList] = useState([]);

  const fetchMasterPdfList = async () => {
    setIsLoading(true);
    const url =
      BASE_URL + `org/reporting/masterPdf?corpId=${corpId}&isCompleted=true`;
    const response = await getData(url);
    if (response.data) {
      console.log(response.data);
      setIsLoading(false);
      let temp = response?.data?.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setMasterPdfList(sortDataByDateTime(temp));
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      setMasterPdfList([]);
    }
  };

  useEffect(() => {
    fetchMasterPdfList();
  }, []);

  const handleStatusChange = async (itemId, newValue) => {
    const updateReportingTaskList = reportingTaskList.map((item, index) =>
      item.itemId === itemId ? { ...item, status: newValue } : item
    );
    setReportingTaskList(updateReportingTaskList);

    const itemIndex = reportingTaskList.findIndex(
      (item) => item.itemId === itemId
    );

    const updatedItem = {
      ...updateReportingTaskList[itemIndex],
      status: newValue,
    };
    const url = BASE_URL + `task/item`;
    const response = await updateData(url, updatedItem);

    if (response.error) {
      enqueueSnackbar("An Error Occurred!", { variant: "error" });
    } else {
      enqueueSnackbar("Status Updated Successfully!", { variant: "success" });
      fetchAllTaskList(corpId, setIsLoading, setReportingTaskList, "REPORTING");
    }
  };

  const [manualQcReport, setManualQcReport] = useState([]);
  const fetchManualQC = async () => {
    const url = BASE_URL + "org/reporting/manualQcReport?corpId=" + corpId;
    const result = await getData(url);
    if (result.data) {
      setManualQcReport(result.data.qcMap);
    } else {
      setManualQcReport([]);
    }
  };
  useEffect(() => {
    fetchManualQC();
  }, []);

  const [showResult, setShowResult] = useState({
    achorSeq: false,
    outsideAnchorSeq: false,
    coverendInAchorSeq: false,
    form21: false,
  });

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Reporting">
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
                <Grid item xs={12} lg={6}>
                  <TextField
                    size="small"
                    fullWidth
                    value={""}
                    onChange={() => {}}
                    label="Enter Anchor Report Name"
                    placeholder="Enter Anchor Report Name"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  sx={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "flex-end",
                  }}
                >
                  <MarkStatusBtn
                    notReq={false}
                    selectedStatus={
                      reportingTaskList.find(
                        (item) => item.itemId === "anchorReport"
                      )?.status
                    }
                    setSelectedStatus={(newValue) => {
                      handleStatusChange(
                        reportingTaskList.find(
                          (item) => item.itemId === "anchorReport"
                        )?.itemId,
                        newValue
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <SequenceComp
                    reportingTaskList={reportingTaskList}
                    handleStatusChange={handleStatusChange}
                  />
                </Grid>
              </Grid>
            </Box>
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
              <CustomTypographyBold>Master PDF</CustomTypographyBold>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <Stack
                    sx={{
                      p: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        sx={{
                          marginRight: "15px",
                          backgroundColor: "#127DDD",
                          ":hover": {
                            backgroundColor: "#1f63a1",
                          },
                        }}
                        onClick={() => {
                          setShowResult({
                            ...showResult,
                            coverendInAchorSeq: !showResult.coverendInAchorSeq,
                          });
                        }}
                      >
                        {showResult.coverendInAchorSeq === false ? (
                          <ExpandMoreIcon style={{ color: "#FFF" }} />
                        ) : (
                          <ExpandLessIcon style={{ color: "#FFF" }} />
                        )}
                      </IconButton>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Covered in Anchor Sequence : -
                      </Typography>
                    </Box>
                    <MarkStatusBtn
                      selectedStatus={
                        reportingTaskList.find(
                          (item) => item.itemId === "mpAnchorSeq"
                        )?.status
                      }
                      setSelectedStatus={(newValue) => {
                        handleStatusChange(
                          reportingTaskList.find(
                            (item) => item.itemId === "mpAnchorSeq"
                          )?.itemId,
                          newValue
                        );
                      }}
                    />
                  </Stack>
                  {showResult.coverendInAchorSeq === true && (
                    <MasterPdfComp
                      isAnchorSequence={true}
                      masterPdfList={masterPdfList}
                    />
                  )}
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Stack
                    sx={{
                      p: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        sx={{
                          marginRight: "15px",
                          backgroundColor: "#127DDD",
                          ":hover": {
                            backgroundColor: "#1f63a1",
                          },
                        }}
                        onClick={() => {
                          setShowResult({
                            ...showResult,
                            outsideAnchorSeq: !showResult.outsideAnchorSeq,
                          });
                        }}
                      >
                        {showResult.outsideAnchorSeq === false ? (
                          <ExpandMoreIcon style={{ color: "#FFF" }} />
                        ) : (
                          <ExpandLessIcon style={{ color: "#FFF" }} />
                        )}
                      </IconButton>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Outside Anchor Sequence : -
                      </Typography>
                    </Box>
                    <MarkStatusBtn
                      selectedStatus={
                        reportingTaskList.find(
                          (item) => item.itemId === "mpNonAnchorSeq"
                        )?.status
                      }
                      setSelectedStatus={(newValue) => {
                        handleStatusChange(
                          reportingTaskList.find(
                            (item) => item.itemId === "mpNonAnchorSeq"
                          )?.itemId,
                          newValue
                        );
                      }}
                    />
                  </Stack>
                  {showResult.outsideAnchorSeq === true && (
                    <MasterPdfComp
                      isAnchorSequence={false}
                      masterPdfList={masterPdfList}
                    />
                  )}
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Stack
                    sx={{
                      p: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        sx={{
                          marginRight: "15px",
                          backgroundColor: "#127DDD",
                          ":hover": {
                            backgroundColor: "#1f63a1",
                          },
                        }}
                        onClick={() => {
                          setShowResult({
                            ...showResult,
                            form21: !showResult.form21,
                          });
                        }}
                      >
                        {showResult.form21 === false ? (
                          <ExpandMoreIcon style={{ color: "#FFF" }} />
                        ) : (
                          <ExpandLessIcon style={{ color: "#FFF" }} />
                        )}
                      </IconButton>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Form 21
                      </Typography>
                    </Box>
                    <MarkStatusBtn
                      selectedStatus={
                        reportingTaskList.find(
                          (item) => item.itemId === "form21"
                        )?.status
                      }
                      setSelectedStatus={(newValue) => {
                        handleStatusChange(
                          reportingTaskList.find(
                            (item) => item.itemId === "form21"
                          )?.itemId,
                          newValue
                        );
                      }}
                    />
                  </Stack>
                  {showResult.form21 === true && <Form21Index />}
                </Grid>
              </Grid>
            </Box>

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
              <CustomTypographyBold>Quality Check</CustomTypographyBold>
              <Grid
                container
                spacing={1}
                sx={{ paddingBlock: 2, paddingLeft: 2 }}
              >
                <Grid item xs={12} lg={4}>
                  <CustomTypography>Download QC instruction</CustomTypography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    sx={{ width: "150px" }}
                    variant="contained"
                    size="small"
                  >
                    Download
                  </Button>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <MarkStatusBtn
                    selectedStatus={
                      reportingTaskList.find(
                        (item) => item.itemId === "qcInstruction"
                      )?.status
                    }
                    setSelectedStatus={(newValue) => {
                      handleStatusChange(
                        reportingTaskList.find(
                          (item) => item.itemId === "qcInstruction"
                        )?.itemId,
                        newValue
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <CustomTypography>Manual QC Status</CustomTypography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    sx={{ width: "150px" }}
                    variant="contained"
                    size="small"
                  >
                    Copy Link
                  </Button>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <MarkStatusBtn
                    selectedStatus={
                      reportingTaskList.find(
                        (item) => item.itemId === "qcManual"
                      )?.status
                    }
                    setSelectedStatus={(newValue) => {
                      handleStatusChange(
                        reportingTaskList.find(
                          (item) => item.itemId === "qcManual"
                        )?.itemId,
                        newValue
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <CustomTypography>Download M-QC Report</CustomTypography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    onClick={() => {
                      const combinedCsv = generateCombinedCSV(manualQcReport);
                      const csvData = new Blob([combinedCsv], {
                        type: "text/csv",
                      });
                      const csvUrl = window.URL.createObjectURL(csvData);
                      const hiddenElement = document.createElement("a");
                      hiddenElement.href = csvUrl;
                      hiddenElement.target = "_blank";
                      hiddenElement.download = `test_result.csv`;
                      hiddenElement.click();
                    }}
                    sx={{ width: "150px" }}
                    variant="contained"
                    size="small"
                  >
                    Download
                  </Button>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <MarkStatusBtn
                    selectedStatus={
                      reportingTaskList.find(
                        (item) => item.itemId === "qcManualReport"
                      )?.status
                    }
                    setSelectedStatus={(newValue) => {
                      handleStatusChange(
                        reportingTaskList.find(
                          (item) => item.itemId === "qcManualReport"
                        )?.itemId,
                        newValue
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <CustomTypography>Tech QC Status</CustomTypography>
                </Grid>
                <Grid item xs={12} lg={4}></Grid>
                <Grid item xs={12} lg={4}>
                  <MarkStatusBtn
                    selectedStatus={
                      reportingTaskList.find((item) => item.itemId === "qcTech")
                        ?.status
                    }
                    setSelectedStatus={(newValue) => {
                      handleStatusChange(
                        reportingTaskList.find(
                          (item) => item.itemId === "qcTech"
                        )?.itemId,
                        newValue
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <CustomTypography>Download T-QC Report</CustomTypography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    sx={{ width: "150px" }}
                    variant="contained"
                    size="small"
                  >
                    Download
                  </Button>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <MarkStatusBtn
                    selectedStatus={
                      reportingTaskList.find(
                        (item) => item.itemId === "qcTechReport"
                      )?.status
                    }
                    setSelectedStatus={(newValue) => {
                      handleStatusChange(
                        reportingTaskList.find(
                          (item) => item.itemId === "qcTechReport"
                        )?.itemId,
                        newValue
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </MainPageLayoutWithBack>
      <DeleteSequenceModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Fragment>
  );
};
export default ReportingMain;
