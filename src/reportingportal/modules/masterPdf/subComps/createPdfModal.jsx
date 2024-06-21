import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ReportingContext } from "../../../global/context/context";
import CustomMultiSelectAutocomplete from "../../../../assets/customMultiSelectAutocomplete";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { getData, saveData } from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { isMobile } from "react-device-detect";
import { sortArrayBySno } from "../../../../assets/utils";
import EditModal from "../../sequence/subComp/editModal";

const filterReport = [
  {
    value: "FITNESS_CERTIFICATE",
    label: "Medical Fitness Certificate (FITNESS_CERTIFICATE)",
  },
  {
    value: "PHYSICAL_FITNESS_CERTIFICATE",
    label: "Form 32 (PHYSICAL_FITNESS_CERTIFICATE)",
  },
  {
    value: "PHYSICAL_FITNESS_FORM",
    label: "Physical Fitness Form",
  },
  {
    value: "FORM_35",
    label: "Form 35",
  },
  { value: "PFT", label: "Pft" },
  { value: "AUDIOMETRY", label: "Audiometry" },

  { value: "BLOODTEST", label: "Blood Test" },
  { value: "ECG", label: "Ecg" },
  { value: "XRAY", label: "Xray" },

  {
    value: "VACCINATION_CERTIFICATE",
    label: "Vaccination Certificate",
  },
  {
    value: "FITNESS_CERTIFICATE_FOOD",
    label: "Food Certificate",
  },
  { value: "EYE_TEST", label: "Eye Test" },
  { value: "CONSOLIDATED_REPORT", label: "Consolidated Report" },
  { value: "ANNEXURE", label: "Annexure Report" },
];

const reportFieldsMap = {
  FITNESS_CERTIFICATE: ["fitnessCertificateUrl"],
  PHYSICAL_FITNESS_CERTIFICATE: ["form32Url"],
  PHYSICAL_FITNESS_FORM: ["physicalFitnessFormUrl"],
  FORM_35: ["form35Url"],
  PFT: ["pftUrl"],
  AUDIOMETRY: ["audiometryUrl"],
  BLOODTEST: ["bloodTestUrl"],
  ECG: ["ecgUrl"],
  XRAY: ["xrayUrl"],
  VACCINATION_CERTIFICATE: ["vaccinationCertificateUrl"],
  FITNESS_CERTIFICATE_FOOD: ["medicalFitnessFoodUrl"],
  EYE_TEST: [], // Add corresponding fields for "EYE_TEST" if any
  CONSOLIDATED_REPORT: ["consolidatedRUrl"],
  ANNEXURE: ["annexureUrl"],
};

const countTotalReports = (data) => {
  let totalReports = 0;

  data.forEach((item) => {
    for (const reportType in reportFieldsMap) {
      reportFieldsMap[reportType].forEach((field) => {
        if (item[field]) {
          totalReports++;
        }
      });
    }
  });

  return totalReports;
};

