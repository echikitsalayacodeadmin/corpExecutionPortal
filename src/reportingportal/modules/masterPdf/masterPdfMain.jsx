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
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ReportingContext } from "../../global/context/context";
import { fetchSuperMasterData } from "../../services/homeservices";
import { useSnackbar } from "notistack";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";
import CreatePdfModal from "./subComps/createPdfModal";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";
import { isMobile } from "react-device-detect";
import { sortArrayBySno } from "../../../assets/utils";

const MasterPdfMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  role = localStorage.getItem("REPORTING_ROLE"),
}) => {
  const {
    updateEmployeeList,
    empListHeader,
    searchedEmployee,
    selectedEmployeeCommaSepIds,
    handleChangeEmployeeCommaSepIds,
  } = useContext(ReportingContext);
  const { enqueueSnackbar } = useSnackbar();

  const _storedData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FILTER_MASTER_PDF")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  console.log({ _storedData });

  useEffect(() => {
    setSelectedFilterHWBS(
      _storedData.selectFilterHWBS || {
        value: "",
        label: "",
      }
    );

    setSelectedCreatedSort(
      _storedData.selectedCreatedSort || {
        value: "",
        label: "",
      }
    );
    setSelectedEmpType(
      _storedData.selectedEmpType || {
        value: "",
        label: "",
      }
    );
    setFromDate(_storedData.fromDate || null);
    setToDate(_storedData.toDate || null);
  }, []);

  useEffect(() => {
    setSelectedEmpIdCommaSep(selectedEmployeeCommaSepIds || "");
  }, [selectedEmployeeCommaSepIds]);

  const columns = [
    { field: "reportingSno", headerName: "Reporting Sno", width: 120 },
    { field: "empId", headerName: "Emp ID", width: 100 },
    { field: "tokenNumber", headerName: "Token Number", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 150,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 200,
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: 150,
    },
    {
      field: "height",
      headerName: "Height",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bp",
      headerName: "BP",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sugar",
      headerName: "Sugar",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "packageName",
      headerName: "Package Name",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hwbsAllAbsent",
      headerName: "HWBS All Absent",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hwbsAllPresent",
      headerName: "HWBS All Present",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hwbsAnyPresent",
      headerName: "HWBS Any Present",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "vitalsPresent",
      headerName: "Vitals Present",
      width: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "vitalsCreatedDate",
      headerName: "Vitals Created Date",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "pft",
      headerName: "PFT",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.pftUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "pftStatus",
      headerName: "PFT Status",
      width: 120,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "audiometry",
      headerName: "Audiometry",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.audiometryUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "audiometryStatus",
      headerName: "Audiometry Status",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bloodTest",
      headerName: "Blood Test",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.bloodTestUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "bloodStatus",
      headerName: "Blood Status",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "eyeTest",
      headerName: "Eye Test",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.eyeTestUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "visionRemark",
      headerName: "Vision Remark",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    {
      field: "xray",
      headerName: "Xray",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.xrayUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "xrayFilm",
      headerName: "Xray Film",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.xrayFilmUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "ecg",
      headerName: "ECG",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.ecgUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "ecgStatus",
      headerName: "ECG Status",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sonography",
      headerName: "Sonography",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.sonographyUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "urintTestDone",
      headerName: "Urine Test Done",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstAid",
      headerName: "First Aid",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.firstAidUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "form32",
      headerName: "Form 32",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.form32Url;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "fitnessCertificate",
      headerName: "Fitness Certificate",
      width: 180,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable =
          params.value === "Yes" && params.row.fitnessCertificateUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "form35",
      headerName: "Form 35",
      width: 80,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.form35Url;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "physicalFitnessForm",
      headerName: "Physical Fitness Form",
      width: 180,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable =
          params.value === "Yes" && params.row.physicalFitnessFormUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "vaccinationCertificate",
      headerName: "Vaccination Certificate",
      width: 180,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable =
          params.value === "Yes" && params.row.vaccinationCertificateUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "medicalFitnessFood",
      headerName: "Medical Fitness Food",
      width: 180,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable =
          params.value === "Yes" && params.row.medicalFitnessFoodUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => handleCellClick(params)}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "packageName",
      headerName: "Package Name",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "missingTests",
      headerName: "Missing Tests",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    {
      field: "pathPackageDetails",
      headerName: "Path Package Details",
      align: "center",
      headerAlign: "center",
      width: 800,
    },
  ];

  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchSuperMasterData(
      corpId,
      setIsLoading,
      setMasterData,
      updateEmployeeList
    );
  }, []);

  console.log({ empListHeader });

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleCellClick = (params) => {
    const field = params.field;
    const cellValue = params.value;
    // Check if the clicked cell is PFT or AudioURL and its value is "Yes"
    if (
      (field === "pft" ||
        field === "audiometry" ||
        field === "bloodTest" ||
        field === "eyeTest" ||
        field === "xray" ||
        field === "xrayFilm" ||
        field === "ecg" ||
        field === "sonography" ||
        field === "form32" ||
        field === "fitnessCertificate" ||
        field === "form35" ||
        field === "firstAid" ||
        field === "physicalFitnessForm" ||
        field === "vaccinationCertificate" ||
        field === "medicalFitnessFood") &&
      cellValue === "Yes"
    ) {
      // Open the PDF using the respective URL (pftUrl or audiometryUrl)
      const pdfURL = params?.row[field + "Url"] || null; // Adjust the field name accordingly
      console.log({ pdfURL });
      // Open the PDF in a new window or perform any other action
      if (pdfURL !== null) {
        window.open(pdfURL, "_blank");
      }
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    console.log({ selectionModel });
    const selectedRowsData = selectionModel.map((id) => {
      return masterData?.find((row) => row.empId === id);
    });

    setSelectedRows(sortArrayBySno(selectedRowsData));
  };

  // useEffect(() => {
  //   setMasterData(empListHeader);
  // }, [searchedEmployee]);

  console.log({ selectedRows });

  const filterHWBS = [
    // { value: "hwbsAllAbsent", label: "HWBS All Absent" },
    { value: "hwbsAllPresent", label: "HWBS All Present" },
    { value: "hwbsAnyPresent", label: "HWBS Any Present" },
    { value: "vitalsPresent", label: "Vitals Present" },
    { value: "vitalsNotPresent", label: "Vitals Not Present" },
  ];

  const [selectFilterHWBS, setSelectedFilterHWBS] = React.useState({
    value: "",
    label: "",
  });

  const handleSelectHWBSStatus = (event, newValue, reason) => {
    setSelectedFilterHWBS(newValue);
    if (reason === "clear") {
      setSelectedFilterHWBS({
        value: "",
        label: "",
      });
    }
  };

  const filterVitalsCreatedDate = [
    { value: "ASCENDING", label: "Ascending" },
    { value: "DESCENDING", label: "Descending" },
  ];
  const [selectedCreatedSort, setSelectedCreatedSort] = React.useState({
    value: "",
    label: "",
  });

  const handleSelectedCreatedDateSort = (event, newValue, reason) => {
    setSelectedCreatedSort(newValue);

    if (reason === "clear") {
      setSelectedCreatedSort({
        value: "",
        label: "",
      });
    }
  };

  const filterEmpType = [
    { value: "ONROLL", label: "ONROLL" },
    { value: "CONTRACTOR", label: "CONTRACTOR" },
    { value: "CSR", label: "CSR" },
    { value: "PRE_EMPLOYMENT", label: "PRE_EMPLOYMENT" },
  ];
  const [selectedEmpType, setSelectedEmpType] = React.useState({
    value: "",
    label: "",
  });

  const handleEmpType = (event, newValue, reason) => {
    setSelectedEmpType(newValue);

    if (reason === "clear") {
      setSelectedEmpType({
        value: "",
        label: "",
      });
    }
  };

  const [selectedEmpIdCommaSep, setSelectedEmpIdCommaSep] = useState("");
  const [selectedTokenList, setSelectedTokenList] = React.useState("");

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const filteredData = useMemo(() => {
    if (role === "REPORTING_OPS") {
      return masterData?.filter(
        (item) =>
          item?.name === searchedEmployee?.name &&
          item?.empId === searchedEmployee?.empId
      );
    } else {
      return masterData
        .filter(
          (employee, index, self) =>
            employee.empId !== null &&
            employee.empId !== "" &&
            self.findIndex((e) => e?.empId === employee?.empId) === index
        )
        .filter((item) =>
          searchedEmployee !== ""
            ? item?.name === searchedEmployee?.name &&
              item?.empId === searchedEmployee?.empId
            : true
        )
        .filter((item) => {
          return (
            // selectFilterHWBS?.value === "hwbsAllAbsent"
            //   ? item.hwbsAllAbsent === "Yes"
            selectFilterHWBS?.value === "hwbsAllPresent"
              ? item.hwbsAllPresent === "Yes"
              : selectFilterHWBS?.value === "hwbsAnyPresent"
              ? item.hwbsAnyPresent === "Yes"
              : selectFilterHWBS?.value === "vitalsPresent"
              ? item.vitalsPresent === "Yes"
              : selectFilterHWBS?.value === "vitalsNotPresent"
              ? item.vitalsPresent === "No"
              : true
          );
        })
        .filter((item) => {
          return selectedEmpType?.value === ""
            ? true
            : item.employmentType === selectedEmpType.value;
        })
        .filter((item) => {
          return selectedEmpIdCommaSep === ""
            ? true
            : selectedEmpIdCommaSep.split(",").includes(item.empId);
        })
        .filter((item) => {
          return selectedTokenList === ""
            ? true
            : selectedTokenList
                .split(",")
                .includes(item?.tokenNumber?.toString());
        })
        .filter((item) => {
          const vitalsCreatedDate = new Date(item.vitalsCreatedDate);
          // const withinDateRange =
          //   !fromDate ||
          //   !toDate ||
          //   (vitalsCreatedDate >= new Date(fromDate) &&
          //     vitalsCreatedDate <= new Date(toDate));
          // return withinDateRange;
          if (fromDate && toDate) {
            const withinDateRange =
              vitalsCreatedDate >= new Date(fromDate) &&
              vitalsCreatedDate <= new Date(toDate);

            return withinDateRange;
          } else if (fromDate) {
            // If only fromDate is provided, filter for that specific date
            const withinDateRange =
              vitalsCreatedDate >= new Date(fromDate) &&
              vitalsCreatedDate <= new Date(fromDate); // toDate is same as fromDate
            return withinDateRange;
          } else {
            const withinDateRange =
              !fromDate ||
              !toDate ||
              (vitalsCreatedDate >= new Date(fromDate) &&
                vitalsCreatedDate <= new Date(toDate));
            return withinDateRange;
          }
        })
        .sort((a, b) => {
          if (selectedCreatedSort.value === "") return 0;
          return selectedCreatedSort.value === "ASCENDING"
            ? new Date(a.vitalsCreatedDate) - new Date(b.vitalsCreatedDate)
            : new Date(b.vitalsCreatedDate) - new Date(a.vitalsCreatedDate);
        });
    }
  }, [
    masterData,
    selectFilterHWBS,
    selectedTokenList,
    selectedEmpType,
    searchedEmployee,
    selectedCreatedSort,
    fromDate,
    toDate,
    selectedEmpIdCommaSep,
  ]);

  useEffect(() => {
    const saveFilter = {
      selectFilterHWBS,
      searchedEmployee,
      selectedCreatedSort,
      selectedEmpType,
      fromDate,
      toDate,
    };
    localStorage.setItem("SAVED_FILTER_MASTER_PDF", JSON.stringify(saveFilter));
  }, [
    selectFilterHWBS,
    searchedEmployee,
    selectedCreatedSort,
    selectedEmpType,
    fromDate,
    toDate,
  ]);

  console.log({ masterData });

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
            height: isMobile ? "100%" : "84vh",
            paddingBlock: "10px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item lg={3} xs={12}>
              <CustomAutocomplete
                options={filterHWBS}
                label="Filter HWBS Values"
                placeholder="Search Status of HWBS"
                value={selectFilterHWBS}
                onChange={handleSelectHWBSStatus}
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <GlobalDateLayout
                initialDate={fromDate}
                setDate={setFromDate}
                label={"From Date"}
                disableFuture={true}
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <GlobalDateLayout
                initialDate={toDate}
                setDate={setToDate}
                label={"To Date"}
                disableFuture={true}
              />
            </Grid>
            {/* <Grid item lg={3} xs={12}>
              <CustomAutocomplete
                options={filterVitalsCreatedDate}
                label={`Sort By Vitals Created Date`}
                placeholder="Select Value"
                value={selectedCreatedSort}
                onChange={handleSelectedCreatedDateSort}
              />
            </Grid> */}
            <Grid item xs={12} lg={2.5}>
              <CustomAutocomplete
                options={filterEmpType}
                label={`Filter Emp Type`}
                placeholder="Search Value"
                value={selectedEmpType}
                onChange={handleEmpType}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                size="small"
                fullWidth
                label={`Filter Employee ID Comma Seperated`}
                placeholder={`Enter Employee ID Comma Seperated`}
                value={selectedEmpIdCommaSep || ""}
                onChange={(e) => {
                  setSelectedEmpIdCommaSep(e.target.value);
                  handleChangeEmployeeCommaSepIds(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <TextField
                size="small"
                fullWidth
                label={`Filter Search Token no Comma Seperated`}
                placeholder={`Enter list of token no Comma Seperated`}
                value={selectedTokenList}
                onChange={(e) => {
                  setSelectedTokenList(e.target.value);
                }}
              />
            </Grid>
          </Grid>

          <CustomDataGridLayout
            hideFooterPagination={false}
            Gridheight={isMobile ? "100%" : "74vh"}
            rows={filteredData}
            columns={columns}
            rowHeight={30}
            getRowId={(row) => row?.empId}
            onCellClick={handleCellClick}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            selectionModel={selectedRows.map((row) => row.empId)}
            onRowSelectionModelChange={handleSelectionModelChange}
          />
        </Paper>
      </Box>
      <CreatePdfModal
        employeeList={selectedRows}
        setEmployeeList={setSelectedRows}
        corpId={corpId}
        totalEmployees={selectedRows?.length}
        originalEmployeeList={masterData.filter(
          (employee, index, self) =>
            employee.empId !== null &&
            employee.empId !== "" &&
            self.findIndex((e) => e?.empId === employee?.empId) === index
        )}
      />
    </Fragment>
  );
};

export default MasterPdfMain;
