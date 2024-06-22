import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import GroupIcon from "@mui/icons-material/Group";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import SettingModal from "./settingModal";
import { ReportingContext } from "../../../global/context/context";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { fetchSuperMasterData } from "../../../services/homeservices";
import RenderExpandableCells from "../../../../assets/globalDataGridLayout/renderExpandableCells";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import { isMobile } from "react-device-detect";
import {
  filterUniqueEmployeesByEmpId,
  sortDataByName,
  stringToObject,
} from "../../../../assets/utils";
import SelectedEmployeesModal from "./selectedEmployeesModal";
import { updateData } from "../../../assets/reportingServices";
import PdfViewerModal from "../../../../organalysis/modules/home/subComps/pdfViewerModal";
import { PhotoViewer } from "../../../../assets/photoViewer";
import CustomButtonWhite from "../../../../assets/customButtonWhite";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { BASE_URL } from "../../../../assets/constants";
import { useSnackbar } from "notistack";
import UpdateEmpDetail from "./updateEmpDetail";
import CreateVaccineCertificate from "./createVaccineCertificate";

const HomeMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  role = localStorage.getItem("REPORTING_ROLE"),
}) => {
  const {
    selectedColumns,
    openDialog,
    handleCloseDialog,
    openDialogVC,
    setOpenDialogVC,
    setSelectedColumns,
    handleButtonClick,
    updateEmployeeList,
    empListHeader,
    setOpenDialog,
    searchedEmployee,
    updateSearchedEmployee,
    selectedReportData,
    selectedEmployeeCommaSepIds,
    handleChangeEmployeeCommaSepIds,
  } = useContext(ReportingContext);
  const { enqueueSnackbar } = useSnackbar();
  const _storedData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FILTER_HOME_MAIN")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  console.log({ _storedData });

  const [pdfUrl, setPdfUrl] = useState("");
  const [deleteData, setDeleteData] = useState("");
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    setSelectedFilterHWBS(
      _storedData.selectFilterHWBS || {
        value: "",
        label: "",
      }
    );

    setSelectedReportValue(
      _storedData.selectedReportValue || {
        value: "ALL",
        label: "All",
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

  console.log({ selectedEmployeeCommaSepIds });

  const [openEmpForm, setOpenEmpForm] = useState(false);
  const [empFormData, setEmpFormData] = useState("");
  const [openTestPresentDetail, setOpenTestPresentDetail] = useState(false);
  const [testDetails, setTestDetails] = useState({});

  const columns = [
    { field: "reportingSno", headerName: "Reporting Sno", width: 120 },
    { field: "empId", headerName: "Emp ID", width: 100 },
    {
      field: "tokenNumber",
      headerName: "Token No",
      width: 100,
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "age",
      headerName: "Age",
      width: 80,
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
      field: "pftToggle",
      headerName: "PFT Toggle",
      width: 120,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "audiometry",
      headerName: "Audiometry",
      width: 100,
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
      field: "audiometryToggle",
      headerName: "Audiometry Toggle",
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
      field: "bloodToggle",
      headerName: "Blood Toggle",
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
      field: "eyeTestToggle",
      headerName: "Eye Test Toggle",
      width: 120,
      align: "center",
      headerAlign: "center",
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
      field: "xrayToggle",
      headerName: "Xray Toggle",
      width: 120,
      align: "center",
      headerAlign: "center",
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
      field: "ecgToggle",
      headerName: "ECG Toggle",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "urintTestDone",
      headerName: "Urine Test Done",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "urineToggle",
      headerName: "Urine Toggle",
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
    ...(selectedColumns?.length === 0
      ? [
          selectedColumns?.length === 0 && {
            field: "pathPackageDetails",
            headerName: "Path Package Details",
            align: "center",
            headerAlign: "center",
            width: 800,
          },
          {
            field: "testPresentDetails",
            headerName: "Test Present Details",
            align: "center",
            headerAlign: "center",
            width: 170,
            renderCell: (params) => (
              <Box>
                {params?.value && Object.keys(params?.value).length > 0 && (
                  <Button
                    onClick={() => {
                      setOpenTestPresentDetail(true);
                      setTestDetails(params?.value);
                    }}
                  >
                    View
                  </Button>
                )}
              </Box>
            ),
            valueGetter: (params) => {
              const details = params.value;
              if (details && typeof details === "object") {
                return Object.entries(details)
                  .map(([key, value]) => `${key}: ${value ? "True" : "False"}`)
                  .join(", ");
              }
              return "";
            },
          },
        ]
      : []),
    ...(selectedColumns?.length === 0
      ? [
          selectedColumns?.length === 0 && {
            field: "updateEmp",
            headerName: "Update Emp",
            width: 100,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
              return (
                <IconButton
                  onClick={() => {
                    setOpenEmpForm(true);
                    setEmpFormData(params.row);
                  }}
                >
                  <EditIcon />
                </IconButton>
              );
            },
          },
        ]
      : []),
    ...(selectedColumns?.length > 0
      ? [
          {
            field: "reportAction",
            headerName: "Report Action",
            width: 170,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
              return (selectedColumns?.includes("form32") &&
                params?.row?.form32Url) ||
                (selectedColumns?.includes("form35") &&
                  params?.row?.form35Url) ||
                (selectedColumns?.includes("fitnessCertificate") &&
                  params?.row?.fitnessCertificateUrl) ||
                (selectedColumns?.includes("xray") && params?.row?.xrayUrl) ||
                (selectedColumns?.includes("medicalFitnessFood") &&
                  params?.row?.medicalFitnessFoodUrl) ||
                (selectedColumns?.includes("physicalFitnessForm") &&
                  params?.row?.physicalFitnessFormUrl) ||
                (selectedColumns?.includes("vaccinationCertificate") &&
                  params?.row?.vaccinationCertificateUrl) ? (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    onClick={() => {
                      handleModal();
                      if (selectedColumns?.includes("form32")) {
                        setPdfUrl(params?.row?.form32Url);
                      } else if (selectedColumns?.includes("form35")) {
                        setPdfUrl(params?.row?.form35Url);
                      } else if (
                        selectedColumns?.includes("fitnessCertificate")
                      ) {
                        setPdfUrl(params?.row?.fitnessCertificateUrl);
                      } else if (selectedColumns?.includes("xray")) {
                        setPdfUrl(params?.row?.xrayUrl);
                      } else if (
                        selectedColumns?.includes("medicalFitnessFood")
                      ) {
                        setPdfUrl(params?.row?.medicalFitnessFoodUrl);
                      } else if (
                        selectedColumns?.includes("physicalFitnessForm")
                      ) {
                        setPdfUrl(params?.row?.physicalFitnessFormUrl);
                      } else if (
                        selectedColumns?.includes("vaccinationCertificate")
                      ) {
                        setPdfUrl(params?.row?.vaccinationCertificateUrl);
                      }
                    }}
                  >
                    View File
                  </Button>

                  <IconButton
                    onClick={() => {
                      handleClickOpenDelete();
                      setDeleteData(params);
                    }}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </Box>
              ) : null;
            },
          },
        ]
      : []),
  ];

  console.log({ selectedColumns, columns });

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetchSuperMasterData(
        corpId,
        setIsLoading,
        setMasterData,
        updateEmployeeList
      );
    }, 50);
  }, [openDialog, openEmpForm, openDialogVC]);

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

  const filterReportValues = [
    { value: "ALL", label: "All" },
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "", label: "Empty" },
  ];
  const [selectedReportValue, setSelectedReportValue] = React.useState({
    value: "ALL",
    label: "All",
  });

  const handleSelectedReportValue = (event, newValue, reason) => {
    setSelectedReportValue(newValue);
    if (reason === "clear") {
      setSelectedReportValue({
        value: "ALL",
        label: "All",
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

  const filterHWBS = [
    // { value: "hwbsAllAbsent", label: "HWBS All Absent" },
    { value: "hwbsAllPresent", label: "HWBS All Present" },
    { value: "hwbsAnyPresent", label: "HWBS Any Present" },
    { value: "vitalsPresent", label: "Vitals Present" },
    { value: "vitalsNotPresent", label: "Vitals Not Present" },
  ];

  const [selectFilterHWBS, setSelectedFilterHWBS] = useState({
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

  const [openSelectedEmp, setOpenSelectedEmp] = useState(false);

  const handleOpenSelectedEmp = () => {
    setOpenSelectedEmp(true);
  };
  const handleCloseSelectedEmp = () => {
    setOpenSelectedEmp(false);
  };

  const [showReportingSeq, setShowReportingSeq] = useState(false);

  const handleShowReportingSeq = (event) => {
    setShowReportingSeq(event.target.checked);
  };

  const [selectedEmp, setSelectedEmp] = useState([]);

  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleSelectionModelChange = (selectionModel) => {
    console.log({ selectionModel });
    const selectedRowsData = selectionModel.map((id) => {
      return masterData?.find((row) => row.empId === id);
    });
    console.log({ selectedRowsData });
    setSelectedRows(selectedRowsData);
  };

  useEffect(() => {
    setSelectedEmp((prevState) => [...prevState, ...selectedRows]);
  }, [selectedRows]);

  const columnVisibilityModel = useMemo(() => {
    const defaultVisibility = {};
    columns?.forEach((column) => {
      defaultVisibility[column?.field] =
        selectedColumns?.length === 0 ||
        selectedColumns?.includes(column?.field);
    });
    return defaultVisibility;
  }, [columns, selectedColumns]);

  const [selectedEmpIdCommaSep, setSelectedEmpIdCommaSep] = useState("");
  const [selectedTokenList, setSelectedTokenList] = React.useState("");

  useEffect(() => {
    const saveFilter = {
      selectFilterHWBS,
      selectedEmpType,
      selectedReportValue,
      selectedCreatedSort,
      fromDate,
      toDate,
    };
    localStorage.setItem("SAVED_FILTER_HOME_MAIN", JSON.stringify(saveFilter));
  }, [
    selectFilterHWBS,
    selectedEmpType,
    selectedReportValue,
    selectedCreatedSort,
    fromDate,
    toDate,
  ]);

  // Memoized filtered data state
  const filteredData = useMemo(() => {
    if (role === "REPORTING_OPS") {
      return masterData?.filter(
        (item) =>
          item?.name === searchedEmployee?.name &&
          item?.empId === searchedEmployee?.empId
      );
    } else {
      return sortDataByName(masterData)
        .filter(
          (employee, index, self) =>
            employee.empId !== null &&
            employee.empId !== "" &&
            self.findIndex((e) => e?.empId === employee?.empId) === index
        )
        .filter((item) => {
          return selectedEmpIdCommaSep === ""
            ? true
            : selectedEmpIdCommaSep.split(",").includes(item.empId);
        })
        .filter((item) => {
          return showReportingSeq === false ? true : item.reportingSno;
        })
        .filter((item) => {
          return selectedTokenList === ""
            ? true
            : selectedTokenList
                .split(",")
                .includes(item?.tokenNumber?.toString());
        })
        ?.filter((item) => {
          const reportFilter =
            selectedReportData?.filterValue === "" ||
            item[selectedReportData?.filterValue] !== undefined;
          const reportValueFilter =
            selectedReportData?.title === "Master Data" ||
            selectedReportValue?.value === "ALL" ||
            item[selectedReportData?.filterValue] ===
              selectedReportValue?.value;
          const empType =
            selectedEmpType?.value === "" ||
            item.employmentType === selectedEmpType.value;
          const HWBSFilter =
            selectFilterHWBS?.value === "hwbsAllPresent"
              ? item.hwbsAllPresent === "Yes"
              : selectFilterHWBS?.value === "hwbsAnyPresent"
              ? item.hwbsAnyPresent === "Yes"
              : selectFilterHWBS?.value === "vitalsPresent"
              ? item.vitalsPresent === "Yes"
              : selectFilterHWBS?.value === "vitalsNotPresent"
              ? item.vitalsPresent === "No"
              : true;
          const searchFilter =
            searchedEmployee !== ""
              ? item?.name === searchedEmployee?.name &&
                item?.empId === searchedEmployee?.empId
              : true;

          const vitalsCreatedDate = new Date(item.vitalsCreatedDate);

          // Check if fromDate and toDate are provided
          if (fromDate && toDate) {
            const withinDateRange =
              vitalsCreatedDate >= new Date(fromDate) &&
              vitalsCreatedDate <= new Date(toDate);

            return (
              reportFilter &&
              empType &&
              reportValueFilter &&
              HWBSFilter &&
              searchFilter &&
              withinDateRange
            );
          } else if (fromDate) {
            // If only fromDate is provided, filter for that specific date
            const withinDateRange =
              vitalsCreatedDate >= new Date(fromDate) &&
              vitalsCreatedDate <= new Date(fromDate); // toDate is same as fromDate

            return (
              reportFilter &&
              empType &&
              reportValueFilter &&
              HWBSFilter &&
              searchFilter &&
              withinDateRange
            );
          } else {
            return (
              reportFilter &&
              empType &&
              reportValueFilter &&
              HWBSFilter &&
              searchFilter
            );
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
    role,
    selectedEmpType,
    selectedReportData,
    selectedReportValue,
    selectFilterHWBS,
    selectedTokenList,
    searchedEmployee,
    selectedCreatedSort,
    fromDate,
    toDate,
    selectedEmpIdCommaSep,
    showReportingSeq,
  ]);

  const deleteReport = async () => {
    setIsLoading(true);
    const fileType = selectedColumns.includes("form32")
      ? "PHYSICAL_FITNESS_CERTIFICATE"
      : selectedColumns.includes("form35")
      ? "FORM_35"
      : selectedColumns.includes("fitnessCertificate")
      ? "FITNESS_CERTIFICATE"
      : selectedColumns.includes("xray")
      ? "XRAY"
      : selectedColumns.includes("medicalFitnessFood")
      ? "FITNESS_CERTIFICATE_FOOD"
      : selectedColumns.includes("physicalFitnessForm")
      ? "PHYSICAL_FITNESS_FORM"
      : selectedColumns.includes("vaccinationCertificate")
      ? "VACCINATION_CERTIFICATE"
      : null;
    const url =
      BASE_URL +
      `org/employee/delete/file?empId=${deleteData?.row?.empId}&toDeletefiletype=${fileType}&corpId=${corpId}`;
    const response = await updateData(url, "");

    if (response.error) {
      console.log({ error: response.error });
      enqueueSnackbar("An Error Occured!", {
        variant: "error",
      });
      setIsLoading(false);
    } else {
      console.log({ success: response.data });
      if (response.data === true) {
        handleCloseDelete();
        setDeleteData("");
        enqueueSnackbar("Successfully Deleted!", {
          variant: "success",
        });
        fetchSuperMasterData(
          corpId,
          setIsLoading,
          setMasterData,
          updateEmployeeList
        );
        setIsLoading(false);
      } else if (response.data === false) {
        console.log({ error: response.error });
        enqueueSnackbar("An Error Occured!, File did not uploaded", {
          variant: "error",
        });
        setIsLoading(false);
      }
    }
  };

  console.log({ selectedRows });

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
            <Grid item xs={12} lg={2.5}>
              <CustomAutocomplete
                options={filterHWBS}
                label="Filter HWBS Values"
                placeholder="Search Status of HWBS"
                value={selectFilterHWBS}
                onChange={handleSelectHWBSStatus}
              />
            </Grid>
            {selectedReportData?.title === "Master Data" ? null : (
              <Grid item xs={12} lg={2.5}>
                {selectedReportData?.title === "Master Data" ? null : (
                  <CustomAutocomplete
                    disabled={
                      selectedReportData?.title === "Master Data" ? true : false
                    }
                    options={filterReportValues}
                    label={`Filter ${
                      selectedReportData.label || "Report"
                    } Values`}
                    placeholder="Search Value"
                    value={selectedReportValue}
                    onChange={handleSelectedReportValue}
                  />
                )}
              </Grid>
            )}
            <Grid
              item
              xs={12}
              lg={selectedReportData?.title === "Master Data" ? 4 : 4}
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <GlobalDateLayout
                initialDate={fromDate}
                setDate={setFromDate}
                label={"From Date"}
                disableFuture={true}
              />
              <GlobalDateLayout
                initialDate={toDate}
                setDate={setToDate}
                label={"To Date"}
                disableFuture={true}
              />
            </Grid>

            <Grid item xs={12} lg={2.5}>
              <CustomAutocomplete
                options={filterEmpType}
                label={`Filter Emp Type`}
                placeholder="Search Value"
                value={selectedEmpType}
                onChange={handleEmpType}
              />
            </Grid>
            <Grid item lg={2.5} xs={6} sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showReportingSeq}
                    onChange={handleShowReportingSeq}
                  />
                }
                label="FIlter Reporting Sequence"
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
            rows={filteredData}
            initialState={{
              columns: {
                columnVisibilityModel: columnVisibilityModel,
              },
            }}
            Gridheight={isMobile ? "100%" : "70vh"}
            columns={columns}
            selectedColumns={selectedColumns}
            rowHeight={30}
            getRowId={(row) => row?.empId}
            onCellClick={handleCellClick}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            selectionModel={selectedRows.map((row) => row.empId)}
            onRowSelectionModelChange={handleSelectionModelChange}
            columnVisibilityModel={columnVisibilityModel}
            // onColumnVisibilityModelChange={(newModel) =>
            //   setColumnVisibilityModel(newModel)
            // }
          />
        </Paper>
      </Box>
      <SettingModal
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        employeeList={selectedRows}
        corpId={corpId}
        originalEmployeeList={masterData}
      />

      <SelectedEmployeesModal
        openDialog={openSelectedEmp}
        handleCloseDialog={handleCloseSelectedEmp}
        selectedEmpList={filterUniqueEmployeesByEmpId(selectedEmp)}
        setSelectedEmpList={setSelectedEmp}
        setSelectedRows={setSelectedRows}
      />

      {pdfUrl.endsWith(".pdf") ? (
        <PdfViewerModal pdfUrl={pdfUrl} open={open} handleClose={handleModal} />
      ) : (
        <PhotoViewer url={pdfUrl} open={open} handleClose={handleModal} />
      )}

      <UpdateEmpDetail
        empFormData={empFormData}
        setEmpFormData={setEmpFormData}
        setOpenEmpForm={setOpenEmpForm}
        openEmpForm={openEmpForm}
      />

      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openDelete}
          onClose={() => handleCloseDelete()}
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
              width: "265px",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => handleCloseDelete()}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "15px",
                color: "#000000",
                marginTop: "-25px",
                marginBottom: "10px",
              }}
            >
              Confirm!
            </Typography>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "15px",
                    color: "#000000",
                  }}
                >
                  Are you sure?
                </Typography>
              </Grid>
              <Grid item xs={6} lg={6}>
                <CustomButtonBlue onClick={() => deleteReport()} title="Yes" />
              </Grid>
              <Grid
                item
                xs={6}
                lg={6}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <CustomButtonWhite
                  onClick={() => handleCloseDelete()}
                  title="No"
                  styles={{
                    borderWidth: "1px solid",
                    borderColor: "red",
                    "&:hover": {
                      borderColor: "red",
                    },
                  }}
                  textColor={"red"}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openTestPresentDetail}
          onClose={() => setOpenTestPresentDetail(false)}
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
              width: "365px",
              minHeight: "120px",
            }}
          >
            <Typography variant="h6">Test Package Details</Typography>
            <Box>
              {testDetails !== null &&
                typeof testDetails === "string" &&
                Object.entries(stringToObject(testDetails)).map(
                  ([key, value], index) => (
                    <Typography sx={{ fontSize: "15px" }} key={key}>
                      {index + 1 + ") "}
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                      {value ? "True" : "False"}
                    </Typography>
                  )
                )}
              {testDetails !== null &&
                typeof testDetails === "object" &&
                Object.entries(testDetails).map(([key, value], index) => (
                  <Typography sx={{ fontSize: "15px" }} key={key}>
                    {index + 1 + ") "}
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                    {value ? "True" : "False"}
                  </Typography>
                ))}
            </Box>
          </Box>
        </Modal>
      </Portal>

      <CreateVaccineCertificate
        open={openDialogVC}
        setOpen={setOpenDialogVC}
        selectedEmployees={selectedRows}
      />
    </Fragment>
  );
};

export default HomeMain;
