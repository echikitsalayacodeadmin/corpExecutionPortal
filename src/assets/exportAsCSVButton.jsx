import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Papa from "papaparse";

const ExportAsCSVButton = ({ jsonData }) => {
  const [csvData, setCsvData] = useState("");

  const convertToJson = () => {
    const csv = Papa.unparse(jsonData);
    setCsvData(csv);
    downloadCsv(csv);
  };

  const downloadCsv = (csv) => {
    const csvData = new Blob([csv], { type: "text/csv" });
    const csvUrl = window.URL.createObjectURL(csvData);
    const hiddenElement = document.createElement("a");
    hiddenElement.href = csvUrl;
    hiddenElement.target = "_blank";
    hiddenElement.download = "exported_data.csv";
    hiddenElement.click();
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={convertToJson}>
        Convert to CSV
      </Button>
    </Fragment>
  );
};

export default ExportAsCSVButton;
