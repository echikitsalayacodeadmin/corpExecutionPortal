import React, { Fragment, useEffect, useState } from "react";
import { fetchCorps } from "../../services/selectCorpServices";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { Box, Grid, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreateOrg from "./subComps/createOrg";
import UpdateOrg from "./subComps/updateOrg";
import CreateOrgCredentials from "./subComps/createOrgCredentials";

const CreateCorpCredtialsMain = () => {
  const _storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_CREATE_CREDENT")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  })();

  useEffect(() => {
    setValue(_storedData.value || "1");
  }, []);
  const [value, setValue] = useState("1");
  const [corpData, setCorpData] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const savedFilter = {
      value,
    };
    localStorage.setItem("SAVED_CREATE_CREDENT", JSON.stringify(savedFilter));
  }, [value]);

  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create Org" value="1" />
              <Tab label="Update Org" value="2" />
              <Tab label="Create Org Credentials" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <CreateOrg setValue={setValue} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <UpdateOrg />
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0 }}>
            <CreateOrgCredentials corpData={corpData} />
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default CreateCorpCredtialsMain;
