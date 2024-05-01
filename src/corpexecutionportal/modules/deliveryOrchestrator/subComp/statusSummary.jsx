import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CustomTypographyBold } from "../../../../assets/customTypography";
import { fetchAllTaskList } from "../../../services/deliveryOrchestratorServices";
import { sortBySequence } from "../../../../assets/utils";
import {
  DATASHEET_SEQ,
  DISPATCH_SEQ,
  UPLOAD_SEQ,
} from "../../../assets/corpConstants";

const generateStepString = (obj) => {
  return obj.itemId === "createGoogleSheet"
    ? "Google Sheet Created"
    : obj.itemId === "pasteLink"
    ? "Link Pasted"
    : obj.itemId === "tabHrData"
    ? "HR List Tab Added"
    : obj.itemId === "uploadHrList"
    ? "HR List Uploaded"
    : obj.itemId === "tabSmdToggle"
    ? "SMD Toggle Tab Added"
    : obj.itemId === "copySmdToggle"
    ? "Downloaded SMD Toggle"
    : obj.itemId === "tabDefectExecution"
    ? "Defect Execution Tab Added"
    : obj.itemId === "copyDefectExecution"
    ? "Downloaded Defect Execution"
    : obj.itemId === "tabSmdUpload"
    ? "SMD Upload Tab Added"
    : obj.itemId === "copySmdUpload"
    ? "Downloaded SMD Upload"
    : obj.itemId === "tabDefectUpload"
    ? "Defect Upload Tab Created"
    : obj.itemId === "copyDefectUpload"
    ? "Downloaded Defect Upload"
    : obj.itemId === "tabSmdFinal"
    ? "SMD Final Tab Created"
    : obj.itemId === "copySmdFinal"
    ? "Downloaded SMD Final"
    : obj.itemId === "tabDefectFinal"
    ? "Defect Final Tab Created"
    : obj.itemId === "copyDefectFinal"
    ? "Downloaded Defect Final"
    : obj.itemId === "tabAnchorSequence"
    ? "Anchor Sequence Tab Created"
    : obj.itemId === "tabSnop"
    ? "SNOP Tab Created"
    : obj.itemId === "ecgReport"
    ? `ECG Uploaded     Defect Fixed`
    : obj.itemId === "audiometryReport"
    ? `Audiometry Uploaded    Defect Fixed`
    : obj.itemId === "bloodTestReport"
    ? `Blood Test Uploaded    Defect Fixed`
    : obj.itemId === "pftReport"
    ? `PFT Uploaded    Defect Fixed`
    : obj.itemId === "xrayReport"
    ? `Xray Uploaded    Defect Fixed`
    : obj.itemId === "boxing"
    ? `Boxing Done`
    : obj.itemId === "scan"
    ? `Scan Done`
    : obj.itemId === "dowloadIndex"
    ? `Downloaded Index `
    : obj.itemId === "printIndex"
    ? `Index Printed`
    : obj.itemId === "pasteIndex"
    ? `Index Pasted`
    : obj.itemId === "errorReport"
    ? `Downloaded Error Report`
    : obj.itemId === "generateSnopMail"
    ? `Downloaded Snop Mail `
    : obj.itemId === "sendMail"
    ? `Mail Sent`
    : obj.itemId === "createInvoice"
    ? `Invoice Created`
    : obj.itemId === "sendDelivery"
    ? `Sent For Delivery`
    : obj.itemId === "printStatus"
    ? `Print Status Done`
    : obj.itemId === "anchorReport"
    ? `Anchor Report Name`
    : obj.itemId === "uploadAnchorSeq"
    ? `Anchor Sequence Uploaded`
    : obj.itemId === "mpAnchorSeq"
    ? `Master PDF Anchor Sequence Print Status`
    : obj.itemId === "mpNonAnchorSeq"
    ? `Master PDF Non Anchor Sequence Print Status`
    : obj.itemId === "mpNonAnchorSeq"
    ? `Master PDF Non Anchor Sequence Print Status`
    : obj.itemId === "form21"
    ? `Form 21 Print Status`
    : obj.itemId === "qcInstruction"
    ? `Downloaded QC Instruction`
    : obj.itemId === "qcManual"
    ? `QC Manual`
    : obj.itemId === "qcManualReport"
    ? `Downloaded Manual QC Report`
    : obj.itemId === "qcTech"
    ? `QC Tech Status`
    : obj.itemId === "qcTechReport"
    ? `Downloaded Tech QC Report`
    : "";
};
const RowComp = ({ data, index }) => {
  return (
    <NavLink
      to={data.url}
      style={({ isActive }) => ({
        color: isActive ? "#000" : "#000",
        textDecoration: "none",
        cursor: "pointer",
        p: 2,
      })}
    >
      <Grid
        container
        sx={{
          borderBottom: index === 3 ? null : "1px solid #000",
        }}
      >
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            padding: 2,
            borderRight: "1px solid #000",
          }}
        >
          <CustomTypographyBold>{data.title}</CustomTypographyBold>
        </Grid>
        <Grid item xs={12} lg={9} sx={{ padding: 2 }}>
          {data.subSteps.map((obj, index) => (
            <Grid
              container
              key={index}
              sx={{
                boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.25)",
                padding: 1,
                margin: 1,
                borderRadius: "15px",
              }}
            >
              <Grid item xs={6} lg={6}>
                <Typography>{generateStepString(obj)}</Typography>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Box
                  sx={{
                    width: "100px",
                  }}
                >
                  <Typography
                    sx={{
                      padding: 0.2,
                      textAlign: "center",
                      borderRadius: "10px",
                      color:
                        obj?.status === "PENDING"
                          ? "#000000"
                          : obj?.status === "WORK_IN_PROGRESS"
                          ? "#FFFFFF"
                          : obj?.status === "DONE"
                          ? "#FFFFFF"
                          : obj?.status === "NOT_REQUIRED"
                          ? "#FFFFFF"
                          : null,

                      backgroundColor:
                        obj?.status === "PENDING"
                          ? "yellow"
                          : obj?.status === "WORK_IN_PROGRESS"
                          ? "orange"
                          : obj?.status === "DONE"
                          ? "green"
                          : obj?.status === "NOT_REQUIRED"
                          ? "black"
                          : null,
                    }}
                  >
                    {obj?.status === "WORK_IN_PROGRESS"
                      ? "WIP"
                      : obj?.status === "NOT_REQUIRED"
                      ? "NOT REQ"
                      : obj?.status}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </NavLink>
  );
};

