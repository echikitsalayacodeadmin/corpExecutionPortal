// import React, { Fragment, useContext, useEffect, useState } from "react";
// import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   FormHelperText,
//   Grid,
//   Paper,
//   Stack,
//   Toolbar,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { styled } from "@mui/material/styles";
// import { BASE_URL } from "../../../assets/constants";
// import { getData, saveData } from "../../assets/reportingServices";
// import { useSnackbar } from "notistack";
// import { ReportingContext } from "../../global/context/context";
// import ParseCSV from "../../../assets/parseCSV";
// import { filterUniqueEmployeesByEmpId } from "../../../assets/utils";
// import { isMobile } from "react-device-detect";
// import DeleteSequenceModal from "./subComp/deleteSequenceModal";
// import { DataGrid } from "@mui/x-data-grid";
// import EditModal from "./subComp/editModal";

// const SequenceReportingIndex = ({
//   corpId = localStorage.getItem("CORP_ID_REPORTING"),
// }) => {
//   const {
//     updateEmployeeList,
//     empListHeader,
//     searchedEmployee,
//     setOpenDialog,
//     openDialog,
//   } = useContext(ReportingContext);

//   const [savedFile, setSavedFile] = useState("");
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editDetail, setEditDetail] = useState("");
//   const columns = [
//     {
//       field: "sno",
//       headerName: "Sno",
//       width: 150,
//     },
//     { field: "tokenNumber", headerName: "Token No", width: 100 },
//     { field: "employeeid", headerName: "Employee Id", width: 100 },
//     { field: "name", headerName: "Name", width: 200 },
//     { field: "foundInDb", headerName: "Found In DB", width: 200 },
//     {
//       field: "editEmpId",
//       headerName: "Edit EmpId",
//       width: 200,
//       renderCell: (params) => (
//         <Box
//           sx={{
//             cursor: "pointer",
//           }}
//           onClick={() => {
//             setOpenEditModal(true);
//             setEditDetail(params.row);
//           }}
//         >
//           <EditIcon />
//         </Box>
//       ),
//     },
//   ];
//   const { enqueueSnackbar } = useSnackbar();
//   const [masterData, setMasterData] = useState([]);
//   const [isListExit, setIsListExist] = useState(false);
//   const [sequenceList, setSequenceList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const fetchCurrentSequenceList = async () => {
//     setIsLoading(true);
//     const url = BASE_URL + `org/reporting/sequence/${corpId}`;
//     const response = await getData(url);
//     if (response.data) {
//       setIsLoading(false);
//       console.log({ SUCCESS: response?.data });
//       setIsListExist(response?.data?.sequenceList?.length === 0 ? false : true);
//       setMasterData(
//         filterUniqueEmployeesByEmpId(response.data.sequenceList)?.map(
//           (item, index) => ({
//             ...item,
//             employeeid: item.empId,
//           })
//         )
//       );
//       updateEmployeeList(
//         filterUniqueEmployeesByEmpId(response?.data?.sequenceList)
//       );
//     } else {
//       setIsLoading(false);
//       console.log({ ERROR: response.error });
//       setMasterData([]);
//       setIsListExist(false);
//     }
//   };

//   console.log({ isListExit });

//   useEffect(() => {
//     fetchCurrentSequenceList();
//   }, [openDialog, openEditModal]);

//   const [selectedRows, setSelectedRows] = React.useState([]);

//   const handleSelectionModelChange = (selectionModel) => {
//     const selectedRowsData = selectionModel.map((id) => {
//       return GridData.find((row) => row.EmpId === id);
//     });
//     setSelectedRows(selectedRowsData);
//   };

// useEffect(() => {
//   setMasterData(sequenceList);
// }, [sequenceList]);

//   const handleUpload = async () => {
//     if (sequenceList.length > 0) {
//       const obj = {
//         corpId: corpId,
//         sequenceList: sequenceList
//           .filter((item) => item.sno && item.employeeid && item.name)
//           .map((item) => ({
//             sno: item.sno,
//             empId: item.employeeid,
//             name: item.name,
//           })),
//       };

//       const url = BASE_URL + "org/reporting/sequence";
//       const result = await saveData(url, obj);
//       if (result.data) {
//         console.log("SUCCESS", result.data);
//         enqueueSnackbar("Successfully Uploaded!", {
//           variant: "success",
//         });
//         fetchCurrentSequenceList();
//         setSavedFile("");
//       } else {
//         console.log("ERROR", result.error);
//         enqueueSnackbar("An error occured!", {
//           variant: "error",
//         });
//       }
//     }
//   };

//   console.log({ masterData, sequenceList });

