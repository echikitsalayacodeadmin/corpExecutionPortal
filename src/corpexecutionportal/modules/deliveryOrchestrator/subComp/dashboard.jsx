import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { CustomTypographyBold } from "../../../../assets/customTypography";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import CompanyInfoCard from "./companyInfoCard";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";
import { CorpNameContext } from "../../../global/context/usercontext";

const Dashboard = () => {
  const { corpName, setCorpName } = useContext(CorpNameContext);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [corpList, setCorpList] = useState([]);

  const fetchCorps = async () => {
    setIsLoading(true);
    const url = BASE_URL + "task/statusCount";
    const result = await getData(url);
    if (result.data) {
      setCorpList(result.data);
      setIsLoading(false);
    } else {
      setCorpList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCorps();
  }, []);
  // const [corpList, setCorpList] = useState([]);

  // const fetchCorps = async () => {
  //   const url = BASE_URL + "task/corp/all";
  //   const result = await getData(url);
  //   if (result.data) {
  //     setCorpList(result.data);
  //   } else {
  //     setCorpList([]);
  //   }
  // };

  // useEffect(() => {
  //   fetchCorps();
  // }, []);

  useEffect(() => {
    setCorpName("");
  }, [corpName]);

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
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: "#F5F5F5", minHeight: "80vh", borderRadius: 5 }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              boxSizing: "border-box",
              background: "#FFFFFF",
              border: "0.5px solid #A6A6A6",
              borderRadius: 5,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",

                width: "25%",
              }}
            >
              <CustomTypographyBold>Upcoming Camps</CustomTypographyBold>
              <CustomTypographyBold>10</CustomTypographyBold>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",

                width: "25%",
              }}
            >
              <CustomTypographyBold>Reports Pending</CustomTypographyBold>
              <CustomTypographyBold>4</CustomTypographyBold>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",

                width: "25%",
              }}
            >
              <CustomTypographyBold>Camp Running</CustomTypographyBold>
              <CustomTypographyBold>6</CustomTypographyBold>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",

                width: "25%",
              }}
            >
              <CustomTypographyBold>Request Pending</CustomTypographyBold>
              <CustomTypographyBold>3</CustomTypographyBold>
            </Box>
          </Box>

          <Box
            sx={{
              boxSizing: "border-box",
              background: "#FFFFFF",
              border: "0.5px solid #A6A6A6",
              borderRadius: 5,
              minHeight: "10vh",
              p: 2,
              display: "flex",
              gap: 10,
              mb: 2,
            }}
          >
            <CustomAutocomplete
              options={[]}
              placeholder="Filter City"
              label="Filter City"
              value={null}
              onChange={() => {}}
            />
            <CustomAutocomplete
              options={[]}
              placeholder="Filter Company"
              label="Filter Company"
              value={null}
              onChange={() => {}}
            />
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
            <CustomAutocomplete
              options={[
                { label: "Camp Executed", value: "Camp Executed" },
                { label: "Data Sheet", value: "Data Sheet" },
                { label: "Upload", value: "Upload" },
                { label: "Reporting", value: "Reporting" },
                { label: "Dispatch", value: "Dispatch" },
              ]}
              placeholder="Filter Status"
              label="Filter Status"
              value={null}
              onChange={() => {}}
            />
          </Box>
          <CustomAutocomplete
            styles={{ borderRadius: "15px", mb: 4 }}
            options={[]}
            value={null}
            onChange={() => {}}
            placeholder="Search Company..."
          />

          <Box sx={{}}></Box>

          {corpList.map((item, index) => (
            <CompanyInfoCard key={index} data={item} />
          ))}
        </Box>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
