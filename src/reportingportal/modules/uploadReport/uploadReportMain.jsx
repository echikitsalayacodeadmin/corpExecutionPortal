import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import { fetchSuperMasterData } from "../../services/homeservices";
import { ReportingContext } from "../../global/context/context";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  Modal,
  Paper,
  Portal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { useFileUpload } from "use-file-upload";
import {
  saveData,
  updateData,
  uploadFile,
} from "../../assets/reportingServices";
import { BASE_URL } from "../../../assets/constants";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";
import PdfViewerModal from "../../../organalysis/modules/home/subComps/pdfViewerModal";
import { PhotoViewer } from "../../../assets/photoViewer";
import { isDesktop, isMobile } from "react-device-detect";
import CustomButtonWhite from "../../../assets/customButtonWhite";
import { sortDataByName } from "../../../assets/utils";
import { getReportingPermissions } from "../../assets/reportingPermisions";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";
import CreateNormalEcg from "./subComp/createNormalEcg";

const UploadReportMain = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  role = localStorage.getItem("REPORTING_ROLE"),
}) => {
  const {
    selectedColumns,
    openDialog,
    openDialogEcg,
    setOpenDialogEcg,
    handleCloseDialog,
    setSelectedColumns,
    handleButtonClick,
    updateEmployeeList,
    empListHeader,
    searchedEmployee,
    selectedReportData,
    selectedEmployeeCommaSepIds,
    handleChangeEmployeeCommaSepIds,
  } = useContext(ReportingContext);
  const permissions = getReportingPermissions();
  console.log({ selectedReportData });

  const _storedData = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("SAVED_FILTER_UPLOAD_REPORT")) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  useEffect(() => {
    setSelectedCreatedSort(
      _storedData.selectedCreatedSort || {
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

  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchSuperMasterData(
      corpId,
      setIsLoading,
      setMasterData,
      updateEmployeeList
    );
  }, [openDialog, openDialogEcg]);

  const [pdfUrl, setPdfUrl] = useState("");
  const [deleteData, setDeleteData] = useState("");
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const columns = [
    permissions.uploadReportTab.columnVisibility.uploadReportCol && {
      field: "uploadSingleReport",
      headerName: "Upload Report",
      width: 110,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              p: "3px",
              borderRadius: "3px",
              m: 0,
            }}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                handleUploadSingle(name, size, source, file, params);
                console.log("Files Selected", {
                  name,
                  size,
                  source,
                  file,
                });
              })
            }
          >
            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              Upload Report
            </Typography>
          </Button>
        );
      },
    },
    {
      field: "isBloodParsed",
      headerName: "Is Blood Parsed",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "isPftParsed",
      headerName: "Is PFT Parsed",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "isAudiometryParsed",
      headerName: "Is Audiometry Parsed",
      width: 150,
      align: "left",
      headerAlign: "left",
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
      field: "stool",
      headerName: "Stool",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.stoolUrl;
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
      field: "stoolSampleCollected",
      headerName: "Stool Sample Collected",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bloodStatus",
      headerName: "Blood Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "bloodToggle",
      headerName: "Blood Toggle",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "urineToggle",
      headerName: "Urine Toggle",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "audiometry",
      headerName: "Audiometry",
      width: 150,
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
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "audiometryToggle",
      headerName: "Audiometry Toggle",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
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
      field: "xrayToggle",
      headerName: "Xray Toggle",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
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
      headerName: "Pft Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "pftToggle",
      headerName: "Pft Toggle",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
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
      headerName: "Ecg Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "ecgToggle",
      headerName: "Ecg Toggle",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontSize: "15px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },

    { field: "name", headerName: "Name", width: 200 },
    {
      field: "patientNameinBloodReport",
      headerName: "Patient Name in Report",
      align: "left",
      headerAlign: "left",
      width: 300,
    },
    {
      field: "patientNameinPftReport",
      headerName: "Patient Name in Report",
      align: "left",
      headerAlign: "left",
      width: 300,
    },
    {
      field: "patientNameinAudiometryReport",
      headerName: "Patient Name in Report",
      align: "left",
      headerAlign: "left",
      width: 300,
    },
    {
      field: "bloodReportNameMatching",
      headerName: "Blood Report Name Matching",
      align: "left",
      headerAlign: "left",
      width: 300,
    },
    {
      field: "pftReportNameMatching",
      headerName: "Pft Report Name Matching",
      align: "left",
      headerAlign: "left",
      width: 300,
    },
    {
      field: "audiometryReportNameMatching",
      headerName: "Audiometry Report Name Matching",
      align: "left",
      headerAlign: "left",
      width: 300,
    },

    { field: "empId", headerName: "Emp ID", width: 100 },
    {
      field: "age",
      headerName: "Age",
      width: 80,
    },
    {
      field: "tokenNumber",
      headerName: "Token No",
      width: 75,
      align: "left",
      headerAlign: "left",
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
      field: "vitalsCreatedDate",
      headerName: "Vitals Created Date",
      width: 150,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "bloodTestUrlFileName",
      headerName: "Blood Test Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params.value !== "" && params.row.bloodTestUrl;
        const url = params.row.bloodTestUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(url, "_blank")}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "stoolUrlFileName",
      headerName: "Stool Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params.value !== "" && params.row.stoolUrl;
        const url = params.row.stoolUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(url, "_blank")}
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "audiometryUrlFileName",
      headerName: "Audiometry Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params.value !== "" && params.row.audiometryUrl;
        const url = params.row.audiometryUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(url, "_blank")}
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "xrayFilmUrlFileName",
      headerName: "Xray Film Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params.value !== "" && params.row.xrayFilmUrl;
        const url = params.row.xrayFilmUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(url, "_blank")}
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "pftUrlFileName",
      headerName: "PFT Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params.value !== "" && params.row.pftUrl;
        const url = params.row.pftUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(url, "_blank")}
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "ecgUrlFileName",
      headerName: "ECG Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params?.value !== "" && params?.row?.ecgUrl;
        const url = params?.row?.ecgUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(params?.row?.ecgUrl, "_blank")}
          >
            {params?.value}
          </Typography>
        );
      },
    },
    {
      field: "firstAid",
      headerName: "First Aid",
      width: 120,
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
      field: "firstAidUrlFileName",
      headerName: "First Aid Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params?.value !== "" && params?.row?.firstAidUrl;
        const url = params?.row?.firstAidUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(params?.row?.firstAidUrl, "_blank")}
          >
            {params?.value}
          </Typography>
        );
      },
    },
    {
      field: "fireSafety",
      headerName: "Fire Safety",
      width: 120,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      renderCell: (params) => {
        const isClickable = params.value === "Yes" && params.row.fireSafetyUrl;
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
      field: "fireSafetyUrlFileName",
      headerName: "Fire Safety Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params?.value !== "" && params?.row?.fireSafetyUrl;
        const url = params?.row?.fireSafetyUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(params?.row?.fireSafetyUrl, "_blank")}
          >
            {params?.value}
          </Typography>
        );
      },
    },
    {
      field: "annexureUrlFileName",
      headerName: "Annexure Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params?.value !== "" && params?.row?.annexureUrl;
        const url = params?.row?.annexureUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(params?.row?.annexureUrl, "_blank")}
          >
            {params?.value}
          </Typography>
        );
      },
    },
    {
      field: "consolidatedRUrlFileName",
      headerName: "Consolidated R Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable =
          params?.value !== "" && params?.row?.consolidatedRUrl;
        const url = params?.row?.consolidatedRUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(params?.row?.consolidatedRUrl, "_blank")}
          >
            {params?.value}
          </Typography>
        );
      },
    },
    {
      field: "tmtUrlFileName",
      headerName: "TMT Url File Name",
      width: 350,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        const isClickable = params?.value !== "" && params?.row?.tmtUrl;
        const url = params?.row?.tmtUrl;
        return (
          <Typography
            sx={{
              fontSize: "15px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => window.open(params?.row?.tmtUrl, "_blank")}
          >
            {params?.value}
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
      width: 250,
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
    {
      field: "reportAction",
      headerName: "Report Action",
      width: 170,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (selectedColumns.includes("bloodTest") &&
          params.row.bloodTestUrl) ||
          (selectedColumns.includes("ecg") && params.row.ecgUrl) ||
          (selectedColumns.includes("pft") && params.row.pftUrl) ||
          (selectedColumns.includes("audiometry") &&
            params.row.audiometryUrl) ||
          (selectedColumns.includes("xrayFilm") && params.row.xrayFilmUrl) ||
          (selectedColumns.includes("firstAidUrl") && params.row.firstAidUrl) ||
          (selectedColumns.includes("fireSafetyUrl") &&
            params.row.fireSafetyUrl) ||
          (selectedColumns.includes("tmtUrl") && params.row.tmtUrl) ||
          (selectedColumns.includes("annexureUrl") && params.row.annexureUrl) ||
          (selectedColumns.includes("consolidatedRUrl") &&
            params.row.consolidatedRUrl) ? (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              onClick={() => {
                handleModal();
                if (selectedColumns.includes("bloodTest")) {
                  setPdfUrl(params?.row?.bloodTestUrl);
                } else if (selectedColumns.includes("ecg")) {
                  setPdfUrl(params?.row?.ecgUrl);
                } else if (selectedColumns.includes("pft")) {
                  setPdfUrl(params?.row?.pftUrl);
                } else if (selectedColumns.includes("xrayFilm")) {
                  setPdfUrl(params?.row?.xrayFilmUrl);
                } else if (selectedColumns.includes("audiometry")) {
                  setPdfUrl(params?.row?.audiometryUrl);
                } else if (selectedColumns.includes("firstAidUrl")) {
                  setPdfUrl(params?.row?.firstAidUrl);
                } else if (selectedColumns.includes("fireSafetyUrl")) {
                  setPdfUrl(params?.row?.fireSafetyUrl);
                } else if (selectedColumns.includes("tmtUrl")) {
                  setPdfUrl(params?.row?.tmtUrl);
                } else if (selectedColumns.includes("consolidatedRUrl")) {
                  setPdfUrl(params?.row?.consolidatedRUrl);
                } else if (selectedColumns.includes("annexureUrl")) {
                  setPdfUrl(params?.row?.annexureUrl);
                } else if (selectedColumns.includes("stoolUrl")) {
                  setPdfUrl(params?.row?.stoolUrl);
                }
              }}
            >
              View File
            </Button>
            {permissions.uploadReportTab.columnVisibility.uploadReportCol && (
              <IconButton
                onClick={() => {
                  handleClickOpenDelete();
                  setDeleteData(params);
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            )}
          </Box>
        ) : null;
      },
    },
  ];
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    console.log({ selectionModel });
    const selectedRowsData = selectionModel.map((id) => {
      return masterData?.find((row) => row.empId === id);
    });
    console.log({ selectedRowsData });
    setSelectedRows(selectedRowsData);
  };

  const handleCellClick = (params) => {
    const field = params.field;
    const cellValue = params.value;
    if (
      (field === "bloodTest" ||
        field === "stool" ||
        field === "pft" ||
        field === "ecg" ||
        field === "audiometry" ||
        field === "firstAid" ||
        field === "fireSafety" ||
        field === "xrayFilm") &&
      cellValue === "Yes"
    ) {
      const pdfURL = params?.row[field + "Url"] || null;
      console.log({ pdfURL });
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

  const filterUploadedColumn = [
    { value: "ALL", label: "All" },
    {
      value: "UPLOADED",
      label: "Uploaded",
    },
    {
      value: "NOT_UPLOADED",
      label: "Not Uploaded",
    },
    {
      value: "NA",
      label: "NA",
    },
  ];

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

  const [selectedUploadedStatus, setSelectedUploadedStatus] = useState({
    value: "ALL",
    label: "All",
  });

  const handleSelectedUploadedStatus = (event, newValue, reason) => {
    setSelectedUploadedStatus(newValue);

    if (reason === "clear") {
      setSelectedUploadedStatus({
        value: "ALL",
        label: "All",
      });
    }
  };

  const [selectedEmpIdCommaSep, setSelectedEmpIdCommaSep] = useState("");
  const [selectedTokenList, setSelectedTokenList] = React.useState("");

  const filteredData = useMemo(() => {
    if (role === "REPORTING_OPS") {
      return sortDataByName(masterData)?.filter(
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
          return selectedTokenList === ""
            ? true
            : selectedTokenList
                .split(",")
                .includes(item?.tokenNumber?.toString());
        })
        ?.filter((item) => {
          const reportValueFilter =
            selectedReportData?.title === "Master Data" ||
            selectedReportValue?.value === "ALL" ||
            item[selectedReportData?.filterValue] ===
              selectedReportValue?.value;
          const empType =
            selectedEmpType?.value === "" ||
            item.employmentType === selectedEmpType.value;
          const uploadedStatusFilter =
            selectedReportData?.title === "Master Data" ||
            selectedUploadedStatus?.value === "ALL" ||
            selectedReportData?.uploadStatusField === "xrayStatus" ||
            selectedReportData?.uploadStatusField === "firstAidStatus" ||
            selectedReportData?.uploadStatusField === "fireSafetyStatus" ||
            item[selectedReportData?.uploadStatusField] ===
              selectedUploadedStatus?.value;
          const searchFilter =
            searchedEmployee !== ""
              ? item?.name === searchedEmployee?.name &&
                item?.empId === searchedEmployee?.empId
              : true;
          const vitalsCreatedDate = new Date(item.vitalsCreatedDate);
          if (fromDate && toDate) {
            const withinDateRange =
              vitalsCreatedDate >= new Date(fromDate) &&
              vitalsCreatedDate <= new Date(toDate);

            return (
              reportValueFilter &&
              empType &&
              uploadedStatusFilter &&
              searchFilter &&
              withinDateRange
            );
          } else if (fromDate) {
            // If only fromDate is provided, filter for that specific date
            const withinDateRange =
              vitalsCreatedDate >= new Date(fromDate) &&
              vitalsCreatedDate <= new Date(fromDate); // toDate is same as fromDate

            return (
              reportValueFilter &&
              empType &&
              uploadedStatusFilter &&
              searchFilter &&
              withinDateRange
            );
          } else {
            return (
              reportValueFilter &&
              empType &&
              uploadedStatusFilter &&
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
    selectedReportValue,
    selectedEmpType,
    selectedUploadedStatus,
    searchedEmployee,
    selectedCreatedSort,
    selectedTokenList,
    selectedReportData,
    fromDate,
    toDate,
    selectedEmpIdCommaSep,
  ]);

  // useEffect(() => {
  //   updateEmployeeList(filteredData);
  // }, [filteredData]);

  const columnVisibilityModel = useMemo(() => {
    const defaultVisibility = {};
    columns?.forEach((column) => {
      defaultVisibility[column.field] =
        selectedColumns?.length === 0 ||
        selectedColumns?.includes(column.field);
    });
    return defaultVisibility;
  }, [columns, selectedColumns]);

  useEffect(() => {
    const saveFilter = {
      selectedCreatedSort,
      selectedEmpType,
      selectedReportValue,
      fromDate,
      toDate,
    };
    localStorage.setItem(
      "SAVED_FILTER_UPLOAD_REPORT",
      JSON.stringify(saveFilter)
    );
  }, [
    selectedCreatedSort,
    selectedEmpType,
    selectedReportValue,
    fromDate,
    toDate,
  ]);

  const [files, selectFiles] = useFileUpload();
  const { enqueueSnackbar } = useSnackbar();
  const handleUploadSingle = async (name, size, source, file, params) => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    setIsLoading(true);

    const newFile = new File(
      [file],
      `${filteredData[0]?.name}_${filteredData[0]?.empId}.pdf`,
      {
        type: file.type,
      }
    );
    const formData = new FormData();
    formData.append(
      "file",
      selectedReportData?.enum === "FIRST_AID" ||
        electedReportData?.enum === "FIRE_SAFETY"
        ? newFile
        : file
    );
    const url =
      BASE_URL +
      `org/upload?empId=${params?.row?.empId}&fileType=${
        selectedReportData?.enum
      }&corpId=${corpId}&campCycleId=${campCycleId || ""}`;
    const result = await uploadFile(url, formData);
    if (result && result.data) {
      console.log("SUCCESS POST", result?.data);
      enqueueSnackbar("Successfully Uploaded!", {
        variant: "success",
      });
      fetchSuperMasterData(
        corpId,
        setIsLoading,
        setMasterData,
        updateEmployeeList
      );
      setIsLoading(false);
    } else {
      console.log("ERROR POST", result.error);
      enqueueSnackbar("An error occured!", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteReport = async () => {
    setIsLoading(true);
    const fileType = selectedColumns.includes("bloodTest")
      ? "BLOODTEST"
      : selectedColumns.includes("ecg")
      ? "ECG"
      : selectedColumns.includes("pft")
      ? "PFT"
      : selectedColumns.includes("audiometry")
      ? "AUDIOMETRY"
      : selectedColumns.includes("xrayFilm")
      ? "XRAY_FILM"
      : selectedColumns.includes("firstAidUrl")
      ? "FIRST_AID"
      : selectedColumns.includes("fireSafetyUrl")
      ? "FIRE_SAFETY"
      : selectedColumns.includes("tmtUrl")
      ? "TMT"
      : selectedColumns.includes("consolidatedRUrl")
      ? "CONSOLIDATED_REPORT"
      : selectedColumns.includes("annexureUrl")
      ? "ANNEXURE"
      : selectedColumns.includes("stoolUrl")
      ? "STOOLTEST"
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

  const [loading, setLoading] = useState(false);

  const handleParseTrigger = async () => {
    setLoading(true);
    const Obj = {
      corpId: corpId,
      orgEmployeeFileType: selectedReportData?.enum,
      employeesListAsString: selectedRows
        ?.map((employee) => employee?.empId)
        ?.join(","),
    };
    const url = BASE_URL + "org/parseReports";
    const result = await saveData(url, Obj);
    if (result.data) {
      enqueueSnackbar("Successfully Triggered, It will reflect in some time", {
        variant: "success",
      });
      setLoading(false);
    } else {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  console.log({
    dummy: sortDataByName(masterData)?.filter(
      (item) =>
        item?.name === searchedEmployee?.name &&
        item?.empId === searchedEmployee?.empId
    ),
  });

  console.log({ masterData });

  if (isLoading) {
    return (
      <Fragment>
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Fragment>
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
          <Grid container spacing={2}>
            {selectedReportData.label === "Miscellaneous" ||
            selectedReportData.label === "Consolidated Report" ||
            selectedReportData.label === "Annexure" ? null : (
              <Grid item xs={12} lg={2}>
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
              </Grid>
            )}
            <Grid item xs={12} lg={4} sx={{ display: "flex", gap: 2 }}>
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
            {/* <Grid item xs={12} lg={3}>
              <CustomAutocomplete
                options={filterVitalsCreatedDate}
                label={`Sort By Vitals Created Date`}
                placeholder="Select Value"
                value={selectedCreatedSort}
                onChange={handleSelectedCreatedDateSort}
              />
            </Grid> */}
            {(selectedReportData.label === "Blood" ||
              selectedReportData.label === "PFT" ||
              selectedReportData.label === "ECG" ||
              selectedReportData.label === "Audiometry") && (
              <Grid item xs={12} lg={2}>
                <CustomAutocomplete
                  disabled={
                    selectedReportData?.title === "Master Data" ? true : false
                  }
                  options={filterUploadedColumn}
                  label={`Filter ${selectedReportData.label} Status`}
                  placeholder="Search Value"
                  value={selectedUploadedStatus}
                  onChange={handleSelectedUploadedStatus}
                />
              </Grid>
            )}
            <Grid item xs={12} lg={2.5}>
              <CustomAutocomplete
                options={filterEmpType}
                label={`Filter Emp Type`}
                placeholder="Search Value"
                value={selectedEmpType}
                onChange={handleEmpType}
              />
            </Grid>
            <Grid item xs={12} lg={1.5}>
              <CustomButtonBlue
                disabled={selectedRows.length > 0 ? false : true}
                onClick={() => {
                  handleParseTrigger();
                }}
                title={loading ? "Parsing..." : "Parse Trigger"}
              />
              <Typography
                sx={{
                  fontSize: "10px",
                  p: 0,
                  m: 0,
                }}
              >
                Please Select Employees
              </Typography>
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
            columns={columns}
            initialState={{
              pinnedColumns: {
                left: ["tokenNumber", "empId", "name", "age", "gender"],
              },
            }}
            rowHeight={30}
            Gridheight={isMobile ? "100%" : "71vh"}
            getRowId={(row) => row?.empId}
            onCellClick={handleCellClick}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            selectionModel={selectedRows.map((row) => row.empId)}
            onRowSelectionModelChange={handleSelectionModelChange}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
          />
        </Paper>
      </Box>
      {pdfUrl.endsWith(".pdf") ? (
        <PdfViewerModal pdfUrl={pdfUrl} open={open} handleClose={handleModal} />
      ) : (
        <PhotoViewer url={pdfUrl} open={open} setOpen={setOpen} />
      )}

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

      <CreateNormalEcg open={openDialogEcg} setOpen={setOpenDialogEcg} />
    </Fragment>
  );
};

export default UploadReportMain;
