import React, { Fragment, useEffect, useState } from "react";
import Upload from "./subComp/upload";
import { Box, Grid, Paper, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { isMobile } from "react-device-detect";
import AllFiles from "./subComp/allFiles";
import { getReportingPermissions } from "../../assets/reportingPermisions";
import AllFilesNew from "./subComp/allFilesNew";

const UploadReportS3Main = () => {
  const permissions = getReportingPermissions();

  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_S3_FILTERS")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  console.log({ _storedData });

  useEffect(() => {
    setSelectedFileType(
      _storedData.selectedFileType || { value: "", label: "" }
    );
    setValue(_storedData.value || "1");
    setProcessField(_storedData.processField || { value: "", label: "" });
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [processField, setProcessField] = useState({ label: "", value: "" });

  const handleProcessReport = (event, newValue, reason) => {
    setProcessField(newValue);
    if (reason === "clear") {
      setProcessField({ label: "", value: "" });
    }
  };
  const [selectedFileType, setSelectedFileType] = React.useState({
    value: "",
    label: "",
  });

  const handleSelectFileType = (event, newValue, reason) => {
    setSelectedFileType(newValue);

    if (reason === "clear") {
      setSelectedFileType({
        value: "",
        label: "",
      });
    }
  };

  useEffect(() => {
    const savedFilter = {
      selectedFileType,
      value,
      processField,
    };
    localStorage.setItem("SAVED_S3_FILTERS", JSON.stringify(savedFilter));
  }, [selectedFileType, value, processField]);

  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: isMobile ? "100%" : "84vh",
            minHeight: "84vh",
            paddingBlock: 1,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Upload" value="1" />

                  {permissions.uploadReportCloudTab.childTab.allFilesTab
                    .visibilty && <Tab label="All Files" value="2" />}
                  {permissions.uploadReportCloudTab.childTab
                    .allFilesTaskExecutor.visibilty && (
                    <Tab label="All Files Task Executor" value="3" />
                  )}
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 0 }}>
                <Box>
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Upload
                        selectedFileType={selectedFileType}
                        handleSelectFileType={(event, newValue, reason) =>
                          handleSelectFileType(event, newValue, reason)
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {permissions?.uploadReportCloudTab.childTab?.allFilesTab
                ?.visibilty && (
                <TabPanel value="2" sx={{ p: 0 }}>
                  <AllFiles
                    selectedFileType={selectedFileType}
                    handleSelectFileType={(event, newValue, reason) =>
                      handleSelectFileType(event, newValue, reason)
                    }
                    processReportBtn={
                      permissions.uploadReportCloudTab.childTab.allFilesTab
                        .processReportBtn
                    }
                  />
                </TabPanel>
              )}
              {permissions?.uploadReportCloudTab.childTab?.allFilesTaskExecutor
                ?.visibilty && (
                <TabPanel value="3" sx={{ p: 0 }}>
                  <AllFilesNew
                    selectedFileType={selectedFileType}
                    handleSelectFileType={(event, newValue, reason) =>
                      handleSelectFileType(event, newValue, reason)
                    }
                    processReportBtn={
                      permissions.uploadReportCloudTab.childTab
                        .allFilesTaskExecutor.processReportBtn
                    }
                  />
                </TabPanel>
              )}
            </TabContext>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default UploadReportS3Main;