const StatusSummary = ({}) => {
  let { itemId } = useParams();
  const corpId = itemId;
  const [isLoading, setIsLoading] = useState(false);

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchAllTaskList(corpId, setIsLoading, setTaskList, "DISPATCH");
  }, []);

  console.log({
    taskList: taskList.filter((item) => item.itemType === "SHEET"),
  });

  const steps = [
    {
      title: "Data Sheet",
      subSteps: sortBySequence(
        taskList.filter((item) => item.itemType === "SHEET"),
        DATASHEET_SEQ
      ),
      url: `/corp/deliveryorchestrator/datasheet/${itemId}`,
    },
    {
      title: "Upload",
      subSteps: sortBySequence(
        taskList.filter((item) => item.itemType === "UPLOADED"),
        UPLOAD_SEQ
      ),
      url: `/corp/deliveryorchestrator/upload/${itemId}`,
    },
    {
      title: "Reporting",
      subSteps: taskList.filter(
        (item) => item.itemType === "REPORTING" && item.itemId !== "printStatus"
      ),
      url: `/corp/deliveryorchestrator/reporting/${itemId}`,
    },
    {
      title: "Dispatch",
      subSteps: sortBySequence(
        taskList.filter((item) => item.itemType === "DISPATCH"),
        DISPATCH_SEQ
      ),
      url: `/corp/deliveryorchestrator/dispatch/${itemId}`,
    },
  ];

  console.log({
    Dispatch: sortBySequence(
      taskList?.filter((item) => item.itemType === "DISPATCH"),
      DISPATCH_SEQ
    ),
  });

  return (
    <Fragment>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: "#F5F5F5", minHeight: "80vh", borderRadius: 5 }}
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
            }}
          >
            <Grid
              container
              sx={{ border: "1px solid #000", borderRadius: "15px" }}
            >
              <Grid item xs={12} lg={12}>
                <Grid container sx={{ borderBottom: "1px solid #000" }}>
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    sx={{
                      padding: 2,
                      borderRight: "1px solid #000",
                    }}
                  >
                    <CustomTypographyBold>Steps</CustomTypographyBold>
                  </Grid>
                  <Grid item xs={12} lg={9} sx={{ padding: 2 }}>
                    <CustomTypographyBold>Status</CustomTypographyBold>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12}>
                {steps.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.25)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <RowComp data={item} index={index} />
                  </Box>
                ))}
              </Grid>
            </Grid>
            {/* <Grid
              container
              sx={{ border: "1px solid #000", borderRadius: "15px" }}
            >
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  p: 2,
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <CustomTypographyBold>Steps</CustomTypographyBold>
              </Grid>
              <Grid
                item
                xs={12}
                lg={9}
                sx={{ p: 2, borderBottom: "1px solid #000" }}
              >
                <CustomTypographyBold>Status</CustomTypographyBold>
              </Grid>

              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <NavLink
                  to={`/corp/deliveryorchestrator/datasheet/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  <CustomTypographyBold>Data Sheet</CustomTypographyBold>
                </NavLink>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ borderBottom: "1px solid #000" }}>
                <NavLink
                  to={`/corp/deliveryorchestrator/datasheet/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  {sortBySequence(
                    taskList.filter((item) => item.itemType === "SHEET"),
                    DATASHEET_SEQ
                  ).map(
                    (obj, index) =>
                      obj.status === "DONE" && (
                        <CustomTypographyBold key={index}>
                          {obj.itemName}
                        </CustomTypographyBold>
                      )
                  )}
                </NavLink>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <NavLink
                  to={`/corp/deliveryorchestrator/upload/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  <CustomTypographyBold>Upload</CustomTypographyBold>
                </NavLink>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ borderBottom: "1px solid #000" }}>
                <NavLink
                  to={`/corp/deliveryorchestrator/upload/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  {taskList
                    .filter((item) => item.itemType === "UPLOAD")
                    .map(
                      (obj, index) =>
                        obj.status === "DONE" && (
                          <CustomTypographyBold key={index}>
                            {obj.itemName}
                          </CustomTypographyBold>
                        )
                    )}
                </NavLink>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <NavLink
                  to={`/corp/deliveryorchestrator/reporting/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  <CustomTypographyBold>Reporting</CustomTypographyBold>
                </NavLink>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ borderBottom: "1px solid #000" }}>
                <NavLink
                  to={`/corp/deliveryorchestrator/reporting/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  {sortBySequence(
                    taskList.filter((item) => item.itemType === "REPORTING"),
                    UPLOAD_SEQ
                  ).map(
                    (obj, index) =>
                      obj.status === "DONE" && (
                        <CustomTypographyBold key={index}>
                          {obj.itemName}
                        </CustomTypographyBold>
                      )
                  )}
                </NavLink>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{
                  borderBottom: "1px solid #000",
                  borderRight: "1px solid #000",
                }}
              >
                <NavLink
                  to={`/corp/deliveryorchestrator/dispatch/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  <CustomTypographyBold>Dispatch</CustomTypographyBold>
                </NavLink>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ borderBottom: "1px solid #000" }}>
                <NavLink
                  to={`/corp/deliveryorchestrator/dispatch/${itemId}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    p: 2,
                  })}
                >
                  {sortBySequence(
                    taskList.filter((item) => item.itemType === "DISPATCH"),
                    DISPATCH_SEQ
                  ).map(
                    (obj, index) =>
                      obj.status === "DONE" && (
                        <CustomTypographyBold key={index}>
                          {obj.itemName}
                        </CustomTypographyBold>
                      )
                  )}
                </NavLink>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default StatusSummary;

{
  /* <Grid
              container
              sx={{ border: "1px solid #000", borderRadius: "15px" }}
            >
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ borderBottom: "1px solid #000" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Stack
                    sx={{
                      p: 2,
                      borderRight: "1px solid #000",
                      width: "150px",
                    }}
                  >
                    <CustomTypographyBold>Steps</CustomTypographyBold>
                  </Stack>
                  <Stack sx={{ p: 2 }}>
                    <CustomTypographyBold>Status</CustomTypographyBold>
                  </Stack>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ borderBottom: "1px solid #000" }}
              >
                <Box sx={{ display: "flex" }}>
                  <NavLink
                    to={`/corp/deliveryorchestrator/datasheet/${itemId}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#000" : "#000",
                      textDecoration: "none",
                      cursor: "pointer",
                    })}
                  >
                    <Stack
                      sx={{
                        p: 2,
                        borderRight: "1px solid #000",
                        width: "150px",
                        cursor: "pointer",
                      }}
                    >
                      <CustomTypographyBold>Data Sheet</CustomTypographyBold>
                    </Stack>
                  </NavLink>
                  <Stack sx={{ p: 2 }}>
                    <CustomTypographyBold>Creation</CustomTypographyBold>
                  </Stack>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ borderBottom: "1px solid #000" }}
              >
                <Box sx={{ display: "flex" }}>
                  <NavLink
                    to={`/corp/deliveryorchestrator/upload/${itemId}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#000" : "#000",
                      textDecoration: "none",
                      cursor: "pointer",
                    })}
                  >
                    <Stack
                      sx={{
                        p: 2,
                        borderRight: "1px solid #000",
                        width: "150px",
                        cursor: "pointer",
                      }}
                    >
                      <CustomTypographyBold>Upload</CustomTypographyBold>
                    </Stack>
                  </NavLink>
                  <Stack sx={{ p: 2 }}>
                    <CustomTypographyBold>Creation</CustomTypographyBold>
                  </Stack>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ borderBottom: "1px solid #000" }}
              >
                <Box sx={{ display: "flex" }}>
                  <NavLink
                    to={`/corp/deliveryorchestrator/reporting/${itemId}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#000" : "#000",
                      textDecoration: "none",
                      cursor: "pointer",
                    })}
                  >
                    <Stack
                      sx={{
                        p: 2,
                        borderRight: "1px solid #000",
                        width: "150px",
                        cursor: "pointer",
                      }}
                    >
                      <CustomTypographyBold>Reporting</CustomTypographyBold>
                    </Stack>
                  </NavLink>
                  <Stack sx={{ p: 2 }}>
                    <CustomTypographyBold>Creation</CustomTypographyBold>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Box sx={{ display: "flex" }}>
                  <NavLink
                    to={`/corp/deliveryorchestrator/dispatch/${itemId}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#000" : "#000",
                      textDecoration: "none",
                      cursor: "pointer",
                    })}
                  >
                    <Stack
                      sx={{
                        p: 2,
                        borderRight: "1px solid #000",
                        width: "150px",
                        cursor: "pointer",
                      }}
                    >
                      <CustomTypographyBold>Dispatch</CustomTypographyBold>
                    </Stack>
                  </NavLink>
                  <Stack sx={{ p: 2 }}>
                    <CustomTypographyBold>Creation</CustomTypographyBold>
                  </Stack>
                </Box>
              </Grid>
            </Grid> */
}
