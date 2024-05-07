import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Portal,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import QuotationDashboardNew from "./quotationDashboard/quotationDashboardNew";
import QuotationDashoard from "./quotationOld/QuotationDashoard";
import QuotationSelect from "./subComp/quotationSelect";
import MainPageLayoutWithBackQ from "../../global/templates/mainPageLayoutWithBackQ";

const QuotationMain = () => {
  const _storedData = (() => {
    try {
      return (
        JSON.parse(localStorage.getItem("SAVED_TAB_QUOTATIONS_CORPSALES")) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("ROLE_CORP_SALES")
        : null
    );
    setValue(_storedData.value || "1");
  }, []);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const savedFilter = {
      value,
    };
    localStorage.setItem(
      "SAVED_TAB_QUOTATIONS_CORPSALES",
      JSON.stringify(savedFilter)
    );
    localStorage.removeItem("QUOTATION_ID_RESPONSE_CORPSALES");
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <MainPageLayoutWithBackQ
        title="Quotations"
        onAddQuotationClick={() => {
          handleOpen();
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Dashboard" value="1" />
                <Tab label="Quotation Old" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ p: 0 }}>
              <QuotationDashboardNew />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <QuotationDashoard />
            </TabPanel>
          </TabContext>
        </Box>

        <Portal>
          <Modal
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={open}
            onClose={handleClose}
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
                height: "550px",
              }}
            >
              {/* <Box sx={{ minHeight: "130px" }}> */}
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "15px",
                  color: "#000000",
                  marginTop: "-25px",
                  marginBottom: "10px",
                }}
              >
                Create/Select Corp
              </Typography>
              <QuotationSelect />
            </Box>
          </Modal>
        </Portal>
      </MainPageLayoutWithBackQ>
    </Fragment>
  );
};

export default QuotationMain;