//   return (
//     <Fragment>
//       <Box sx={{ marginBlock: 2 }}>
//         <Paper
//           sx={{
//             borderRadius: 5,
//             paddingInline: 3,
//             boxShadow: 3,
//             height: isMobile ? "100%" : "84vh",
//           }}
//         >
//           <Grid
//             spacing={1}
//             container
//             display="flex"
//             justifyContent={isMobile ? "center" : "flex-start"}
//             alignItems={"center"}
//           >
//             <Grid
//               item
//               lg={7}
//               md={12}
//               sm={12}
//               xs={12}
//               display="flex"
//               justifyContent={isMobile ? "center" : "flex-start"}
//               alignItems={"center"}
//             >
//               <Stack direction={{ lg: "row", xs: "column" }}>
//                 <ParseCSV
//                   setList={setSequenceList}
//                   setSavedFile={setSavedFile}
//                 />
//                 <Button
//                   disabled={
//                     masterData
//                       .filter(
//                         (item) =>
//                           item.sno !== "" &&
//                           item.sno !== undefined &&
//                           item.employeeid !== "" &&
//                           item.employeeid !== undefined &&
//                           item.name !== "" &&
//                           item.name !== ""
//                       )
//                       .some(
//                         (item) =>
//                           item.employeeid === "" ||
//                           item.sno === "" ||
//                           item.name === "" ||
//                           masterData.filter((row) => row.sno === item.sno)
//                             .length > 1
//                       )
//                       ? true
//                       : false
//                   }
//                   variant="contained"
//                   onClick={() => {
//                     handleUpload();
//                   }}
//                 >
//                   Upload
//                 </Button>
//               </Stack>
//             </Grid>
//             <Grid
//               item
//               lg={5}
//               md={12}
//               sm={12}
//               xs={12}
//               display="flex"
//               justifyContent={isMobile ? "center" : "center"}
//               alignItems={"center"}
//             >
//               <Button
//                 disabled={isListExit === false ? true : false}
//                 variant="contained"
//                 onClick={() => {
//                   setOpenDialog(!openDialog);
//                 }}
//               >
//                 Delete Sequence
//               </Button>
//             </Grid>
//           </Grid>

//           {masterData
//             .filter(
//               (item) =>
//                 item.sno !== "" &&
//                 item.sno !== undefined &&
//                 item.employeeid !== "" &&
//                 item.employeeid !== undefined &&
//                 item.name !== "" &&
//                 item.name !== ""
//             )
//             .some(
//               (item) =>
//                 item.employeeid === "" ||
//                 item.sno === "" ||
//                 item.name === "" ||
//                 masterData.filter((row) => row.sno === item.sno).length > 1
//             ) && (
//             <FormHelperText sx={{ color: "red" }}>
//               Following highlighted rows have the same cell values or empty cell
//               values. Please correct and re-upload.
//             </FormHelperText>
//           )}

//           <CustomDataGridLayout
//             rows={masterData
//               .filter((item) => item.sno && item.employeeid && item.name)
//               .filter((item) =>
//                 searchedEmployee !== ""
//                   ? item?.name === searchedEmployee?.name &&
//                     item?.empId === searchedEmployee?.empId
//                   : true
//               )
//               .map((item, index) => ({
//                 id: index,
//                 ...item,
//               }))}
// styles={{
//   ".error": {
//     backgroundColor: "#FF0000",
//     "&:hover": {
//       backgroundColor: "#FF4D4D",
//     },
//   },
// }}
//             columns={columns}
//             rowHeight={30}
//             Gridheight={isMobile ? "100%" : "68vh"}
//             disableSelectionOnClick={true}
//             disableRowSelectionOnClick={true}
//             selectionModel={selectedRows.map((row) => row.empId)}
//             onSelectionModelChange={handleSelectionModelChange}
// getRowClassName={(params) => {
//   const snoCount = rows.filter(
//     (row) => row.sno === params.row.sno
//   ).length;

//   return params.row.employeeid === "" ||
//     params.row.sno === "" ||
//     params.row.name === "" ||
//     params.row.foundInDb === false ||
//     snoCount > 1
//     ? "error"
//     : "";
// }}
//           />
//         </Paper>
//       </Box>
//       <DeleteSequenceModal />
//       <EditModal
//         editDetail={editDetail}
//         setOpen={setOpenEditModal}
//         open={openEditModal}
//       />
//     </Fragment>
//   );
// };

// export default SequenceReportingIndex;

import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from "../../../assets/constants";
import { getData, saveData } from "../../assets/reportingServices";
import { useSnackbar } from "notistack";
import { ReportingContext } from "../../global/context/context";
import ParseCSV from "../../../assets/parseCSV";
import { filterUniqueEmployeesByEmpId } from "../../../assets/utils";
import { isMobile } from "react-device-detect";
import DeleteSequenceModal from "./subComp/deleteSequenceModal";
import EditModal from "./subComp/editModal";

