import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { getData, updateData } from "../../../assets/corpServices";
import {
  fetchAllTaskList,
  fetchSuperMasterData,
  getDataSheetReports,
} from "../../../services/deliveryOrchestratorServices";
import { useSnackbar } from "notistack";
import { isDesktop } from "react-device-detect";
import { DATASHEET_SEQ } from "../../../assets/corpConstants";
import MarkStatusBtn from "../subComp/markStatusBtn";
import { BASE_URL } from "../../../../assets/constants";
import { downloadCsv } from "../../../../assets/utils";
import { useParams } from "react-router-dom";

const generateCSVContent = (data) => {
  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) => {
    const escapedValues = headers.map((header) => {
      if (typeof row[header] === "string") {
        return `"${row[header].replace(/"/g, '""') || ""}"`;
      } else {
        return `"${row[header]?.toString() || ""}"`;
      }
    });
    return escapedValues.join(",");
  });
  csvRows.unshift(headers.join(","));
  return csvRows.join("\n");
};

const RowComp = ({ item, handleChange, corpId }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ p: 2, borderRight: isDesktop && "1px solid #000" }}
        >
          {item.itemId === "pasteLink" ? (
            <TextField
              size="small"
              fullWidth
              value={item.url || ""}
              onPaste={(e) =>
                handleChange(
                  item.itemId,
                  e.clipboardData.getData("text"),
                  "url"
                )
              }
              label="Paste Link"
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{item.itemName}</Typography>
          )}
        </Grid>

        <Grid
          item
          xs={6}
          lg={4}
          sx={{ p: 2, display: "flex", justifyContent: "center" }}
        >
          {(item.itemId === "copySmdToggle" ||
            item.itemId === "pasteLink" ||
            item.itemId === "copyDefectExecution" ||
            item.itemId === "copySmdUpload" ||
            item.itemId === "copyDefectUpload" ||
            item.itemId === "copySmdFinal" ||
            item.itemId === "copyDefectFinal" ||
            item.itemId === "tabSnop") && (
            <Button
              onClick={() => {
                if (
                  item.itemId === "copySmdToggle" ||
                  item.itemId === "copySmdUpload" ||
                  item.itemId === "copySmdFinal"
                ) {
                  const filteredData = item.masterData.map((Obj) => {
                    const filteredItem = {};
                    item.fields.forEach((field) => {
                      filteredItem[field] = Obj[field];
                    });
                    return filteredItem;
                  });
                  downloadCsv(filteredData, `${item.itemId}.csv`);
                } else if (
                  item.itemId === "copyDefectExecution" ||
                  item.itemId === "copyDefectUpload" ||
                  item.itemId === "copyDefectFinal"
                ) {
                  let csvContent = "";
                  csvContent = `Overall Stats\n\n${generateCSVContent(
                    item.overallStats
                  )}\n\n`;
                  csvContent += `Detailed Stats\n\n${generateCSVContent(
                    item.sheetDefects
                  )}`;
                  const csvData = new Blob([csvContent], { type: "text/csv" });
                  const csvUrl = window.URL.createObjectURL(csvData);
                  const hiddenElement = document.createElement("a");
                  hiddenElement.href = csvUrl;
                  hiddenElement.target = "_blank";
                  hiddenElement.download = item.itemId;
                  hiddenElement.click();
                }
              }}
              size="small"
              sx={{ width: "120px" }}
              variant="contained"
            >
              {item.itemId === "pasteLink" ? "Go to link" : "Download"}
            </Button>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            borderLeft: isDesktop && "1px solid #000",
          }}
        >
          <MarkStatusBtn
            selectedStatus={item.status} // Pass selectedStatus instead of status
            setSelectedStatus={(newValue) =>
              handleChange(item.itemId, newValue, "status")
            }
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const DataSheetMain = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [newDataSheet, setNewDataSheet] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTaskList(
      corpId,
      setIsLoading,
      setNewDataSheet,
      "SHEET",
      DATASHEET_SEQ
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

  useEffect(() => {
    fetchSuperMasterData(corpId, setIsLoading, setMasterData);
    fetchDefects();
  }, []);

  console.log({ defects });

  const handleChange = async (itemId, newValue, field) => {
    // setIsLoading(true);
    console.log({ newValue });
    const updatedDataSheet = newDataSheet.map((item, index) =>
      item.itemId === itemId ? { ...item, [field]: newValue } : item
    );
    setNewDataSheet(updatedDataSheet);

    const itemIndex = newDataSheet.findIndex((item) => item.itemId === itemId);
    const updatedItem = { ...updatedDataSheet[itemIndex], [field]: newValue };
    const url = BASE_URL + `task/item`;
    const response = await updateData(url, updatedItem);

    if (response.error) {
      // setIsLoading(false);
      enqueueSnackbar("An Error Occurred!", { variant: "error" });
    } else {
      // setIsLoading(false);
      enqueueSnackbar("Status Updated Successfully!", { variant: "success" });
    }
  };

  const newDataSheet2 = newDataSheet.map((item, index) => ({
    ...item,
    overallStats: [
      {
        TestName: "PFT",
        TotalRequiredtest: defects?.reportDefectsCountVM?.pftTestRequired,
        ...((item.itemId === "copyDefectExecution" ||
          item.itemId === "copyDefectFinal") && {
          TotalToggleNotOn:
            parseInt(defects?.reportDefectsCountVM?.pftTestRequired) -
            parseInt(defects?.reportDefectsCountVM?.pftToggle),
        }),
        ...((item.itemId === "copyDefectUpload" ||
          item.itemId === "copyDefectFinal") && {
          TotalReportNotUploaded:
            parseInt(defects?.reportDefectsCountVM?.pftToggle) -
            parseInt(defects?.reportDefectsCountVM?.pftReportUploaded),
        }),
      },
      {
        TestName: "AUDIOMETRY",
        TotalRequiredtest:
          defects?.reportDefectsCountVM?.audiometryTestRequired,
        TotalToggleNotOn:
          parseInt(defects?.reportDefectsCountVM?.audiometryTestRequired) -
          parseInt(defects?.reportDefectsCountVM?.audiometryToggle),
        TotalReportNotUploaded:
          defects?.reportDefectsCountVM?.audiometryReportUploaded,
      },
      {
        TestName: "BLOODTEST",
        TotalRequiredtest: defects?.reportDefectsCountVM?.bloodTestRequired,
        TotalToggleNotOn:
          parseInt(defects?.reportDefectsCountVM?.bloodTestRequired) -
          parseInt(defects?.reportDefectsCountVM?.bloodToggle),
        TotalReportNotUploaded:
          defects?.reportDefectsCountVM?.bloodReportUploaded,
      },
      {
        TestName: "ECG",
        TotalRequiredtest: defects?.reportDefectsCountVM?.ecgTestRequired,
        TotalToggleNotOn:
          parseInt(defects?.reportDefectsCountVM?.ecgTestRequired) -
          parseInt(defects?.reportDefectsCountVM?.ecgToggle),
        TotalReportNotUploaded:
          defects?.reportDefectsCountVM?.ecgReportUploaded,
      },
      {
        TestName: "XRAY",
        TotalRequiredtest: defects?.reportDefectsCountVM?.xrayTestRequired,
        TotalToggleNotOn:
          parseInt(defects?.reportDefectsCountVM?.xrayTestRequired) -
          parseInt(defects?.reportDefectsCountVM?.xrayToggle),
        TotalReportNotUploaded:
          defects?.reportDefectsCountVM?.xrayReportUploaded,
      },
    ],

    sheetDefects: defects.empReportDefectsDetailVMS
      ?.filter((obj, index) =>
        item.itemId === "copyDefectExecution"
          ? obj.exeDefect === true
          : item.itemId === "copyDefectUpload"
          ? obj.uploadDefect === true
          : []
      )
      .map((val, index) =>
        item.itemId === "copyDefectExecution"
          ? {
              empName: val.empName,
              empId: val.empId,
              testsRequired: val.testsRequired,
              toggleOn: val.toggleOn,
              missingTests: val.missingTests,
            }
          : item.itemId === "copyDefectUpload"
          ? {
              empName: val.empName,
              empId: val.empId,
              toggleOn: val.toggleOn,
              missingReports: val.missingReports,
            }
          : val
      ),
    masterData: masterData,
    fields:
      item.itemId === "copySmdToggle"
        ? [
            "empId",
            "name",
            "age",
            "gender",
            "tokenNumber",
            "packageName",
            "pftToggle",
            "audiometryToggle",
            "bloodToggle",
            "ecgToggle",
            "xrayToggle",
            "urineToggle",
          ]
        : item.itemId === "copySmdUpload"
        ? [
            "empId",
            "name",
            "age",
            "gender",
            "tokenNumber",
            "packageName",
            "pftStatus",
            "audiometryStatus",
            "bloodStatus",
            "ecgStatus",
          ]
        : item.itemId === "copySmdFinal"
        ? [
            "empId",
            "name",
            "age",
            "gender",
            "tokenNumber",
            "packageName",
            "pftToggle",
            "audiometryToggle",
            "bloodToggle",
            "ecgToggle",
            "xrayToggle",
            "urineToggle",
            "pftStatus",
            "audiometryStatus",
            "bloodStatus",
            "ecgStatus",
          ]
        : null,
  }));

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
      <MainPageLayoutWithBack title="Data Sheet">
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
            <Grid
              container
              sx={{ border: "1px solid #000", borderRadius: "15px" }}
            >
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ p: 2, borderBottom: "1px solid #000" }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Datasheet</Typography>
              </Grid>
              {newDataSheet2.map((item) => (
                <Grid
                  key={item.itemId}
                  item
                  xs={12}
                  lg={12}
                  sx={{
                    borderBottom: "1px solid #000",
                  }}
                >
                  <RowComp
                    item={item}
                    handleChange={handleChange}
                    corpId={corpId}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default DataSheetMain;
