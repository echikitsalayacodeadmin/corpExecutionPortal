// import { Box, CircularProgress, Paper } from "@mui/material";
// import React, { Fragment, useContext, useEffect, useState } from "react";
// import { isMobile } from "react-device-detect";
// import { ReportingContext } from "../../global/context/context";
// import { fetchVitalsDataError } from "../../services/vitalsDataErrorServices";
// import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
// import { formatColumnName } from "../../../assets/utils";
// import CustomButtonBlue from "../../../assets/customButtonBlue";

// const VitalsDataErrorMain = ({
//   corpId = localStorage.getItem("CORP_ID_REPORTING"),
// }) => {
//   const { updateEmployeeList } = useContext(ReportingContext);
//   const [masterData, setMasterData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     fetchVitalsDataError(
//       corpId,
//       setIsLoading,
//       setMasterData,
//       updateEmployeeList
//     );
//   }, []);

//   console.log({
//     masterData: masterData.filter(
//       (item) =>
//         item.cholestrolData ||
//         item.vitalsErrorData ||
//         item.unhealthyVitalsData ||
//         item.healthyVitalsData
//     ),
//   });

//   const [open, setOpen] = useState(false);

//   const columns =
//     masterData.length > 0
//       ? Object.keys(masterData[0]).map((key) => {
//           return {
//             field: key,
//             headerName: formatColumnName(key),
//             width: 170,
//             align: "left",
//             headerAlign: "left",
//             renderCell: (params) => {
//               if (key === "cholestrolData") {
//                 return <CustomButtonBlue title="View" />;
//               } else if (key === "vitalsErrorData") {
//                 return <CustomButtonBlue title="View" />;
//               } else if (key === "unhealthyVitalsData") {
//                 return <CustomButtonBlue title="View" />;
//               } else if (key === "healthyVitalsData") {
//                 return <CustomButtonBlue title="View" />;
//               }
//             },
//           };
//         })
//       : [];

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Fragment>
//       <Box sx={{ marginBlock: 1 }}>
//         <Paper
//           sx={{
//             borderRadius: 5,
//             paddingInline: 3,
//             boxShadow: 3,
//             height: isMobile ? "100%" : "84vh",
//             paddingBlock: "10px",
//           }}
//         >
//           <CustomDataGridLayout
//             columns={columns}
//             rows={masterData.filter(
//               (item) =>
//                 item.cholestrolData ||
//                 item.vitalsErrorData ||
//                 item.unhealthyVitalsData ||
//                 item.healthyVitalsData
//             )}
//             getRowId={(row) => row.empId}
//             disableRowSelectionOnClick={true}
//             disableSelectionOnClick={true}
//           />
//         </Paper>
//       </Box>
//     </Fragment>
//   );
// };

// export default VitalsDataErrorMain;

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
import { DataGrid } from "@mui/x-data-grid";
import { isObject } from "@mui/x-data-grid/internals";
import ViewReportModal from "../uploadReportsS3/subComp/viewReportModal";
import CustomAutocomplete from "../../../assets/customAutocomplete";

const VitalsDataErrorMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { updateEmployeeList, searchedEmployee } = useContext(ReportingContext);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [flattenedData, setFlattenedData] = useState([]);
  const [flattenedColumns, setFlattenedColumns] = useState([]);
  const [fieldType, setFieldType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const handleViewFile = (url) => {
    setOpenModal(true);
    setFileUrl(url);
    setFileType(getFileType(url));
  };

  useEffect(() => {
    fetchVitalsDataError(
      corpId,
      setIsLoading,
      setMasterData,
      updateEmployeeList
    );
  }, []);

  const flattenObject = (obj, prefix = "") => {
    return Object.keys(obj || {}).reduce((acc, k) => {
      const pre = prefix.length ? `${prefix}.` : "";
      if (typeof obj[k] === "object" && obj[k] !== null) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  const handleViewClick = (data) => {
    const flattened = flattenObject(data);
    setFlattenedData([flattened]);
    setFlattenedColumns(
      Object.keys(flattened).map((key) => ({
        field: key,
        headerName: formatColumnName(key),
        width: 200,
      }))
    );
    setOpen(true);
  };

  const columns =
    masterData.length > 0
      ? Object.keys(masterData[0]).map((key) => {
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
            renderCell: (params) => {
              if (isSpecialField) {
                // Check if the value is an empty string or an empty object
                const isEmpty =
                  params.row[key] === "" ||
                  (typeof params.row[key] === "object" &&
                    params.row[key] !== null &&
                    Object.keys(params.row[key]).length === 0);

                return (
                  !isEmpty && (
                    <CustomButtonBlue
                      disabled={isEmpty ? true : false}
                      title="View Fields"
                      onClick={() => {
                        handleViewClick(params.row[key]);
                        setFieldType(formatColumnName(key));
                      }}
                    />
                  )
                );
              } else if (key === "bloodTestUrl" && params.row.bloodTestUrl) {
                return (
                  <CustomButtonBlue
                    title="View Report"
                    onClick={() => {
                      handleViewFile(params.row.bloodTestUrl);
                    }}
                  />
                );
              }
              return <Typography>{params.value}</Typography>;
            },
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

  console.log({
    masterData: masterData.filter(
      (item) =>
        item.cholestrolData ||
        item.vitalsErrorData ||
        item.unhealthyVitalsData ||
        item.healthyVitalsData
    ),
  });

  const filteredData = useMemo(() => {
    return masterData
      ?.filter((item) =>
        searchedEmployee
          ? item?.name === searchedEmployee?.name &&
            item?.empId === searchedEmployee?.empId
          : true
      )
      .filter((item) =>
        selectedGender ? item?.gender === selectedGender : true
      );
  }, [masterData, searchedEmployee, selectedGender]);

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
        <CustomAutocomplete
          options={["MALE", "FEMALE", "DONOTDISCLOSE", "OTHER"]}
          label={"Filter Gender"}
          placeholder={"Filter Gender"}
          value={selectedGender}
          getOptionLabel={(option) => option}
          onChange={(event, newValue, reason) => {
            setSelectedGender(newValue);
            if (reason === "clear") {
              setSelectedGender("");
            }
          }}
        />
        <CustomDataGridLayout
          columns={columns}
          rows={filteredData
            .filter(
              (item) =>
                item.cholestrolData ||
                item.vitalsErrorData ||
                item.unhealthyVitalsData ||
                item.healthyVitalsData
            )
            .map((item, index) => ({
              id: index,
              ...item,
            }))}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{fieldType}</DialogTitle>
        <DialogContent>
          <Box style={{ height: 400, width: "100%" }}>
            <CustomDataGridLayout
              columns={flattenedColumns}
              rows={flattenedData.map((item, index) => ({
                id: index,
                ...item,
              }))}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ViewReportModal
        open={openModal}
        handleCloseModal={() => setOpenModal(false)}
        fileType={fileType}
        fileUrl={fileUrl}
      />
    </Fragment>
  );
};

export default VitalsDataErrorMain;
