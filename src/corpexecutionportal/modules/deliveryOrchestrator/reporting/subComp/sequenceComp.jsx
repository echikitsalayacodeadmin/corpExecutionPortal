import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../../global/templates/mainPageLayoutWithBack";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { isMobile } from "react-device-detect";
import ParseCSV from "../../../../../assets/parseCSV";
import CustomDataGridLayout from "../../../../../assets/globalDataGridLayout/customDataGridLayout";
import { getData, saveData } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";
import { useSnackbar } from "notistack";
import DeleteSequenceModal from "./../subComp/deleteSequenceModal";
import {
  filterUniqueEmployeesByEmpId,
  sortDataByDateTime,
} from "../../../../../assets/utils";
import MarkStatusBtn from "../../subComp/markStatusBtn";
import { useParams } from "react-router-dom";

const SequenceComp = ({ reportingTaskList, handleStatusChange }) => {
  let { itemId } = useParams();
  const corpId = itemId;
  const [openDialog, setOpenDialog] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [savedFile, setSavedFile] = useState("");
  const columns = [
    {
      field: "sno",
      headerName: "Sno",
      width: 150,
    },
    { field: "tokenNumber", headerName: "Token No", width: 150 },
    { field: "employeeid", headerName: "Employee Id", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
  ];
  const { enqueueSnackbar } = useSnackbar();
  const [masterData, setMasterData] = useState([]);
  const [isListExit, setIsListExist] = useState(false);
  const [sequenceList, setSequenceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCurrentSequenceList = async () => {
    setIsLoading(true);
    const url = BASE_URL + `org/reporting/sequence/${corpId}`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);
      console.log({ SUCCESS: response?.data });
      setIsListExist(response?.data?.sequenceList?.length === 0 ? false : true);
      setMasterData(
        filterUniqueEmployeesByEmpId(response.data.sequenceList)?.map(
          (item, index) => ({
            ...item,
            employeeid: item.empId,
          })
        )
      );
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      setMasterData([]);
      setIsListExist(false);
    }
  };

  console.log({ isListExit, masterData });

  useEffect(() => {
    fetchCurrentSequenceList();
  }, [openDialog]);

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowsData = selectionModel.map((id) => {
      return GridData.find((row) => row.EmpId === id);
    });
    setSelectedRows(selectedRowsData);
  };

  useEffect(() => {
    setMasterData(sequenceList);
  }, [sequenceList]);

  const handleUpload = async () => {
    if (sequenceList.length > 0) {
      const obj = {
        corpId: corpId,
        sequenceList: sequenceList
          .filter((item) => item.sno && item.employeeid && item.name)
          .map((item) => ({
            sno: item.sno,
            empId: item.employeeid,
            name: item.name,
          })),
      };

      const url = BASE_URL + "org/reporting/sequence";
      const result = await saveData(url, obj);
      if (result.data) {
        console.log("SUCCESS", result.data);
        enqueueSnackbar("Successfully Uploaded!", {
          variant: "success",
        });
        fetchCurrentSequenceList();
        setSavedFile("");
        setShowSequence(true);
      } else {
        console.log("ERROR", result.error);
        enqueueSnackbar("An error occured!", {
          variant: "error",
        });
      }
    }
  };

  const [masterPdfList, setMasterPdfList] = useState([]);
  const fetchMasterPdfList = async () => {
    setIsLoading(true);
    const url =
      BASE_URL + `org/reporting/masterPdf?corpId=${corpId}&isCompleted=true`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);
      let temp = response?.data?.map((item, index) => ({
        ...item,
        id: index + 1,
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

  // useEffect(() => {
  //   if (sequenceList) {
  //     setShowSequence(true);
  //   }
  // }, [sequenceList]);

  return (
    <Fragment>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid
          item
          lg={7}
          md={12}
          sm={12}
          xs={12}
          display="flex"
          justifyContent={isMobile ? "center" : "flex-start"}
          alignItems={"center"}
        >
          <Stack direction={{ lg: "row", xs: "column" }}>
            <ParseCSV setList={setSequenceList} setSavedFile={setSavedFile} />
            <Button
              disabled={
                masterData
                  .filter(
                    (item) =>
                      item.sno !== "" &&
                      item.sno !== undefined &&
                      item.employeeid !== "" &&
                      item.employeeid !== undefined &&
                      item.name !== "" &&
                      item.name !== ""
                  )
                  .some(
                    (item) =>
                      item.employeeid === "" ||
                      item.sno === "" ||
                      item.name === "" ||
                      masterData.filter((row) => row.sno === item.sno).length >
                        1
                  )
                  ? true
                  : false
              }
              variant="contained"
              onClick={() => {
                handleUpload();
              }}
            >
              Upload
            </Button>
          </Stack>
        </Grid>
        <Grid item sx={{ display: { lg: "none" } }} md={2} sm={2} xs={2}></Grid>
        <Grid
          item
          lg={5}
          md={8}
          sm={8}
          xs={8}
          display="flex"
          justifyContent={isMobile ? "center" : "flex-end"}
          alignItems={"center"}
        >
          <Button
            disabled={isListExit === false ? true : false}
            variant="contained"
            onClick={() => {
              setOpenDialog(!openDialog);
            }}
          >
            Delete Sequence
          </Button>
        </Grid>
        <Grid sx={{ display: { lg: "none" } }} item md={2} sm={2} xs={2}></Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{ marginBlock: 1 }}
          variant="contained"
          onClick={() => {
            setShowSequence(!showSequence);
          }}
        >
          {showSequence ? "Hide Sequence" : "Show Sequence"}
        </Button>
        <MarkStatusBtn
          selectedStatus={
            reportingTaskList.find((item) => item.itemId === "uploadAnchorSeq")
              ?.status
          }
          setSelectedStatus={(newValue) => {
            handleStatusChange(
              reportingTaskList.find(
                (item) => item.itemId === "uploadAnchorSeq"
              )?.itemId,
              newValue
            );
          }}
        />
      </Box>

      {showSequence &&
        (masterData.length === 0 ? (
          <Typography>No Sequence Uploaded yet</Typography>
        ) : (
          <CustomDataGridLayout
            rows={masterData
              .filter(
                (item) =>
                  item.sno &&
                  item.sno !== undefined &&
                  item.employeeid !== "" &&
                  item.employeeid !== undefined &&
                  item.name !== "" &&
                  item.name !== ""
              )
              .map((item, index) => ({
                id: index,
                ...item,
              }))}
            styles={{
              ".error": {
                backgroundColor: "#FF0000",
                "&:hover": {
                  backgroundColor: "#FF4D4D",
                },
              },

              width: isMobile ? "100%" : "900px",
              backgroundColor: "#e7f2fb",
              borderRadius: "15px",
              padding: "20px",
            }}
            columns={columns}
            rowHeight={30}
            Gridheight={isMobile ? "70vh" : "68vh"}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            selectionModel={selectedRows.map((row) => row.empId)}
            onSelectionModelChange={handleSelectionModelChange}
            getRowClassName={(params) => {
              const snoCount = rows.filter(
                (row) => row.sno === params.row.sno
              ).length;
              const employeeIdCount = rows.filter(
                (row) => row.employeeid === params.row.employeeid
              ).length;

              return params.row.employeeid === "" ||
                params.row.sno === "" ||
                params.row.name === "" ||
                snoCount > 1 ||
                employeeIdCount > 1
                ? "error"
                : "";
            }}
          />
        ))}

      <DeleteSequenceModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Fragment>
  );
};

export default SequenceComp;
