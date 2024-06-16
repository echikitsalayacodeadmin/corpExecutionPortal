import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  createSvgIcon,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UploadIcon from "@mui/icons-material/Upload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { NavLink, useLocation } from "react-router-dom";
import { ReportingContext } from "../context/context";
import RefreshIcon from "@mui/icons-material/Refresh";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useSnackbar } from "notistack";

const SideBarbackUp = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const {
    openDrawer,
    handleButtonClick,
    showSequenceComponent,
    setShowSequenceComponent,
    updateEmployeeList,
    updateSelectedReport,
    selectedReportData,
  } = useContext(ReportingContext);

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

  return (
    <Box
      sx={{
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        marginTop: 1,
        overflowY: "scroll",
        borderRadius: "15px",
        width: "210px",
        height: "78vh",
        transition: "width 0.3s ease",
        backgroundColor: "#FFF",
        boxShadow: 3,
        display: openDrawer ? "block" : "none",
      }}
    >
      <List>
        <NavLink
          to={"/reporting/reporting-main/master-data"}
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",
            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              handleButtonClick([]);
              setShowSequenceComponent(false);
              setSelectedPButton(null);
              setSelectedCButton(null);
              updateSelectedReport({
                value: "",
                title: "Master Data",
                label: "",
              });
            }}
            sx={
              selectedPButton === null
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
              <StorageIcon />
            </ListItemIcon>

            <ListItemText primary="Master Data" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to={"/reporting/reporting-main/master-data"}
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",
            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              handleSubItemClick(1);
              handleItemClick(1);
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
              ]);
            }}
            sx={
              selectedPButton === 1
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

            <ListItemText primary="Create Report" />
            {openSubMenu === 1 ? (
              <ListItemIcon>
                <ExpandLessIcon />
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                <ExpandMoreIcon />
              </ListItemIcon>
            )}
          </ListItemButton>
        </NavLink>
        <Collapse in={openSubMenu === 1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
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
                ]);
              }}
              sx={
                selectedCButton === 11
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
              Form 32
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                setSelectedPButton(1);
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
                  "visionRemark",
                  "vitalsCreatedDate",
                ]);
                setSelectedCButton(12);
              }}
              sx={
                selectedCButton === 12
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
              Form 35
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                setSelectedPButton(1);
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
                ]);
                setSelectedCButton(13);
              }}
              sx={
                selectedCButton === 13
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
              Fitness Certificate
            </ListItemButton>
            <ListItemButton
              onClick={() => {
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
                ]);
                setSelectedCButton(14);
              }}
              sx={
                selectedCButton === 14
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
              Xray
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                setSelectedPButton(1);
                setSelectedCButton(15);
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
                ]);
              }}
              sx={
                selectedCButton === 15
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
              Food Certificate
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                setSelectedPButton(1);
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
                ]);
                setSelectedCButton(16);
              }}
              sx={
                selectedCButton === 16
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
              Physical Fitness Form
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                setSelectedPButton(1);
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
                ]);
                setSelectedCButton(17);
              }}
              sx={
                selectedCButton === 17
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
              Vaccination Certificate
            </ListItemButton>
          </List>
        </Collapse>
        <NavLink
          to="/reporting/reporting-main/upload-reports"
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",

            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleItemClick(2);
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
                "reportAction",
              ]);
            }}
            sx={
              selectedPButton === 2
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
              <UploadIcon />
            </ListItemIcon>

            <ListItemText primary="Upload Report" />
            {openSubMenu === 2 ? (
              <ListItemIcon>
                <ExpandLessIcon />
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                <ExpandMoreIcon />
              </ListItemIcon>
            )}
          </ListItemButton>
        </NavLink>

        <Collapse in={openSubMenu === 2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink
              to="/reporting/reporting-main/upload-reports"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
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
                    "reportAction",
                  ]);
                }}
                sx={
                  selectedCButton === 21
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
                Blood
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/upload-reports"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(22);
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
                    "reportAction",
                  ]);
                }}
                sx={
                  selectedCButton === 22
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
                PFT
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/upload-reports"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(23);
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
                    "reportAction",
                  ]);
                }}
                sx={
                  selectedCButton === 23
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
                Audiometry
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/upload-reports"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(24);
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
                    "reportAction",
                  ]);
                }}
                sx={
                  selectedCButton === 24
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
                ECG
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/upload-reports"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(25);
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
                    "reportAction",
                  ]);
                }}
                sx={
                  selectedCButton === 25
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
                Xrayfilm
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/upload-reports"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(26);
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
                }}
                sx={
                  selectedCButton === 26
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
                First Aid
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/upload-reports/form21"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(27);
                  setSelectedPButton(2);
                  setShowSequenceComponent(true);
                  updateSelectedReport({
                    value: "",
                    title: "Upload Report - Form 21",
                    label: "Form 21",
                  });
                }}
                sx={
                  selectedCButton === 27
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
                Form 21
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
        <NavLink
          to="/reporting/reporting-main/master-pdf-request"
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",

            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleItemClick(3);
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
            }}
            sx={
              selectedPButton === 3
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
              <ExportIcon />
            </ListItemIcon>
            <ListItemText primary="Master Pdf" />
            {openSubMenu === 3 ? (
              <ListItemIcon>
                <ExpandLessIcon />
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                <ExpandMoreIcon />
              </ListItemIcon>
            )}
          </ListItemButton>
        </NavLink>
        <Collapse in={openSubMenu === 3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink
              to="/reporting/reporting-main/master-pdf-request"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(31);
                  setSelectedPButton(3);
                  setShowSequenceComponent(true);
                  updateSelectedReport({
                    value: "",
                    title: "Master PDF - Request",
                    label: "Master PDF - Request",
                    filterValue: "",
                  });
                }}
                sx={
                  selectedCButton === 31
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
                Master PDF Request
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/reporting/reporting-main/master-pdf-download"
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",

                textDecoration: "none",
              })}
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCButton(32);
                  setSelectedPButton(3);
                  setShowSequenceComponent(true);
                  updateSelectedReport({
                    value: "",
                    title: "Master PDF - Download",
                    label: "Master PDF - Download",
                    filterValue: "",
                  });
                }}
                sx={
                  selectedCButton === 32
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
                Master PDF Download
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
        <NavLink
          to={"/reporting/reporting-main/upload-sequence"}
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",

            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleSubItemClick(4);
              handleItemClick(4);
              updateSelectedReport({
                value: "",
                label: "Upload Sequence",
                title: "Upload Sequence",
              });
            }}
            sx={
              selectedPButton === 4
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
              <UploadIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Sequence" />
          </ListItemButton>
        </NavLink>
        <NavLink
          to={"/reporting/reporting-main/upload-reports-cloud"}
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",
            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleSubItemClick(5);
              handleItemClick(5);
              updateSelectedReport({
                value: "",
                label: "Upload Reports To Cloud",
                title: "Upload Reports To Cloud",
              });
            }}
            sx={
              selectedPButton === 5
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
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Reports To Cloud" />
          </ListItemButton>
        </NavLink>
        <NavLink
          to="/reporting/reporting-main/refresh-data"
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",

            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleSubItemClick(6);
              handleItemClick(6);
              updateSelectedReport({
                value: "",
                label: "Refresh Headers",
                title: "Refresh Headers",
              });
            }}
            sx={
              selectedPButton === 6
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
              <RefreshIcon />
            </ListItemIcon>

            <ListItemText>Refresh Headers</ListItemText>
          </ListItemButton>
        </NavLink>
        <NavLink
          to="/reporting/reporting-main/health-register"
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",

            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleSubItemClick(7);
              handleItemClick(7);
              updateSelectedReport({
                value: "",
                label: "Health Register",
                title: "Health Register",
              });
            }}
            sx={
              selectedPButton === 7
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
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText>Health Register</ListItemText>
          </ListItemButton>
        </NavLink>
        <NavLink
          to="/reporting/reporting-main/report-analysis"
          style={({ isActive }) => ({
            color: isActive ? "#000" : "#000",

            textDecoration: "none",
          })}
        >
          <ListItemButton
            onClick={() => {
              setShowSequenceComponent(true);
              updateEmployeeList([]);
              handleSubItemClick(8);
              handleItemClick(8);
              updateSelectedReport({
                value: "",
                label: "Report Analysis",
                title: "Report Analysis",
              });
            }}
            sx={
              selectedPButton === 8
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
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText>Report Analysis</ListItemText>
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );
};

export default SideBarbackUp;
