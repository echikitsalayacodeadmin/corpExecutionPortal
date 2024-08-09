import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import DashboardTableComponent from "../tableComp/DashboardTableComponent";
import {
  getAttendanceDetailsByDateAndCorpId,
  getAttendanceDetailsMapByDateAndCorpId,
} from "../services/staffservice";
import dayjs from "dayjs";
import { CustomDate } from "../../../assets/customDate/customDateComps";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import CustomSelectNew from "../../../../assets/customSelectNew";
import HomeTableComponent from "../tableComp/HomeTableComponent";

const formatdata = (data) => {
  const obj = Object.entries(data);

  let v = obj.map((value, index) => ({
    id: index + 1,
    corpName: value[0],
    shift1: value[1][0] || null,
    shift2: value[1][1] || null,
    shift3: value[1][2] || null,
  }));

  return v;
};

const HomeMain = () => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [formValues, setFormValues] = useState({
    date: dayjs(),
    company: "",
  });

  useEffect(() => {
    getAttendanceDetailsMapByDateAndCorpId(
      formValues.company,
      dayjs(formValues.date).format("YYYY-MM-DD"),
      setAttendanceDetails
    );
  }, [formValues]);

  useEffect(() => {
    getCompanyList(setCompanyList);
  }, []);

  console.log({
    formValues,
    companyList,
    attendanceDetails,
    formatdata: formatdata(attendanceDetails),
  });

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12} display="flex" justifyContent="center">
            <Typography variant="h6">OHC Staff Attendance Dashboard</Typography>
          </Grid>
          <Grid item lg={2}>
            <CustomDate
              formValues={formValues}
              setFormValues={setFormValues}
              label="Select Date"
              height={46}
            />
          </Grid>
          <Grid item lg={5}>
            <CustomSelectNew
              width={"100%"}
              placeholder="Company filter"
              formValues={formValues}
              setFormValues={setFormValues}
              borderRadius={3.5}
              options={companyList}
              property="company"
              labelProp="orgName"
              valueProp="corpId"
            />
          </Grid>
          <Grid item lg={12}>
            <HomeTableComponent data={formatdata(attendanceDetails)} />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default HomeMain;