const SequenceReportingIndex = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { updateEmployeeList, searchedEmployee, setOpenDialog, openDialog } =
    useContext(ReportingContext);
  const [savedFile, setSavedFile] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editDetail, setEditDetail] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [isListExist, setIsListExist] = useState(false);
  const [sequenceList, setSequenceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { field: "sno", headerName: "Sno", width: 150 },
    { field: "tokenNumber", headerName: "Token No", width: 100 },
    { field: "employeeid", headerName: "Employee Id", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "foundInDb", headerName: "Found In DB", width: 200 },
    {
      field: "editEmpId",
      headerName: "Edit EmpId",
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setOpenEditModal(true);
            setEditDetail(params.row);
          }}
        >
          <EditIcon />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    setMasterData(sequenceList);
  }, [sequenceList]);

  const fetchCurrentSequenceList = async () => {
    setIsLoading(true);
    const response = await getData(
      `${BASE_URL}org/reporting/sequence/${corpId}`
    );
    setIsLoading(false);

    if (response.data) {
      const uniqueEmployees = filterUniqueEmployeesByEmpId(
        response.data.sequenceList
      );
      setIsListExist(uniqueEmployees.length > 0);
      setMasterData(
        uniqueEmployees.map((item) => ({ ...item, employeeid: item.empId }))
      );
      updateEmployeeList(uniqueEmployees);
    } else {
      setMasterData([]);
      setIsListExist(false);
    }
  };

  useEffect(() => {
    fetchCurrentSequenceList();
  }, [openDialog, openEditModal]);

  const handleUpload = async () => {
    if (sequenceList.length > 0) {
      const obj = {
        corpId,
        sequenceList: sequenceList
          .filter((item) => item.sno && item.employeeid && item.name)
          .map(({ sno, employeeid, name }) => ({
            sno,
            empId: employeeid,
            name,
          })),
      };

      const result = await saveData(`${BASE_URL}org/reporting/sequence`, obj);

      if (result.data) {
        enqueueSnackbar("Successfully Uploaded!", { variant: "success" });
        fetchCurrentSequenceList();
        setSavedFile("");
      } else {
        enqueueSnackbar("An error occurred!", { variant: "error" });
      }
    }
  };

  const filterData = useMemo(() => {
    return masterData
      .filter((item) => item.sno && item.employeeid && item.name)
      .filter((item) =>
        searchedEmployee
          ? item.name === searchedEmployee.name &&
            item.empId === searchedEmployee.empId
          : true
      )
      .map((item, index) => ({ id: index, ...item }));
  }, [searchedEmployee, masterData]);

  return (
    <Fragment>
      <Box sx={{ marginBlock: 2 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: isMobile ? "100%" : "84vh",
          }}
        >
          <Grid
            container
            spacing={1}
            justifyContent={isMobile ? "center" : "flex-start"}
            alignItems="center"
          >
            <Grid
              item
              lg={7}
              md={12}
              sm={12}
              xs={12}
              justifyContent={isMobile ? "center" : "flex-start"}
              alignItems="center"
            >
              <Stack direction={{ lg: "row", xs: "column" }}>
                <ParseCSV
                  setList={setSequenceList}
                  setSavedFile={setSavedFile}
                />
                <Button
                  disabled={masterData.some(
                    (item) =>
                      !item.sno ||
                      !item.employeeid ||
                      !item.name ||
                      masterData.filter((row) => row.sno === item.sno).length >
                        1
                  )}
                  variant="contained"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </Stack>
            </Grid>
            <Grid
              item
              lg={5}
              md={12}
              sm={12}
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                disabled={!isListExist}
                variant="contained"
                onClick={() => setOpenDialog(!openDialog)}
              >
                Delete Sequence
              </Button>
            </Grid>
          </Grid>
          {masterData.some(
            (item) =>
              !item.sno ||
              !item.employeeid ||
              !item.name ||
              masterData.filter((row) => row.sno === item.sno).length > 1
          ) && (
            <FormHelperText sx={{ color: "red" }}>
              Following highlighted rows have the same cell values or empty cell
              values. Please correct and re-upload.
            </FormHelperText>
          )}
          <CustomDataGridLayout
            rows={filterData}
            columns={columns}
            rowHeight={30}
            Gridheight={isMobile ? "100%" : "68vh"}
            disableSelectionOnClick
            disableRowSelectionOnClick
            getRowClassName={(params) => {
              const snoCount = filterData.filter(
                (row) => row.sno === params.row.sno
              ).length;

              return params.row.employeeid === "" ||
                params.row.sno === "" ||
                params.row.name === "" ||
                params.row.foundInDb === false ||
                snoCount > 1
                ? "error"
                : "";
            }}
            styles={{
              ".error": {
                backgroundColor: "#FF0000",
                "&:hover": {
                  backgroundColor: "#FF4D4D",
                },
              },
            }}
          />
        </Paper>
      </Box>
      <DeleteSequenceModal />
      <EditModal
        editDetail={editDetail}
        setOpen={setOpenEditModal}
        open={openEditModal}
      />
    </Fragment>
  );
};

export default SequenceReportingIndex;
