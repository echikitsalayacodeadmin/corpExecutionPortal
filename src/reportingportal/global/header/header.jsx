import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReportingContext } from "../context/context";
import { Autocomplete, TextField, Typography } from "@mui/material";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import { useLocation } from "react-router-dom";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import BasicMenu from "./subComp/basicMenu";
import CustomSelect from "../../../assets/customSelect";
import { getCampList } from "../../services/campCycleIdServices";
import SelectCampId from "../selectCampId/selectCampId";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "15px",
  backgroundColor: "#F0F3F4",
  "&:hover": {
    backgroundColor: "lightgrey",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: 360,
  },
  [theme.breakpoints.up("lg")]: {
    // Add this media query for lg screens
    width: 360, // Adjust as needed
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  // color: "inherit",
  "& .MuiAutocomplete-inputRoot": {
    // padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const Header = () => {
  const {
    setOpenDrawer,
    openDrawer,
    openDialog,
    setOpenDialog,
    empListHeader,
    updateSearchedEmployee,
    selectedReportData,
  } = React.useContext(ReportingContext);

  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FILTER_HEADER")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  React.useEffect(() => {
    setSelectedEmployee(_storedData.selectedEmployee || null);
  }, []);

  const handleMenuClick = () => {
    setOpenDrawer(!openDrawer);
  };

  let location = useLocation();

  const hasUploadReports = location.pathname.includes("upload-reports");
  const hasUploadReportsCloud = location.pathname.includes(
    "upload-reports-cloud"
  );
  const hasMasterPdfDownload = location.pathname.includes(
    "master-pdf-download"
  );

  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [selectedCampId, setSelectedCampId] = React.useState("");

  const handleEmployeeSelect = (event, value, reason) => {
    setSelectedEmployee(value);
    updateSearchedEmployee(value);
    if (reason === "clear") {
      updateSearchedEmployee("");
    }
  };

  React.useEffect(() => {
    const savedFilter = {
      selectedEmployee,
      selectedCampId,
    };
    localStorage.setItem("SAVED_FILTER_HEADER", JSON.stringify(savedFilter));
  }, [selectedEmployee]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: "15px",
          boxShadow: 3,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MobileView>
              <BasicMenu />
            </MobileView>
            <BrowserView>
              <IconButton
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => handleMenuClick()}
              >
                <MenuIcon />
              </IconButton>{" "}
            </BrowserView>
            <BrowserView>
              {hasUploadReportsCloud ||
              selectedReportData.title === "Health Register" ||
              selectedReportData.title === "Refresh Headers" ||
              selectedReportData.title === "Report Analysis" ||
              hasMasterPdfDownload ? null : (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon style={{ color: "#626875" }} />
                  </SearchIconWrapper>
                  <Autocomplete
                    sx={{ backgroundColor: "#F0F3F4", borderRadius: "15px" }}
                    variant="outlined"
                    fullWidth
                    disablePortal
                    options={empListHeader?.filter((obj) => obj?.name !== null)}
                    getOptionLabel={(employee) =>
                      employee?.empId +
                      " " +
                      employee?.name +
                      " " +
                      (employee?.tokenNumber?.toString()
                        ? " Token " + employee?.tokenNumber?.toString()
                        : "") +
                      (employee?.mobileNo ? employee?.mobileNo : "")
                    }
                    value={selectedEmployee}
                    onChange={handleEmployeeSelect}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        sx={{
                          background: "#F0F3F4",
                          borderRadius: "15px",
                          color: "#127DDD",
                          fontWeight: "500",
                          fontSize: "13px",
                          lineHeight: " 15px",
                          "& input::placeholder": {
                            color: "#000000",
                            fontWeight: "500",
                            fontSize: "14px",
                            lineHeight: " 15px",
                          },
                        }}
                        variant="outlined"
                        placeholder="Search Employee...."
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          type: "Search....",
                        }}
                      />
                    )}
                    renderOption={(props, employee) => (
                      <li {...props}>
                        <div>{`${employee?.empId}  ${employee?.name} ${
                          employee?.tokenNumber?.toString()
                            ? "Token " + employee?.tokenNumber?.toString()
                            : ""
                        } ${
                          employee?.mobileNo ? employee?.mobileNo : ""
                        }`}</div>
                      </li>
                    )}
                  />
                </Search>
              )}
            </BrowserView>
          </Box>
          <Box
            sx={{
              flexGrow:
                hasUploadReportsCloud ||
                selectedReportData.title === "Health Register" ||
                selectedReportData.title === "Refresh Headers" ||
                selectedReportData.title === "Report Analysis" ||
                hasMasterPdfDownload
                  ? 1
                  : 0.3,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontWeight: "500",
                fontSize: isMobile ? "18px" : "20px",
                lineHeight: " 20px",
              }}
            >
              {selectedReportData?.title || ""}
            </Typography>
          </Box>
          {/* <>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <SelectCampId
                setvalue={setSelectedCampId}
                value={selectedCampId}
              />
            </Box>
          </> */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "block", md: "flex" } }}>
            {selectedReportData.title === "Master Data" ||
            selectedReportData.title === "Upload Sequence" ||
            selectedReportData.title === "Master PDF - Download" ||
            selectedReportData.title === "Master PDF - Request" ||
            selectedReportData.title === "Refresh Headers" ||
            selectedReportData.title === "Health Register" ||
            selectedReportData.title === "Report Analysis" ||
            selectedReportData.title ===
              "Create Report - Vaccination Certificate" ||
            hasUploadReports === true ? null : (
              <CustomButtonBlue
                onClick={() => setOpenDialog(!openDialog)}
                title={isMobile ? "Create" : "Create Report"}
              />
            )}

            {selectedReportData.title ===
              "Create Report - Vaccination Certificate" && (
              <CustomButtonBlue
                title="Create Vacination Certificate"
                onClick={() => setOpenDialog(!openDialog)}
              />
            )}

            {selectedReportData.title === "Master PDF - Request" && (
              <CustomButtonBlue
                title={isMobile ? "Create PDF" : "Create Master PDF"}
                onClick={() => setOpenDialog(!openDialog)}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
