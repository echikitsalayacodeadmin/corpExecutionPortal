import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import { isDesktop } from "react-device-detect";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import MarkStatusBtn from "../../subComp/markStatusBtn";
import { CustomTypographyBold } from "../../../../../assets/customTypography";
import { fetchAllTaskList } from "../../../../services/deliveryOrchestratorServices";
import { DISPATCH_SEQ } from "../../../../assets/corpConstants";
import { BASE_URL } from "../../../../../assets/constants";
import { getData, updateData } from "../../../../assets/corpServices";
import MainPageLayoutWithBack from "../../../../global/templates/mainPageLayoutWithBack";

const generateSummaryCSV = (data) => {
  let csvContent = `Test Name,Done,\n`;
  for (const testName in data) {
    const testData = data[testName];
    csvContent += `${testName},${testData.done}\n`;
  }
  return csvContent;
};

const generateSummaryDetailCSV = (data) => {
  let csvContent = "";
  csvContent += Papa.unparse(data);

  return csvContent;
};

const generateCombinedCSV = (data) => {
  const summaryContent = generateSummaryCSV(data.summary);
  const summaryDetailContent = generateSummaryDetailCSV(data.summaryDetail);
  let combinedContent = `${summaryContent}\n\n`; // Add two newlines for spacing
  combinedContent += summaryDetailContent;
  return combinedContent;
};

const getActionableType = (itemId) => {
  return itemId === "boxing" ||
    itemId === "pasteIndex" ||
    itemId === "printIndex" ||
    itemId === "sendMail" ||
    itemId === "createInvoice" ||
    itemId === "sendDelivery"
    ? "status"
    : itemId === "scan"
    ? "copy"
    : "download";
};

const RowComp = ({ data, handleChange }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ p: 2, borderRight: isDesktop && "1px solid #000" }}
        >
          <CustomTypographyBold>{data.itemName}</CustomTypographyBold>
        </Grid>

        <Grid
          item
          xs={6}
          lg={4}
          sx={{ p: 2, display: "flex", justifyContent: "center" }}
        >
          {getActionableType(data.itemId) !== "status" ? (
            <Button
              onClick={() => {
                if (data.itemId === "generateSnopMail") {
                  const combinedCsv = generateCombinedCSV(data.snopMailReport);
                  const csvData = new Blob([combinedCsv], {
                    type: "text/csv",
                  });
                  const csvUrl = window.URL.createObjectURL(csvData);
                  const hiddenElement = document.createElement("a");
                  hiddenElement.href = csvUrl;
                  hiddenElement.target = "_blank";
                  hiddenElement.download = `test_result.csv`;
                  hiddenElement.click();
                }
              }}
              size="small"
              sx={{ width: "120px" }}
              variant="contained"
            >
              {(getActionableType(data.itemId) === "copy" && "Copy Link") ||
                (getActionableType(data.itemId) === "download" && "Download")}
            </Button>
          ) : null}
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
            selectedStatus={data.status}
            setSelectedStatus={(newValue) => {
              handleChange(data.itemId, newValue);
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const DispatchMain = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [dispatchData, setDispatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTaskList(
      corpId,
      setIsLoading,
      setDispatchData,
      "DISPATCH",
      DISPATCH_SEQ
    );
  }, []);

  const handleChange = async (itemId, newValue) => {
    // setIsLoading(true);

    const updateDispatchData = dispatchData.map((item, index) =>
      item.itemId === itemId ? { ...item, status: newValue } : item
    );
    setDispatchData(updateDispatchData);

    const itemIndex = dispatchData.findIndex((item) => item.itemId === itemId);

    const updatedItem = { ...updateDispatchData[itemIndex], status: newValue };
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

  const [snopMailReport, setSnopMailReport] = useState([]);
  const fetchSnopMail = async () => {
    const url = BASE_URL + "org/reporting/snopEmail?corpId=" + corpId;
    const result = await getData(url);
    if (result.data) {
      setSnopMailReport(result.data);
    } else {
      setSnopMailReport([]);
    }
  };
  useEffect(() => {
    fetchSnopMail();
  }, []);

  const dispatchDataNew = dispatchData.map((item, index) => ({
    ...item,
    ...(item.itemId === "generateSnopMail" && {
      snopMailReport: {
        summary: snopMailReport.qcMap,
        summaryDetail: snopMailReport.snopVM,
      },
    }),
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
      <MainPageLayoutWithBack title="Dispatch">
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
                <CustomTypographyBold>Dispatch</CustomTypographyBold>
              </Grid>
              {dispatchDataNew.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  lg={12}
                  sx={{ borderBottom: "1px solid #000" }}
                >
                  <RowComp data={item} handleChange={handleChange} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default DispatchMain;
