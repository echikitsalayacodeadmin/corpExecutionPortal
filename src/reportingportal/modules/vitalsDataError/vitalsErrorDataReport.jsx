import {
  Box,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isMobile } from "react-device-detect";
import { ReportingContext } from "../../global/context/context";
import { fetchVitalsDataError } from "../../services/vitalsDataErrorServices";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { formatColumnName, getFileType } from "../../../assets/utils";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import ViewReportModal from "../uploadReportsS3/subComp/viewReportModal";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { getData } from "../../assets/reportingServices";
import { BASE_URL } from "../../../assets/constants";
import RangeTooltip from "./rangeToolTip";

const processCholestrolData = (data) => {
  // Destructure the relevant fields from data
  const {
    cholestrolData,
    healthyVitalsData,
    unhealthyVitalsData,
    vitalsErrorData,
  } = data;

  // Create a copy of the cholestrolData object to avoid mutating the original data
  const updatedCholestrolData = { ...cholestrolData };

  // Add status keys for healthy vitals
  Object.keys(healthyVitalsData).forEach((key) => {
    if (updatedCholestrolData.hasOwnProperty(key)) {
      updatedCholestrolData[`${key}Status`] = "Fit";
    }
  });

  // Add status keys for unhealthy vitals
  Object.keys(unhealthyVitalsData).forEach((key) => {
    if (updatedCholestrolData.hasOwnProperty(key)) {
      updatedCholestrolData[`${key}Status`] = "Unfit";
    }
  });

  // Add status keys for vitals errors
  Object.keys(vitalsErrorData).forEach((key) => {
    if (updatedCholestrolData.hasOwnProperty(key)) {
      updatedCholestrolData[`${key}Status`] = "Error";
    }
  });

  // Return the updated data with the processed cholestrolData
  return {
    ...data,
    cholestrolData: updatedCholestrolData,
  };
};

const VitalsErrorDataReport = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { updateEmployeeList, searchedEmployee } = useContext(ReportingContext);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVitalsDataError(
      corpId,
      setIsLoading,
      setMasterData,
      updateEmployeeList
    );
  }, []);

  const filteredData = useMemo(() => {
    return masterData.map((item, index) => ({
      empId: item.empId,
      name: item.name,
      gender: item.gender,
      tokenNumber: item.tokenNumber,
      vitalsCreatedDate: item.vitalsCreatedDate,
      ...item.cholestrolData,
    }));
  }, [masterData]);

  const columns =
    filteredData.length > 0
      ? Object.keys(filteredData[0]).map((key) => {
          const isSpecialField = [
            "cholestrolData",
            "vitalsErrorData",
            "unhealthyVitalsData",
            "healthyVitalsData",
            "urineProblem",
          ].includes(key);

          const columnDef = {
            field: key,
            headerName: formatColumnName(key),
            width: 170,
            align: "left",
            headerAlign: "left",
          };

          if (isSpecialField) {
            columnDef.valueGetter = (params) => {
              const details = params.value;
              if (details && typeof details === "object") {
                return JSON.stringify(params.value);
              }
              return params.value;
            };
          }

          return columnDef;
        })
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
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <CustomDataGridLayout
          columns={columns}
          rows={filteredData.map((item, index) => ({
            id: index,
            ...item,
          }))}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
        />
      </Box>
    </Fragment>
  );
};

export default VitalsErrorDataReport;
