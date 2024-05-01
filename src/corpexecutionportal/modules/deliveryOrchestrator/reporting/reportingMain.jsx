import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isMobile } from "react-device-detect";
import { getData, updateData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";
import {
  CustomTypography,
  CustomTypographyBold,
} from "../../../../assets/customTypography";
import DeleteSequenceModal from "./subComp/deleteSequenceModal";
import MarkStatusBtn from "../subComp/markStatusBtn";
import MasterPdfComp from "./subComp/masterPdfComp";
import SequenceComp from "./subComp/sequenceComp";
import { fetchAllTaskList } from "../../../services/deliveryOrchestratorServices";
import { sortDataByDateTime } from "../../../../assets/utils";
import Form21Index from "./subComp/form21Index";
import { useParams } from "react-router-dom";

const ReportingMain = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const [openDialog, setOpenDialog] = useState(false);
  const enqueueSnackbar = useSnackbar();
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
                    <Typography sx={{ fontWeight: "bold" }}>
                      Covered in Anchor Sequence : -
                    </Typography>
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
                  <MasterPdfComp
                    isAnchorSequence={true}
                    masterPdfList={masterPdfList}
                  />
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
                    <Typography sx={{ fontWeight: "bold" }}>
                      Outside Anchor Sequence : -
                    </Typography>
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

                  <MasterPdfComp
                    isAnchorSequence={false}
                    masterPdfList={masterPdfList}
                  />
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
                    <Typography sx={{ fontWeight: "bold" }}>Form 21</Typography>
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

                  <Form21Index />
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