const CreatePdfModal = ({
  employeeList,
  setEmployeeList,
  corpId,
  totalEmployees,
  originalEmployeeList,
}) => {
  const { selectedReportData, openDialog, handleCloseDialog } =
    useContext(ReportingContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editDetail, setEditDetail] = useState("");
  const [dbSequence, setDBSequence] = useState([]);
  const fetchSequenceData = async () => {
    const url = BASE_URL + `org/reporting/sequence/${corpId}`;
    const response = await getData(url);
    if (response.data) {
      setDBSequence(response.data.sequenceList);
    } else {
      setDBSequence([]);
    }
  };
  useEffect(() => {
    fetchSequenceData();
  }, [openEditModal]);

  const columns = [
    {
      field: "sno",
      headerName: "Sno",
      width: 150,
    },
    { field: "tokenNo", headerName: "Token No", width: 100 },
    { field: "empId", headerName: "Employee Id", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "foundInDb", headerName: "Found In DB", width: 200 },
    {
      field: "editEmpId",
      headerName: "Edit EmpId",
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            cursor: "pointer",
          }}
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
  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleSelectionModelChange = (selectionModel) => {
    console.log({ selectionModel });
    const selectedRowsData = selectionModel?.map((id) => {
      return dbSequence?.find((row) => row?.empId === id);
    });
    console.log({ selectedRowsData });
    setSelectedRows(sortArrayBySno(selectedRowsData));
  };

  const [selectedReport, setSelectedReport] = useState([]);
  const handleSelectReport = (event, selectedOptions, reason) => {
    const selectedValues = selectedOptions?.map((option) => option?.value);
    setSelectedReport(selectedValues);
    if (reason === "clear") {
      setSelectedReport([]);
    }
  };

  const [isPickEmployeeFromSequence, setIsPickEmployeeFromSequence] =
    useState(false);
  const handlePickEmployeeFromSequence = (event) => {
    setIsPickEmployeeFromSequence(event.target.checked);
  };

  const [removeSequnceEmployees, setRemoveSequnceEmployees] = useState(false);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);

  const handleRemoveSequenceEmployees = (event) => {
    setRemoveSequnceEmployees(event.target.checked);
    if (
      event.target.checked === true &&
      employeeList.length > 0 &&
      dbSequence.length > 0
    ) {
      const filteredEmployees = employeeList.filter((employee) => {
        return !dbSequence.some(
          (sequence) => sequence.empId === employee.empId
        );
      });
      setFilteredEmployeeList(filteredEmployees);
    } else if (
      event.target.checked === true &&
      employeesIdList.length > 0 &&
      dbSequence.length > 0
    ) {
      const filteredEmployees = originalEmployeeList
        .filter((item) => {
          return employeesIdList.includes(item.empId);
        })
        .filter((employee) => {
          return !dbSequence.some(
            (sequence) => sequence.empId === employee.empId
          );
        });
      setFilteredEmployeeList(filteredEmployees);
    } else {
      if (employeesIdList.length > 0) {
        const temp = originalEmployeeList.filter((item) => {
          return employeesIdList.includes(item.empId);
        });
        setFilteredEmployeeList(temp);
      } else {
        setFilteredEmployeeList([...employeeList]);
      }
    }
  };

  const [employeesId, setEmployeesId] = useState("");
  const [employeesIdList, setEmployeesIdList] = useState([]);

  const handleGeneratePDFRequest = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    let Obj = null;
    if (
      isPickEmployeeFromSequence === false &&
      removeSequnceEmployees === false &&
      (employeeList.length > 0 || employeesId !== "") &&
      selectedReport.length > 0
    ) {
      console.log("case1");
      Obj = {
        corpId: corpId,
        employeeList: isPickEmployeeFromSequence ? "DB" : "LIST",
        employeesListAsString: isPickEmployeeFromSequence
          ? null
          : employeeList?.length > 0
          ? employeeList?.map((employee) => employee?.empId)?.join(",")
          : employeesId !== ""
          ? employeesId
          : null,
        orgEmployeeFileTypeList: selectedReport,
        campCycleId: campCycleId,
      };
    } else if (
      isPickEmployeeFromSequence === true &&
      selectedReport.length > 0
    ) {
      console.log("case2");
      Obj = {
        corpId: corpId,
        employeeList: selectedRows.length >= 1 ? "LIST" : "DB",
        employeesListAsString: sortArrayBySno(selectedRows)
          ?.map((employee) => employee?.empId)
          ?.join(","),
        orgEmployeeFileTypeList: selectedReport,
        campCycleId: campCycleId,
      };
    } else if (
      removeSequnceEmployees === true &&
      selectedReport.length > 0 &&
      dbSequence.length > 0 &&
      filteredEmployeeList.length > 0
    ) {
      console.log("case3");
      Obj = {
        corpId: corpId,
        employeeList: "LIST",
        employeesListAsString: filteredEmployeeList
          ?.map((employee) => employee?.empId)
          ?.join(","),
        orgEmployeeFileTypeList: selectedReport,
        campCycleId: campCycleId,
      };
    } else {
      if (selectedReport.length === 0) {
        enqueueSnackbar("Please select reports", {
          variant: "error",
        });
      }
      if (
        isPickEmployeeFromSequence === false &&
        employeeList.length === 0 &&
        employeesId === ""
      ) {
        enqueueSnackbar(
          "Please select rows or enter employee id in comma seperated values",
          {
            variant: "error",
          }
        );
      }
    }
    if (Obj !== null) {
      const url = BASE_URL + "org/reporting/print/tests/all";
      const result = await saveData(url, Obj);
      if (result.error) {
        console.log({ ERROR: result.error });
        enqueueSnackbar(result?.error?.response?.data?.message, {
          variant: "error",
        });
      } else {
        console.log({ SUCCESS: result.data });
        enqueueSnackbar(
          "Master PDF will be generated in some time, you can check the status in the Master PDF Download tab",
          {
            variant: "success",
          }
        );
        navigate("/reporting/reporting-main/master-pdf-download");
        setSelectedReport([]);
        handleCloseDialog();
      }
    }
  };

  const filteredEmployee = useMemo(() => {
    if (!employeesIdList || employeesIdList.length === 0) {
      return [];
    }
    let filtered = employeesIdList
      .map((empId) =>
        originalEmployeeList.find(
          (employee) => employee?.empId.toUpperCase() === empId.toUpperCase()
        )
      )
      .filter((employee) => employee !== undefined);

    if (removeSequnceEmployees === true && dbSequence.length > 0) {
      filtered = filtered.filter((employee) => {
        return !dbSequence.some(
          (sequence) => sequence.empId === employee.empId
        );
      });
    }
    return filtered.length > 0 ? filtered : [];
  }, [
    employeesIdList,
    originalEmployeeList,
    dbSequence,
    removeSequnceEmployees,
  ]);

  // console.log({
  //   selectedRows,
  //   dbSequence,
  //   filteredEmployeeList,
  //   employeesIdList,
  //   selectedReport,
  // });

  // console.log({
  //   employeeList,
  //   employeesId,
  //   selectedRows,
  //   filteredEmployeeList,
  //   originalEmployeeList,
  // });

  const [allSelectedEmployees, setAllSelectedEmployees] = useState([]);

  useEffect(() => {
    if (
      isPickEmployeeFromSequence === false &&
      removeSequnceEmployees === false &&
      (employeeList.length > 0 || employeesId !== "") &&
      selectedReport.length > 0
    ) {
      const temp =
        employeeList?.length > 0
          ? employeeList?.map((employee) => employee?.empId)?.join(",")
          : employeesId !== ""
          ? employeesId
          : null;

      if (typeof temp === "string") {
        const dummpTemp = temp.split(",").map((id) => id.trim());
        const filteredEmployeesIdList = originalEmployeeList.filter((emp) =>
          dummpTemp.includes(emp.empId)
        );
        setAllSelectedEmployees(filteredEmployeesIdList);
      } else if (Array.isArray(temp)) {
        const filteredEmployeesIdList = originalEmployeeList.filter((emp) =>
          temp.includes(emp.empId)
        );
        setAllSelectedEmployees(filteredEmployeesIdList);
      }
    } else if (
      isPickEmployeeFromSequence === true &&
      selectedReport.length > 0 &&
      selectedRows.length > 0
    ) {
      const temp = selectedRows.map((row) => row.empId);
      const filteredEmployeesIdList = originalEmployeeList.filter((emp) =>
        temp.includes(emp.empId)
      );
      setAllSelectedEmployees(filteredEmployeesIdList);
    } else if (
      isPickEmployeeFromSequence === true &&
      selectedRows.length === 0 &&
      selectedReport.length > 0
    ) {
      const temp = dbSequence.map((row) => row.empId);
      console.log({ temp });
      const filteredEmployeesIdList = originalEmployeeList.filter((emp) =>
        temp.includes(emp.empId)
      );
      console.log({ filteredEmployeesIdList });
      setAllSelectedEmployees(filteredEmployeesIdList);
    } else if (
      removeSequnceEmployees === true &&
      selectedReport.length > 0 &&
      dbSequence.length > 0 &&
      filteredEmployeeList.length > 0
    ) {
      const temp = filteredEmployeeList.map((employee) => employee.empId);
      const filteredEmployeesIdList = originalEmployeeList.filter((emp) =>
        temp.includes(emp.empId)
      );
      setAllSelectedEmployees(filteredEmployeesIdList);
    }
  }, [
    isPickEmployeeFromSequence,
    removeSequnceEmployees,
    selectedReport,
    employeeList,
    employeesId,
    selectedRows,
    filteredEmployeeList,
    originalEmployeeList,
    dbSequence,
  ]);

  console.log({
    allSelectedEmployees,
    dbSequence,
    jjj:
      isPickEmployeeFromSequence === true &&
      selectedRows.length === 0 &&
      selectedReport.length > 0,
    isPickEmployeeFromSequence,
    selectedRows,
    selectedReport,
  });

  const [presummaryReport, setPresummaryReport] = useState([]);
  const [open, setOpen] = useState(false);

  const checkEmployeeFields = useMemo(() => {
    return () => {
      const newPresummaryReport = [];
      allSelectedEmployees.forEach((employee) => {
        const emptyReport = {};
        const notEmptyReport = {};
        selectedReport.forEach((report) => {
          const fields = reportFieldsMap[report];
          if (fields && fields.length > 0) {
            const emptyFields = fields.filter(
              (field) =>
                employee[field] === undefined || employee[field] === null
            );
            const notEmptyFields = fields.filter((field) => employee[field]);
            if (emptyFields.length > 0) {
              emptyReport[report] = emptyFields.join(", ");
            }
            if (notEmptyFields.length > 0) {
              notEmptyReport[report] = notEmptyFields.length;
            }
          }
        });
        newPresummaryReport.push({
          name: employee.name,
          empId: employee.empId,
          emptyReport,
          notEmptyReport,
        });
      });
      setPresummaryReport(newPresummaryReport);
      setOpen(true);
    };
  }, [selectedReport, allSelectedEmployees, reportFieldsMap]);

  console.log({ presummaryReport });

  return (
    <Fragment>
      <Portal>
        <Dialog
          open={openDialog}
          onClose={() => {
            handleCloseDialog();
            setEmployeesId("");
          }}
          maxWidth={"xl"}
          fullWidth={true}
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {selectedReportData?.label
                ? `Settings for Creating ${selectedReportData?.label} Report`
                : "Settings"}
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => {
                  handleCloseDialog();
                  setEmployeesId("");
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ minHeight: "70vh", paddingBlock: "10px" }}>
              <Grid container spacing={1}>
                <Grid item lg={12} xs={12}>
                  <CustomMultiSelectAutocomplete
                    options={filterReport}
                    label={"Select Report"}
                    placeholder={"Select Report"}
                    onChange={handleSelectReport}
                  />
                </Grid>
                <Grid item lg={3} xs={6} sx={{ display: "flex" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPickEmployeeFromSequence}
                        onChange={handlePickEmployeeFromSequence}
                      />
                    }
                    label="Pick Employee From Sequence"
                  />
                </Grid>
                {isPickEmployeeFromSequence ? null : (
                  <>
                    <Grid item lg={4} xs={6}>
                      <TextField
                        multiline
                        disabled={employeeList.length === 0 ? false : true}
                        maxRows={5}
                        sx={styles.textField}
                        label="Enter Employee Ids"
                        variant="outlined"
                        placeholder="Enter Employee Ids in Comma seperated Values"
                        size="small"
                        fullWidth
                        value={employeesId}
                        onChange={(e) => {
                          const value = e?.target?.value?.toUpperCase();
                          const uniqueValues = [
                            ...new Set(
                              value.split(",").map((item) => item.trim())
                            ),
                          ];
                          const uniqueValuesString = uniqueValues.join(",");
                          setEmployeesId(uniqueValuesString);
                          setEmployeesIdList(uniqueValues);
                        }}
                      />
                    </Grid>
                    <Grid item lg={4} xs={4}>
                      <Box sx={styles.totalEmployeesBox}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "400",
                          }}
                        >
                          Total Selected Employees :{" "}
                          {filteredEmployeeList.length
                            ? filteredEmployeeList.length
                            : totalEmployees
                            ? totalEmployees
                            : employeesIdList.filter((item) => item !== "")
                                .length}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                )}
                <Grid item lg={3} xs={6} sx={{ display: "flex" }}>
                  <FormControlLabel
                    disabled={
                      (employeeList.length === 0 || dbSequence.length === 0) &&
                      (employeesIdList.length === 0 || dbSequence.length === 0)
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={removeSequnceEmployees}
                        onChange={handleRemoveSequenceEmployees}
                      />
                    }
                    label="Remove Employee Present In Sequence"
                  />
                </Grid>
                <Grid item lg={2} xs={6} sx={{ display: "flex" }}>
                  <CustomButtonBlue
                    disabled={selectedReport.length > 0 ? false : true}
                    onClick={() => checkEmployeeFields()}
                    title="Check Report"
                  />
                </Grid>
                <Grid item lg={2} xs={6} sx={{ display: "flex" }}>
                  <CustomButtonBlue
                    disabled={
                      allSelectedEmployees.filter(
                        (item) => item.isVitalsErrorData === true
                      ).length > 0
                        ? true
                        : false
                    }
                    onClick={() => handleGeneratePDFRequest()}
                    title="Generate Report"
                  />
                </Grid>
                <Grid item lg={12} xs={6} sx={{ display: "flex" }}>
                  <Typography>
                    No of Reports Found :{" "}
                    {countTotalReports(allSelectedEmployees)}
                  </Typography>
                </Grid>
              </Grid>

              {isPickEmployeeFromSequence ? null : (
                <>
                  {filteredEmployee.length > 0 ? (
                    <Grid
                      container
                      sx={{
                        marginTop: "10px",
                        padding: "5px 0px",
                      }}
                    >
                      <Grid item lg={4} xs={4}>
                        <Typography>Employee ID</Typography>
                      </Grid>
                      <Grid item lg={8} xs={8}>
                        <Typography>Employee Name</Typography>
                      </Grid>
                    </Grid>
                  ) : null}
                  {filteredEmployee?.map((item) => (
                    <Box key={item?.empId} sx={{ marginTop: "20px" }}>
                      <Grid container sx={styles.employeeGrid}>
                        <Grid item lg={4} xs={4}>
                          <Typography>{item?.empId}</Typography>
                        </Grid>
                        <Grid item lg={8} xs={8}>
                          <Typography>{item?.name}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </>
              )}

              {isPickEmployeeFromSequence && (
                <>
                  {dbSequence?.length === 0 ? (
                    <Typography sx={{ color: "red" }}>
                      Please Upload Sequence
                    </Typography>
                  ) : (
                    <CustomDataGridLayout
                      rows={dbSequence.map((item, index) => ({
                        id: index,
                        ...item,
                      }))}
                      columns={columns}
                      rowHeight={30}
                      Gridheight={isMobile ? "100%" : "65vh"}
                      disableSelectionOnClick={true}
                      getRowId={(row) => row?.empId}
                      disableRowSelectionOnClick={true}
                      selectionModel={selectedRows.map((row) => row?.sno)}
                      onRowSelectionModelChange={handleSelectionModelChange}
                      getRowClassName={(params) => {
                        const snoCount = dbSequence
                          .map((item, index) => ({
                            id: index,
                            ...item,
                          }))
                          .filter((row) => row.sno === params.row.sno).length;

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
                  )}
                </>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </Portal>
      <EditModal
        editDetail={editDetail}
        setOpen={setOpenEditModal}
        open={openEditModal}
      />
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: "500px",
              minHeight: "120px",
            }}
          >
            <Typography variant="h6">Master PDF Summary</Typography>
            <Typography variant="h6">
              Total Emp : {presummaryReport.length}
            </Typography>
            <Box>
              <TableContainer sx={{ height: "60vh" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Emp ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Empty Reports</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {presummaryReport.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.empId}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {Object.entries(item.emptyReport).map(
                            ([key, value], index) => (
                              <Typography key={index} sx={{ fontSize: "15px" }}>
                                {index + 1 + ") "}
                                {value}
                              </Typography>
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default CreatePdfModal;

const styles = {
  textField: {
    height: "50px",
    background: "#fff",
    color: "#127DDD",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: " 15px",
    "& input::placeholder": {
      color: "#000000",
      fontWeight: "500",
      fontSize: "13px",
      lineHeight: " 15px",
    },
  },
  totalEmployeesBox: {
    padding: "7px",
    borderRadius: "15px",
    border: "1px solid lightgrey",
    marginLeft: "10px",
  },
  employeeGrid: {
    borderBottom: "1px solid #ccc",
    padding: "5px 0px",
  },
};
