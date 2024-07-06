import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { ReportingContext } from "../../context/context";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, ListItemText, createSvgIcon } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UploadIcon from "@mui/icons-material/Upload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CloseIcon from "@mui/icons-material/Close";
import { getReportingPermissions } from "../../../assets/reportingPermisions";

const BasicMenu = () => {
  const {
    openDrawer,
    setOpenDrawer,
    handleButtonClick,
    showSequenceComponent,
    setShowSequenceComponent,
    updateEmployeeList,
    updateSelectedReport,
    selectedReportData,
  } = useContext(ReportingContext);
  const permissions = getReportingPermissions();
  const location = useLocation();

  const masterDataLocation = location.pathname === "/reporting/reporting-main";
  const goToMasterPdfDownload = location.pathname.includes(
    "/reporting/reporting-main/master-pdf-download"
  );

  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FILTER_SIDE_BAR")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  useEffect(() => {
    setOpenSubMenu(_storedData.openSubMenu || null);
    setSelectedPButton(_storedData.selectedPButton || null);
    setSelectedCButton(_storedData.selectedCButton || null);
  }, []);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    "SaveAlt"
  );

  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [selectedPButton, setSelectedPButton] = useState(null);
  const [selectedCButton, setSelectedCButton] = useState(null);

  const handleSubItemClick = (index) => {
    setOpenSubMenu(index === openSubMenu ? null : index);
  };

  const handleItemClick = (index) => {
    setSelectedPButton(index);
    setSelectedCButton(index);
  };

  useEffect(() => {
    setTimeout(() => {
      if (masterDataLocation === true && selectedCButton !== null) {
        handleButtonClick([]);
        setShowSequenceComponent(false);
        setSelectedPButton(null);
        setSelectedCButton(null);
        updateSelectedReport({
          value: "",
          title: "Master Data",
          label: "",
        });
      }
      if (goToMasterPdfDownload === true) {
        setSelectedCButton(32);
        setSelectedPButton(3);
        setShowSequenceComponent(true);
        updateSelectedReport({
          value: "",
          title: "Master PDF - Download",
          label: "Master PDF - Download",
          filterValue: "",
        });
      }
    }, 50);
  }, [masterDataLocation, goToMasterPdfDownload]);

  useEffect(() => {
    const savedFilter = {
      openSubMenu,
      selectedPButton,
      selectedCButton,
    };

    localStorage.setItem("SAVED_FILTER_SIDE_BAR", JSON.stringify(savedFilter));
  }, [openSubMenu, selectedPButton, selectedCButton]);

  useEffect(() => {
    setTimeout(() => {
      if (masterDataLocation === true && selectedCButton !== null) {
        handleButtonClick([]);
        setShowSequenceComponent(false);
        setSelectedPButton(null);
        setSelectedCButton(null);
        updateSelectedReport({
          value: "",
          title: "Master Data",
          label: "",
        });
        navigate("/reporting/reporting-main/master-data");
      }
      if (goToMasterPdfDownload === true) {
        setSelectedCButton(32);
        setSelectedPButton(3);
        setShowSequenceComponent(true);
        updateSelectedReport({
          value: "",
          title: "Master PDF - Download",
          label: "Master PDF - Download",
          filterValue: "",
        });
      }
    }, 50);
  }, [masterDataLocation, goToMasterPdfDownload]);

  const navLinksData = [
    {
      to: "/reporting/reporting-main/master-data",
      tabTitle: "Master Data",
      tabIcon: <StorageIcon />,
      onClick: () => {
        handleButtonClick([]);
        setShowSequenceComponent(false);
        handleItemClick(null);
        handleSubItemClick(null);
        updateSelectedReport({
          value: "",
          title: "Master Data",
          label: "",
        });
      },
      selectedPButton: null,
      selectedCButton: null,
      openSubMenuIndex: null,
      isSubMenuExist: false,
      visibility: permissions.masterDataTab.visibilty,
    },
    {
      to: "/reporting/reporting-main/master-data",
      tabTitle: "Create Report",
      tabIcon: <CreateIcon />,
      onClick: () => {
        handleSubItemClick(1);
        updateSelectedReport({
          value: "PHYSICAL_FITNESS_CERTIFICATE",
          title: "Create Report - Form 32",
          label: "Form 32",
          filterValue: "form32",
        });
        setSelectedCButton(11);
        setSelectedPButton(1);
        handleButtonClick([
          "empId",
          "tokenNumber",
          "name",
          "age",
          "gender",
          "height",
          "weight",
          "bp",
          "sugar",
          "form32",
          "vitalsCreatedDate",
          "reportAction",
        ]);
      },
      selectedPButton: 1,
      selectedCButton: 11,
      openSubMenuIndex: 1,
      isSubMenuExist: true,
      visibility: permissions.createReportTab.visibilty,
      subMenuList: [
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Form 32",
          onClick: () => {
            updateSelectedReport({
              value: "PHYSICAL_FITNESS_CERTIFICATE",
              title: "Create Report - Form 32",
              label: "Form 32",
              filterValue: "form32",
            });
            setSelectedCButton(11);
            setSelectedPButton(1);
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "height",
              "weight",
              "bp",
              "sugar",
              "form32",
              "vitalsCreatedDate",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 11,
        },
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Form 35",
          onClick: () => {
            setSelectedPButton(1);
            setSelectedCButton(12);
            updateSelectedReport({
              value: "FORM_35",
              title: "Create Report - Form 35",
              label: "Form 35",
              filterValue: "form35",
            });
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "form35",
              "eyeTest",
              "eyeToggle",
              "visionRemark",
              "vitalsCreatedDate",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 12,
        },
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Fitness Certificate",
          onClick: () => {
            setSelectedPButton(1);
            setSelectedCButton(13);
            updateSelectedReport({
              value: "FITNESS_CERTIFICATE",
              title: "Create Report - Fitness Certificate",
              label: "Fitness Certificate",
              filterValue: "fitnessCertificate",
            });
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "height",
              "weight",
              "bp",
              "sugar",
              "fitnessCertificate",
              "vitalsCreatedDate",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 13,
        },
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Physical Fitness Form",
          onClick: () => {
            setSelectedPButton(1);
            setSelectedCButton(14);
            updateSelectedReport({
              value: "PHYSICAL_FITNESS_FORM",
              title: "Create Report - Physical Fitness Form",
              label: "Physical Fitness Form",
              filterValue: "physicalFitnessForm",
            });
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "height",
              "weight",
              "bp",
              "sugar",
              "physicalFitnessForm",
              "vitalsCreatedDate",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 14,
        },
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Xray",
          onClick: () => {
            setSelectedPButton(1);
            updateSelectedReport({
              value: "XRAY",
              title: "Create Report - Xray",
              label: "Xray",
              filterValue: "xray",
            });
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "xray",
              "xrayFilm",
              "xrayToggle",
              "vitalsCreatedDate",
              "reportAction",
            ]);
            setSelectedCButton(15);
          },

          selectedCButtonSubMenu: 15,
        },
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Vaccination Certificate",
          onClick: () => {
            setSelectedPButton(1);
            setSelectedCButton(16);
            updateSelectedReport({
              value: "VACCINATION_CERTIFICATE",
              title: "Create Report - Vaccination Certificate",
              label: "Vaccination Certificate",
              filterValue: "vaccinationCertificate",
            });
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "height",
              "weight",
              "bp",
              "sugar",
              "vaccinationCertificate",
              "vitalsCreatedDate",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 16,
        },
        {
          to: "/reporting/reporting-main/master-data",
          subTabTitle: "Food Certificate",
          onClick: () => {
            setSelectedPButton(1);
            setSelectedCButton(17);
            updateSelectedReport({
              value: "FITNESS_CERTIFICATE_FOOD",
              title: "Create Report - Food Certificate",
              label: "Food Certificate",
              filterValue: "medicalFitnessFood",
            });
            handleButtonClick([
              "empId",
              "tokenNumber",
              "name",
              "age",
              "gender",
              "height",
              "weight",
              "bp",
              "sugar",
              "medicalFitnessFood",
              "vitalsCreatedDate",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 17,
        },
      ],
    },
    {
      to: "/reporting/reporting-main/upload-reports",
      tabTitle: "Upload Report",
      tabIcon: <UploadIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(2);
        setSelectedCButton(21);
        setSelectedPButton(2);
        setShowSequenceComponent(true);
        updateSelectedReport({
          value: "",
          title: "Upload Report - Blood",
          label: "Blood",
          uploadStatusField: "bloodStatus",
          enum: "BLOODTEST",
          filterValue: "bloodTest",
        });
        handleButtonClick([
          "tokenNumber",
          "patientNameinBloodReport",
          "isBloodParsed",
          "empId",
          "name",
          "age",
          "gender",
          "bloodTest",
          "bloodStatus",
          "bloodToggle",
          "urineToggle",
          "employmentType",
          "bloodTestUrlFileName",
          "fileName",
          "vitalsCreatedDate",
          "uploadSingleReport",
          "packageName",
          "missingTests",
          "pathPackageDetails",
          "reportAction",
        ]);
      },
      selectedPButton: 2,
      selectedCButton: 21,
      openSubMenuIndex: 2,
      isSubMenuExist: true,
      visibility: permissions.uploadReportTab.visibilty,
      subMenuList: [
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Blood",
          onClick: () => {
            setSelectedCButton(21);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Blood",
              label: "Blood",
              uploadStatusField: "bloodStatus",
              enum: "BLOODTEST",
              filterValue: "bloodTest",
            });
            handleButtonClick([
              "tokenNumber",
              "empId",
              "patientNameinBloodReport",
              "isBloodParsed",
              "name",
              "age",
              "gender",
              "bloodTest",
              "bloodStatus",
              "bloodToggle",
              "urineToggle",
              "employmentType",
              "bloodTestUrlFileName",
              "fileName",
              "vitalsCreatedDate",
              "uploadSingleReport",
              "packageName",
              "missingTests",
              "pathPackageDetails",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 21,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Stool",
          onClick: () => {
            setSelectedCButton(22);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Stool",
              label: "Stool",
              enum: "STOOLTEST",
              filterValue: "stool",
            });
            handleButtonClick([
              "tokenNumber",
              "empId",
              "name",
              "age",
              "gender",
              "employmentType",
              "stool",
              "stoolUrl",
              "stoolUrlFileName",
              "vitalsCreatedDate",
              "uploadSingleReport",
              "packageName",
              "missingTests",
              "pathPackageDetails",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 22,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "PFT",
          onClick: () => {
            setSelectedCButton(23);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - PFT",
              label: "PFT",
              uploadStatusField: "pftStatus",
              enum: "PFT",
              filterValue: "pft",
            });
            handleButtonClick([
              "tokenNumber",
              "empId",
              "isPftParsed",
              "patientNameinPftReport",
              "name",
              "age",
              "gender",
              "pft",
              "pftStatus",
              "pftToggle",
              "employmentType",
              "pftUrlFileName",
              "fileName",
              "vitalsCreatedDate",
              "uploadSingleReport",
              "packageName",
              "missingTests",
              "pathPackageDetails",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 23,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Audiometry",
          onClick: () => {
            setSelectedCButton(24);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Audiometry",
              enum: "AUDIOMETRY",
              label: "Audiometry",
              uploadStatusField: "audiometryStatus",
              filterValue: "audiometry",
            });
            handleButtonClick([
              "tokenNumber",
              "empId",
              "isAudiometryParsed",
              "patientNameinAudiometryReport",
              "name",
              "age",
              "gender",
              "audiometry",
              "audiometryStatus",
              "audiometryToggle",
              "employmentType",
              "audiometryUrlFileName",
              "fileName",
              "vitalsCreatedDate",
              "uploadSingleReport",
              "packageName",
              "missingTests",
              "pathPackageDetails",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 24,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "ECG",
          onClick: () => {
            setSelectedCButton(25);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - ECG",
              label: "ECG",
              uploadStatusField: "ecgStatus",
              enum: "ECG",
              filterValue: "ecg",
            });
            handleButtonClick([
              "tokenNumber",
              "empId",
              "name",
              "age",
              "gender",
              "ecg",
              "ecgStatus",
              "ecgToggle",
              "employmentType",
              "ecgUrlFileName",
              "fileName",
              "vitalsCreatedDate",
              "uploadSingleReport",
              "packageName",
              "missingTests",
              "pathPackageDetails",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 25,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Xray Film",
          onClick: () => {
            setSelectedCButton(26);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Xrayfilm",
              label: "Xray Film",
              uploadStatusField: "xrayStatus",
              enum: "XRAY_FILM",
              filterValue: "xrayFilm",
            });
            handleButtonClick([
              "tokenNumber",
              "empId",
              "name",
              "age",
              "gender",
              "xrayFilm",
              "xrayToggle",
              "employmentType",
              "xrayFilmUrlFileName",
              "fileName",
              "vitalsCreatedDate",
              "uploadSingleReport",
              "packageName",
              "missingTests",
              "pathPackageDetails",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 26,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "First Aid",
          onClick: () => {
            setSelectedCButton(27);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - First Aid",
              label: "First Aid",
              uploadStatusField: "firstAidStatus",
              enum: "FIRST_AID",
              filterValue: "firstAid",
            });
            handleButtonClick([
              "empId",
              "name",
              "age",
              "gender",
              "firstAid",
              "firstAidUrl",
              "firstAidUrlFileName",
              "uploadSingleReport",
              "reportAction",
            ]);
          },

          selectedCButtonSubMenu: 27,
        },
        {
          to: "/reporting/reporting-main/upload-reports/form21",
          subTabTitle: "Form 21",
          onClick: () => {
            setSelectedCButton(28);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Form 21",
              label: "Form 21",
            });
          },

          selectedCButtonSubMenu: 28,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Miscellaneous",
          onClick: () => {
            setSelectedCButton(29);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Miscellaneous",
              enum: "MISCELLANEOUS",
              label: "Miscellaneous",
            });
            handleButtonClick([
              "empId",
              "name",
              "age",
              "gender",
              "uploadSingleReport",
            ]);
          },
          selectedCButtonSubMenu: 29,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Consolidated Report",
          onClick: () => {
            setSelectedCButton(30);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - Consolidated Report",
              enum: "CONSOLIDATED_REPORT",
              label: "Consolidated Report",
            });
            handleButtonClick([
              "empId",
              "name",
              "age",
              "gender",
              "consolidatedRUrl",
              "consolidatedRUrlFileName",
              "uploadSingleReport",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 30,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "Annexture",
          onClick: () => {
            setSelectedCButton(301);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - ANNEXURE",
              enum: "ANNEXURE",
              label: "Annexure",
            });
            handleButtonClick([
              "empId",
              "name",
              "age",
              "gender",
              "annexureUrl",
              "annexureUrlFileName",
              "uploadSingleReport",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 301,
        },
        {
          to: "/reporting/reporting-main/upload-reports",
          subTabTitle: "TMT REPORT",
          onClick: () => {
            setSelectedCButton(302);
            setSelectedPButton(2);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Upload Report - TMT",
              enum: "TMT",
              label: "TMT",
            });
            handleButtonClick([
              "empId",
              "name",
              "age",
              "gender",
              "uploadSingleReport",
              "tmtUrl",
              "tmtUrlFileName",
              "reportAction",
            ]);
          },
          selectedCButtonSubMenu: 302,
        },
      ],
    },
    {
      to: "/reporting/reporting-main/master-pdf-request",
      tabTitle: "Master PDF",
      tabIcon: <UploadIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(3);
        setSelectedCButton(31);
        setSelectedPButton(3);
        setShowSequenceComponent(true);
        updateSelectedReport({
          value: "",
          title: "Master PDF - Request",
          label: "Master PDF - Request",
          filterValue: "",
        });
      },
      selectedPButton: 3,
      selectedCButton: 31,
      openSubMenuIndex: 3,
      isSubMenuExist: true,
      visibility: permissions.masterPdfTab.visibilty,
      subMenuList: [
        {
          to: "/reporting/reporting-main/master-pdf-request",
          subTabTitle: "Master PDF Request",
          onClick: () => {
            setSelectedCButton(31);
            setSelectedPButton(3);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Master PDF - Request",
              label: "Master PDF - Request",
              filterValue: "",
            });
          },

          selectedCButtonSubMenu: 31,
        },
        {
          to: "/reporting/reporting-main/master-pdf-download",
          subTabTitle: "Master PDF Download",
          onClick: () => {
            setSelectedCButton(32);
            setSelectedPButton(3);
            setShowSequenceComponent(true);
            updateSelectedReport({
              value: "",
              title: "Master PDF - Download",
              label: "Master PDF - Download",
              filterValue: "",
            });
          },

          selectedCButtonSubMenu: 32,
        },
      ],
    },
    {
      to: "/reporting/reporting-main/upload-sequence",
      tabTitle: "Upload Sequence",
      tabIcon: <UploadIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(4);
        handleItemClick(4);
        updateSelectedReport({
          value: "",
          label: "Upload Sequence",
          title: "Upload Sequence",
        });
      },
      selectedPButton: 4,
      isSubMenuExist: false,
      visibility: permissions.uploadSequenceTab.visibilty,
    },
    {
      to: "/reporting/reporting-main/upload-reports-cloud",
      tabTitle: "Upload Reports To Cloud",
      tabIcon: <UploadIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(5);
        updateSelectedReport({
          value: "",
          label: "Upload Reports To Cloud",
          title: "Upload Reports To Cloud",
        });
      },
      selectedPButton: 5,
      isSubMenuExist: false,
      visibility: permissions.uploadReportCloudTab.visibilty,
    },
    {
      to: "/reporting/reporting-main/refresh-data",
      tabTitle: "Refresh Headers",
      tabIcon: <RefreshIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(6);
        updateSelectedReport({
          value: "",
          label: "Refresh Headers",
          title: "Refresh Headers",
        });
      },
      selectedPButton: 6,
      isSubMenuExist: false,
      visibility: permissions.refreshHeadersTab.visibilty,
    },
    {
      to: "/reporting/reporting-main/health-register",
      tabTitle: "Health Register",
      tabIcon: <AssignmentIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(7);
        updateSelectedReport({
          value: "",
          label: "Health Register",
          title: "Health Register",
        });
      },
      selectedPButton: 7,
      isSubMenuExist: false,
      visibility: permissions.healthRegisterTab.visibilty,
    },
    {
      to: "/reporting/reporting-main/report-analysis",
      tabTitle: "Report Analysis",
      tabIcon: <AnalyticsIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(8);
        updateSelectedReport({
          value: "",
          label: "Report Analysis",
          title: "Report Analysis",
        });
      },
      selectedPButton: 8,
      isSubMenuExist: false,
      visibility: permissions.reportAnalysis.visibilty,
    },
    {
      to: "/reporting/reporting-main/mismatchpackage",
      tabTitle: "Package Mismatch",
      tabIcon: <AssignmentIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(9);
        updateSelectedReport({
          value: "",
          label: "Package Mismatch",
          title: "Package Mismatch",
        });
      },
      selectedPButton: 9,
      isSubMenuExist: false,
      visibility: permissions.packageMismatch.visibilty,
    },
    {
      to: "/reporting/reporting-main/addemppackgedefinition",
      tabTitle: "Add Emp Package Definition",
      tabIcon: <AssignmentIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(10);
        updateSelectedReport({
          value: "",
          label: "Add Emp Package Definition",
          title: "Add Emp Package Definition",
        });
      },
      selectedPButton: 10,
      isSubMenuExist: false,
      visibility: permissions.addEmpPackageDefinition.visibilty,
    },
    {
      to: "/reporting/reporting-main/vitalsdataerror",
      tabTitle: "Vitals Error Data",
      tabIcon: <StorageIcon />,
      onClick: () => {
        setShowSequenceComponent(true);
        updateEmployeeList([]);
        handleSubItemClick(null);
        handleItemClick(11);
        updateSelectedReport({
          value: "",
          label: "Vitals Error Data",
          title: "Vitals Error Data",
        });
      },
      selectedPButton: 11,
      isSubMenuExist: false,
      visibility: permissions.vitalsDataError.visibilty,
    },
  ];

  return (
    <Box>
      <Box>
        <IconButton
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <List>
            {navLinksData.map(
              (navLink, index) =>
                navLink?.visibility && (
                  <React.Fragment key={index}>
                    <NavLink
                      to={navLink.to}
                      style={({ isActive }) => ({
                        color: isActive ? "#000" : "#000",
                        textDecoration: "none",
                      })}
                    >
                      {navLink.isSubMenuExist === false ? (
                        <ListItemButton
                          onClick={navLink.onClick}
                          sx={
                            selectedPButton === navLink.selectedPButton
                              ? {
                                  backgroundColor: "lightgrey",
                                  "&:hover": {
                                    backgroundColor: "lightgrey",
                                  },
                                }
                              : {}
                          }
                        >
                          <ListItemIcon>{navLink.tabIcon}</ListItemIcon>

                          <ListItemText primary={navLink.tabTitle} />
                        </ListItemButton>
                      ) : (
                        <ListItemButton
                          onClick={navLink.onClick}
                          sx={
                            selectedPButton === navLink.selectedPButton
                              ? {
                                  backgroundColor: "lightgrey",
                                  "&:hover": {
                                    backgroundColor: "lightgrey",
                                  },
                                }
                              : {}
                          }
                        >
                          <ListItemIcon>
                            <CreateIcon />
                          </ListItemIcon>

                          <ListItemText primary={navLink.tabTitle} />
                          {openSubMenu === navLink.openSubMenuIndex ? (
                            <ListItemIcon>
                              <ExpandLessIcon />
                            </ListItemIcon>
                          ) : (
                            <ListItemIcon>
                              <ExpandMoreIcon />
                            </ListItemIcon>
                          )}
                        </ListItemButton>
                      )}
                    </NavLink>
                    {navLink.isSubMenuExist === true && (
                      <Collapse
                        in={openSubMenu === navLink.openSubMenuIndex}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {navLink.subMenuList.map((subMenu, subIndex) => (
                            <NavLink
                              key={subIndex}
                              to={subMenu.to}
                              style={({ isActive }) => ({
                                color: isActive ? "#000" : "#000",
                                textDecoration: "none",
                              })}
                            >
                              <ListItemButton
                                onClick={subMenu.onClick}
                                sx={
                                  selectedCButton ===
                                  subMenu.selectedCButtonSubMenu
                                    ? {
                                        backgroundColor: "#127DDD",
                                        color: "#FFF",
                                        "&:hover": {
                                          backgroundColor: "#127DDD",
                                        },
                                      }
                                    : {}
                                }
                              >
                                {subMenu.subTabTitle}
                              </ListItemButton>
                            </NavLink>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                )
            )}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
};

export default BasicMenu;
