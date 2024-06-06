import { Box, CircularProgress, Paper } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { fetchReportAnalysisData } from "../../services/reportAnalysisService";

const generateColumns = (data) => {
  const columns = [];
  console.log({ KKK: data });
  for (const key in data) {
    if (typeof data[key] !== "function") {
      columns.push({
        field: key,
        headerName: key
          .replace(/([A-Z])/g, (match) => ` ${match}`)
          ?.toUpperCase()
          .trim(),
        width: 200,
      });
    }
  }
  return columns;
};

const flattenVaccineCounts = (data) => {
  const flattenedData = { ...data }; // Spread operator to avoid mutation
  if (data?.hasOwnProperty("mapOfVaccineCounts")) {
    const vaccineCounts = data.mapOfVaccineCounts;
    delete flattenedData.mapOfVaccineCounts; // Remove nested object
    for (const key in vaccineCounts) {
      flattenedData[`vaccine_${key}`] = vaccineCounts[key]; // Add flattened key-value pairs
    }
  }
  return flattenedData;
};

const ReportAnalysisMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [masterData, setMasterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchReportAnalysisData(corpId, setIsLoading, setMasterData);
  }, []);

  const flattenedData = flattenVaccineCounts(masterData);

  // const columns = generateColumns(flattenedData);

  // const rows = [flattenedData];

  const columns = [
    { field: "key", headerName: "Key", width: 300 },
    { field: "value", headerName: "Value", width: 200 },
  ];

  const transformedRows =
    flattenedData &&
    Object?.entries(flattenedData)?.map(([key, value], index) => ({
      id: index + 1,
      key: key
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        ?.toUpperCase()
        .trim()
        ?.replace(/_/, " "),
      value: value,
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
          <CustomDataGridLayout
            columns={columns}
            rowHeight={30}
            rows={transformedRows}
            getRowId={(row) => row?.id}
            checkboxSelection={false}
            disableRowSelectionOnClick={true}
            disableSelectionOnClick={true}
          />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default ReportAnalysisMain;
