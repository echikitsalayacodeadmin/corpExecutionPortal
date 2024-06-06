import { Box } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import { ReportingContext } from "../../global/context/context";
import Header from "../../global/header/header";
import SideBar from "../../global/sideBar/sideBar";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

const HomeIndex = () => {
  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FILTER_HOME")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  console.log({ DATA: localStorage.getItem("SAVED_FILTER_HOME") });

  useEffect(() => {
    setOpenDrawer(_storedData.openDrawer || isMobile ? false : true);
    setShowSequenceComponent(_storedData.showSequenceComponent || false);
    setSearchedEmployee(_storedData.searchedEmployee || "");
    setSelectedReportData(
      _storedData.selectedReportData || {
        value: "",
        title: "Master Data",
        label: "",
        filterValue: "",
      }
    );
    setSelectedColumns(_storedData.selectedColumns || []);
  }, []);

  const [openDrawer, setOpenDrawer] = useState(isMobile ? false : true);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSequenceComponent, setShowSequenceComponent] = useState(false);
  const [empListHeader, setEmpListHeader] = useState([]);
  const [searchedEmployee, setSearchedEmployee] = useState("");
  const [selectedReportData, setSelectedReportData] = useState({
    value: "",
    title: "Master Data",
    label: "",
    filterValue: "",
  });

  const updateSelectedReport = (newValue) => {
    setSelectedReportData({
      ...selectedReportData,
      ...newValue,
    });
  };
  const updateSearchedEmployee = (newValue) => {
    setSearchedEmployee(newValue);
  };
  const updateEmployeeList = (newList) => {
    setEmpListHeader(newList);
  };

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  const [selectedColumns, setSelectedColumns] = useState([]);
  const handleButtonClick = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
  };

  useEffect(() => {
    const savedFilter = {
      openDrawer,
      showSequenceComponent,

      searchedEmployee,
      selectedReportData,
      selectedColumns,
    };

    localStorage.setItem("SAVED_FILTER_HOME", JSON.stringify(savedFilter));
  }, [openDrawer, showSequenceComponent, searchedEmployee, selectedReportData]);

  return (
    <Fragment>
      <ReportingContext.Provider
        value={{
          openDrawer,
          setOpenDrawer,
          openDialog,
          setOpenDialog,
          showSequenceComponent,
          setShowSequenceComponent,
          empListHeader,
          updateEmployeeList,
          searchedEmployee,
          updateSearchedEmployee,
          selectedReportData,
          updateSelectedReport,
          selectedColumns,
          setSelectedColumns,
          handleButtonClick,
          handleCloseDialog,
        }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: openDrawer ? "10px" : null,
          }}
        >
          <BrowserView>
            <SideBar />
          </BrowserView>
          <Box
            sx={{
              width: isMobile
                ? "100%"
                : openDrawer
                ? "calc(100% - 220px)"
                : "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ReportingContext.Provider>
    </Fragment>
  );
};

export default HomeIndex;
